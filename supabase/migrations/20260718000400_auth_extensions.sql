-- 1. Create permissions table
CREATE TABLE public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create role_permissions table
CREATE TABLE public.role_permissions (
    role user_role_type NOT NULL,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (role, permission_id)
);

-- 3. Create user_activity_logs table
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL, -- login, logout, critical_action
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_user_activity_user_id ON public.user_activity_logs(user_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- 5. Policies for permissions and role mappings (Public Read / Admin Write)
CREATE POLICY "Public read permissions" ON public.permissions FOR SELECT USING (true);
CREATE POLICY "Public read role_permissions" ON public.role_permissions FOR SELECT USING (true);
CREATE POLICY "Users can read own activity logs" ON public.user_activity_logs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins manage permissions" ON public.permissions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage role_permissions" ON public.role_permissions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins view all activity logs" ON public.user_activity_logs FOR SELECT USING (public.is_admin());

-- 6. Add status and avatar_url to public.profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'active';
