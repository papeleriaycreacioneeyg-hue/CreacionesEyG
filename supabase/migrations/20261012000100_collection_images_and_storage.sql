-- ==============================================================================
-- 0. Requisitos de Autenticación y Perfiles (Idempotente)
-- ==============================================================================

-- Crear tipo enum para roles si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_type') THEN
        CREATE TYPE user_role_type AS ENUM ('admin', 'designer', 'production', 'sales', 'customer');
    END IF;
END $$;

-- Crear tabla public.profiles si no existe
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role user_role_type DEFAULT 'customer'::user_role_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Asegurar RLS en profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Función de verificación de administrador
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'::user_role_type
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================================================
-- 1. Crear tabla persistente para imágenes asociadas a las 26 colecciones
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.collection_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_id VARCHAR(50) NOT NULL, -- Identificador de colección (ej: 'prod-1' .. 'prod-26')
    collection_slug VARCHAR(150) NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    position INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas optimizadas
CREATE INDEX IF NOT EXISTS idx_collection_images_collection_id ON public.collection_images(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_images_collection_slug ON public.collection_images(collection_slug);
CREATE INDEX IF NOT EXISTS idx_collection_images_position ON public.collection_images(collection_id, position);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.collection_images ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS para collection_images
-- El público general puede ver las fotografías del catálogo
DROP POLICY IF EXISTS "Public read collection images" ON public.collection_images;
CREATE POLICY "Public read collection images"
    ON public.collection_images
    FOR SELECT
    USING (true);

-- Solo los administradores verificados mediante is_admin() pueden insertar, actualizar y borrar
DROP POLICY IF EXISTS "Admins manage collection images" ON public.collection_images;
CREATE POLICY "Admins manage collection images"
    ON public.collection_images
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 4. Trigger con bloqueo transaccional para imponer límite estricto de 10 fotos por colección
CREATE OR REPLACE FUNCTION public.check_collection_images_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
BEGIN
    -- Bloqueo consultivo a nivel de transacción por colección para prevenir condiciones de carrera concurrentes
    PERFORM pg_advisory_xact_lock(hashtext('collection_limit_' || NEW.collection_id));

    SELECT COUNT(*) INTO current_count
    FROM public.collection_images
    WHERE collection_id = NEW.collection_id;

    IF current_count >= 10 THEN
        RAISE EXCEPTION 'Límite alcanzado: La colección % ya tiene 10 fotografías (máximo permitido)', NEW.collection_id
            USING ERRCODE = 'P0001';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_check_collection_images_limit ON public.collection_images;
CREATE TRIGGER trigger_check_collection_images_limit
    BEFORE INSERT OR UPDATE OF collection_id ON public.collection_images
    FOR EACH ROW
    EXECUTE FUNCTION public.check_collection_images_limit();

-- 5. Crear bucket de Storage 'catalog-images' si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'catalog-images',
    'catalog-images',
    true,
    5242880, -- 5 MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- 6. Políticas de Row Level Security para el bucket catalog-images en storage.objects
-- Lectura pública de imágenes
DROP POLICY IF EXISTS "Public read catalog images storage" ON storage.objects;
CREATE POLICY "Public read catalog images storage"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'catalog-images');

-- Inserción, actualización y borrado exclusivo para administradores
DROP POLICY IF EXISTS "Admins manage catalog images storage" ON storage.objects;
CREATE POLICY "Admins manage catalog images storage"
    ON storage.objects
    FOR ALL
    USING (bucket_id = 'catalog-images' AND public.is_admin())
    WITH CHECK (bucket_id = 'catalog-images' AND public.is_admin());

