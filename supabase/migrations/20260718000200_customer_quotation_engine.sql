-- 1. Create custom status enum types
CREATE TYPE customer_status_type AS ENUM ('active', 'suspended', 'inactive');
CREATE TYPE request_status_type AS ENUM ('pending', 'reviewed', 'responded', 'closed');
CREATE TYPE quote_status_type AS ENUM ('draft', 'submitted', 'under_review', 'sent_to_client', 'accepted', 'rejected', 'expired');

-- 2. Create customers table
CREATE TABLE public.customers (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    whatsapp VARCHAR(20),
    company_name VARCHAR(200),
    rut VARCHAR(12),
    customer_type VARCHAR(50) DEFAULT 'B2C' NOT NULL, -- B2C, B2B, Institution
    status customer_status_type DEFAULT 'active'::customer_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_customers_status ON public.customers(status);
CREATE INDEX idx_customers_type ON public.customers(customer_type);

-- 3. Create customer_addresses table
CREATE TABLE public.customer_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(100) NOT NULL, -- e.g. Casa, Oficina, Colegio
    recipient_name VARCHAR(150),
    phone VARCHAR(20),
    region VARCHAR(100) NOT NULL,
    commune VARCHAR(100) NOT NULL,
    street VARCHAR(200) NOT NULL,
    number VARCHAR(20) NOT NULL,
    apartment_office VARCHAR(50),
    is_default BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_addresses_customer_id ON public.customer_addresses(customer_id);

-- 4. Create customer_files table (Customer Upload Vault)
CREATE TABLE public.customer_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- design, reference, attachment
    file_size_bytes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_customer_files_customer_id ON public.customer_files(customer_id);

-- 5. Create customer_requests table
CREATE TABLE public.customer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    target_product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    requested_quantity INTEGER DEFAULT 1 NOT NULL,
    origin_channel VARCHAR(50) NOT NULL, -- Instagram, WhatsApp, TikTok, Web
    status request_status_type DEFAULT 'pending'::request_status_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_requests_customer_id ON public.customer_requests(customer_id);
CREATE INDEX idx_requests_status ON public.customer_requests(status);

-- 6. Create quotes table
CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number VARCHAR(100) UNIQUE NOT NULL, -- eg: QT-2026-0001
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    total_amount INTEGER DEFAULT 0 NOT NULL,
    notes TEXT,
    status quote_status_type DEFAULT 'draft'::quote_status_type NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_quotes_customer_id ON public.quotes(customer_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_number ON public.quotes(quote_number);

-- 7. Create quote_items table
CREATE TABLE public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1 NOT NULL,
    unit_price INTEGER DEFAULT 0 NOT NULL,
    customization_snapshot JSONB DEFAULT '{}'::jsonb NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_quote_items_quote_id ON public.quote_items(quote_id);

-- 8. Create quote_status_history table
CREATE TABLE public.quote_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
    old_status quote_status_type,
    new_status quote_status_type NOT NULL,
    performed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_quote_history_quote_id ON public.quote_status_history(quote_id);

-- 9. Add triggers to handle updated_at automatically
CREATE TRIGGER trigger_update_customers_timestamp BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_addresses_timestamp BEFORE UPDATE ON public.customer_addresses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_requests_timestamp BEFORE UPDATE ON public.customer_requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER trigger_update_quotes_timestamp BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Setup Row Level Security (RLS)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_status_history ENABLE ROW LEVEL SECURITY;

-- 11. Customer specific RLS policies (Restricted to owner or admins)
CREATE POLICY "Users can view their own customer record" ON public.customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can edit their own customer record" ON public.customers FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can manage their own addresses" ON public.customer_addresses FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Users can manage their own files" ON public.customer_files FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Users can view and create their own requests" ON public.customer_requests FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Users can view their own quotes" ON public.quotes FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can view their own quote items" ON public.quote_items FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.quotes WHERE id = quote_id AND customer_id = auth.uid()
    )
);
CREATE POLICY "Users can view their own quote status history" ON public.quote_status_history FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.quotes WHERE id = quote_id AND customer_id = auth.uid()
    )
);

-- 12. Admin/Sales RLS policies (Elevated access)
CREATE POLICY "Admins and Sales can manage all customers" ON public.customers FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all addresses" ON public.customer_addresses FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Designers can manage all customer files" ON public.customer_files FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all requests" ON public.customer_requests FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all quotes" ON public.quotes FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all quote items" ON public.quote_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admins and Sales can manage all history logs" ON public.quote_status_history FOR ALL USING (public.is_admin());
