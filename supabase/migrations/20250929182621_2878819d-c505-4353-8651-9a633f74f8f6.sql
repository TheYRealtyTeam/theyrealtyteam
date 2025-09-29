-- RLS Policy Verification and Hardening
-- This migration ensures all tables have proper RLS policies with service_role access

-- Ensure service_role has full access to all tables (idempotent)
DO $$ 
BEGIN
  -- Drop existing service_role policies if they exist to recreate them
  DROP POLICY IF EXISTS "Service role full access" ON public.blog_posts;
  DROP POLICY IF EXISTS "Service role full access" ON public.contact_submissions;
  DROP POLICY IF EXISTS "Service role full access" ON public.appointments;
  DROP POLICY IF EXISTS "Service role full access" ON public.properties;
  DROP POLICY IF EXISTS "Service role full access" ON public.profiles;
  
  -- Create comprehensive service_role policies
  CREATE POLICY "Service role full access"
    ON public.blog_posts
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Service role full access"
    ON public.contact_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Service role full access"
    ON public.appointments
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Service role full access"
    ON public.properties
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Service role full access"
    ON public.profiles
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
END $$;

-- Verify RLS is enabled on all critical tables (should already be enabled)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Add indexes for better performance on commonly queried columns
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);
CREATE INDEX IF NOT EXISTS idx_properties_active ON public.properties(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_rate_limit_log_identifier ON public.rate_limit_log(identifier, created_at);
CREATE INDEX IF NOT EXISTS idx_security_logs_severity ON public.security_logs(severity, created_at DESC);