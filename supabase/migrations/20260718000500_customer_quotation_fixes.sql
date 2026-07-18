-- 1. Create quote number sequence
CREATE SEQUENCE IF NOT EXISTS public.quote_number_seq START 1;

-- 2. Create function to generate formatted quote numbers
CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quote_number IS NULL OR NEW.quote_number = '' THEN
        NEW.quote_number := 'EG-COT-' || LPAD(nextval('public.quote_number_seq')::text, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Bind generator trigger to quotes table
DROP TRIGGER IF EXISTS trigger_generate_quote_number ON public.quotes;
CREATE TRIGGER trigger_generate_quote_number
    BEFORE INSERT ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_quote_number();
