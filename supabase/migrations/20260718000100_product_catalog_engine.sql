-- 1. Create status enum for sub-entities
CREATE TYPE generic_status_type AS ENUM ('active', 'inactive');

-- 2. Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_status ON public.categories(status);

-- 3. Create collections table
CREATE TABLE public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    description TEXT,
    image TEXT,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_collections_slug ON public.collections(slug);

-- 4. Create materials table
CREATE TABLE public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create production_techniques table
CREATE TABLE public.production_techniques (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    public_code VARCHAR(100) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    seo_title VARCHAR(200),
    seo_description VARCHAR(300),
    name VARCHAR(200) NOT NULL,
    short_description TEXT,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    base_price INTEGER DEFAULT 0 NOT NULL,
    status product_status_type DEFAULT 'draft'::product_status_type NOT NULL,
    is_customizable BOOLEAN DEFAULT false NOT NULL,
    is_featured BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_public_code ON public.products(public_code);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_featured ON public.products(is_featured);

-- 7. Create product_variants table
CREATE TABLE public.product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(200) NOT NULL,
    attributes JSONB DEFAULT '{}'::jsonb NOT NULL,
    sku_variant VARCHAR(150) UNIQUE NOT NULL,
    price_modifier INTEGER DEFAULT 0 NOT NULL,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_variants_sku ON public.product_variants(sku_variant);
CREATE INDEX idx_variants_product_id ON public.product_variants(product_id);
CREATE INDEX idx_variants_attributes ON public.product_variants USING GIN (attributes);

-- 8. Create customization_options table
CREATE TABLE public.customization_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    required BOOLEAN DEFAULT false NOT NULL,
    configuration JSONB DEFAULT '{}'::jsonb NOT NULL,
    status generic_status_type DEFAULT 'active'::generic_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Create product_images table
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'gallery' NOT NULL,
    position INTEGER DEFAULT 0 NOT NULL,
    alt_text VARCHAR(300),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_product_images_product_id ON public.product_images(product_id);

-- 10. Create tags and relationship tables
CREATE TABLE public.tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL
);

CREATE TABLE public.product_tags (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE public.product_materials (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    material_id UUID REFERENCES public.materials(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (product_id, material_id)
);

CREATE TABLE public.product_techniques (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    technique_id UUID REFERENCES public.production_techniques(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (product_id, technique_id)
);

-- 11. Add triggers to handle updated_at automatically
CREATE TRIGGER trigger_update_categories_timestamp BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_collections_timestamp BEFORE UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_materials_timestamp BEFORE UPDATE ON public.materials FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_techniques_timestamp BEFORE UPDATE ON public.production_techniques FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_products_timestamp BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_variants_timestamp BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_customization_timestamp BEFORE UPDATE ON public.customization_options FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_product_images_timestamp BEFORE UPDATE ON public.product_images FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. Setup Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customization_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_techniques ENABLE ROW LEVEL SECURITY;

-- 13. Enable Public Select Policies for active items
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view active collections" ON public.collections FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view active materials" ON public.materials FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view active techniques" ON public.production_techniques FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (status = 'active'::product_status_type);
CREATE POLICY "Public can view active variants" ON public.product_variants FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view active customization options" ON public.customization_options FOR SELECT USING (status = 'active'::generic_status_type);
CREATE POLICY "Public can view images of products" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public can view tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Public can view product tags" ON public.product_tags FOR SELECT USING (true);
CREATE POLICY "Public can view product materials" ON public.product_materials FOR SELECT USING (true);
CREATE POLICY "Public can view product techniques" ON public.product_techniques FOR SELECT USING (true);

-- 14. Admin Management Policies
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage collections" ON public.collections FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage materials" ON public.materials FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage techniques" ON public.production_techniques FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage variants" ON public.product_variants FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage customization options" ON public.customization_options FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage product images" ON public.product_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage tags" ON public.tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage product tags" ON public.product_tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage product materials" ON public.product_materials FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage product techniques" ON public.product_techniques FOR ALL USING (public.is_admin());
