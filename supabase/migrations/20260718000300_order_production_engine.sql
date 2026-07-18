-- 1. Create custom enums for orders and production
CREATE TYPE order_status_type AS ENUM ('created', 'processing', 'completed', 'canceled');
CREATE TYPE payment_status_type AS ENUM ('pending', 'authorized', 'captured', 'failed', 'refunded');
CREATE TYPE design_project_status_type AS ENUM ('pending_design', 'in_progress', 'sent_to_client', 'approved', 'rejected');
CREATE TYPE approval_status_type AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE production_job_status_type AS ENUM ('in_queue', 'printing', 'cutting', 'quality_check', 'ready_to_ship', 'completed', 'failed');
CREATE TYPE delivery_status_type AS ENUM ('pending', 'shipped', 'delivered', 'returned');

-- 2. Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(100) UNIQUE NOT NULL, -- eg: ORD-2026-0001
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    total_amount INTEGER DEFAULT 0 NOT NULL,
    shipping_cost INTEGER DEFAULT 0 NOT NULL,
    notes TEXT,
    status order_status_type DEFAULT 'created'::order_status_type NOT NULL,
    payment_status payment_status_type DEFAULT 'pending'::payment_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_number ON public.orders(order_number);

-- 3. Create order_items table
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1 NOT NULL,
    unit_price INTEGER DEFAULT 0 NOT NULL,
    customization_snapshot JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);

-- 4. Create design_projects table
CREATE TABLE public.design_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    designer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status design_project_status_type DEFAULT 'pending_design'::design_project_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_designs_order_id ON public.design_projects(order_id);
CREATE INDEX idx_designs_status ON public.design_projects(status);

-- 5. Create design_versions table
CREATE TABLE public.design_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    design_project_id UUID REFERENCES public.design_projects(id) ON DELETE CASCADE NOT NULL,
    version_number INTEGER DEFAULT 1 NOT NULL,
    file_url TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_design_versions_project_id ON public.design_versions(design_project_id);

-- 6. Create customer_approvals table
CREATE TABLE public.customer_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    design_version_id UUID REFERENCES public.design_versions(id) ON DELETE CASCADE NOT NULL,
    status approval_status_type DEFAULT 'pending'::approval_status_type NOT NULL,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_approvals_version_id ON public.customer_approvals(design_version_id);

-- 7. Create production_jobs table
CREATE TABLE public.production_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    priority INTEGER DEFAULT 0 NOT NULL, -- 0 normal, 1 high, 2 emergency
    status production_job_status_type DEFAULT 'in_queue'::production_job_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_prod_jobs_order_id ON public.production_jobs(order_id);
CREATE INDEX idx_prod_jobs_status ON public.production_jobs(status);

-- 8. Create production_history table
CREATE TABLE public.production_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    production_job_id UUID REFERENCES public.production_jobs(id) ON DELETE CASCADE NOT NULL,
    old_status production_job_status_type,
    new_status production_job_status_type NOT NULL,
    performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_prod_history_job_id ON public.production_history(production_job_id);

-- 9. Create deliveries table
CREATE TABLE public.deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    method VARCHAR(50) NOT NULL, -- Starken, BlueExpress, Chilexpress, LocalPickup
    tracking_number VARCHAR(150),
    shipping_address JSONB NOT NULL,
    status delivery_status_type DEFAULT 'pending'::delivery_status_type NOT NULL,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_deliveries_order_id ON public.deliveries(order_id);
CREATE INDEX idx_deliveries_status ON public.deliveries(status);

-- 10. Add triggers to handle updated_at automatically
CREATE TRIGGER trigger_update_orders_timestamp BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_order_items_timestamp BEFORE UPDATE ON public.order_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_design_projects_timestamp BEFORE UPDATE ON public.design_projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_production_jobs_timestamp BEFORE UPDATE ON public.production_jobs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_deliveries_timestamp BEFORE UPDATE ON public.deliveries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 11. Setup Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

-- 12. Customer specific RLS policies (Restricted to owner or admins)
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid()
    )
);
CREATE POLICY "Users can view their own design projects" ON public.design_projects FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid()
    )
);
CREATE POLICY "Users can view their own design versions" ON public.design_versions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.design_projects dp 
        JOIN public.orders o ON o.id = dp.order_id 
        WHERE dp.id = design_project_id AND o.customer_id = auth.uid()
    )
);
CREATE POLICY "Users can manage approvals of their own designs" ON public.customer_approvals FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.design_versions dv
        JOIN public.design_projects dp ON dp.id = dv.design_project_id
        JOIN public.orders o ON o.id = dp.order_id
        WHERE dv.id = design_version_id AND o.customer_id = auth.uid()
    )
);
CREATE POLICY "Users can view their own deliveries" ON public.deliveries FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.orders WHERE id = order_id AND customer_id = auth.uid()
    )
);

-- 13. Admin/Designer/Production RLS policies (Elevated access)
CREATE POLICY "Admins and Sales can manage all orders" ON public.orders FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all order items" ON public.order_items FOR ALL USING (public.is_admin());

CREATE POLICY "Admins and Designers can manage all design projects" ON public.design_projects FOR ALL USING (public.is_admin() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'designer'::user_role_type
));
CREATE POLICY "Admins and Designers can manage all design versions" ON public.design_versions FOR ALL USING (public.is_admin() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'designer'::user_role_type
));
CREATE POLICY "Admins and Designers can manage all customer approvals" ON public.customer_approvals FOR ALL USING (public.is_admin() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'designer'::user_role_type
));

CREATE POLICY "Admins and Production can manage all production jobs" ON public.production_jobs FOR ALL USING (public.is_admin() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'production'::user_role_type
));
CREATE POLICY "Admins and Production can manage all production history" ON public.production_history FOR ALL USING (public.is_admin() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'production'::user_role_type
));
CREATE POLICY "Admins and Logistics can manage all deliveries" ON public.deliveries FOR ALL USING (public.is_admin());
