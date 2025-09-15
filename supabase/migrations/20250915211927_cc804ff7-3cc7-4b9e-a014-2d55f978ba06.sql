-- Fix Critical RLS Policy Issues
-- 1. Replace overly permissive blog post INSERT policy with admin-only access
DROP POLICY IF EXISTS "Allow authenticated users to insert blog posts" ON public.blog_posts;

CREATE POLICY "Admin only: insert blog posts" 
ON public.blog_posts 
FOR INSERT 
TO authenticated
WITH CHECK ((auth.jwt() ->> 'email'::text) = 'admin@yrealty.com'::text);

-- 2. Add missing appointment UPDATE and DELETE policies
CREATE POLICY "Users can update their own appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = email);

CREATE POLICY "Users can delete their own appointments" 
ON public.appointments 
FOR DELETE 
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = email);

-- 3. Add admin policies for appointment management
CREATE POLICY "Admins can update all appointments" 
ON public.appointments 
FOR UPDATE 
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = 'admin@yrealty.com'::text);

CREATE POLICY "Admins can delete all appointments" 
ON public.appointments 
FOR DELETE 
TO authenticated
USING ((auth.jwt() ->> 'email'::text) = 'admin@yrealty.com'::text);

-- 4. Enhance security logging with better indexing
CREATE INDEX IF NOT EXISTS idx_security_logs_severity_created 
ON public.security_logs(severity, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_rate_limit_log_identifier_created 
ON public.rate_limit_log(identifier, created_at DESC);

-- 5. Create function to log security violations
CREATE OR REPLACE FUNCTION public.log_security_violation(
  violation_type text,
  details jsonb DEFAULT '{}'::jsonb,
  severity_level text DEFAULT 'medium'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_logs (event, details, severity, ip_address, user_agent)
  VALUES (
    violation_type,
    details || jsonb_build_object(
      'user_id', auth.uid(),
      'timestamp', now(),
      'session_id', auth.jwt() ->> 'session_id'
    ),
    severity_level::text,
    current_setting('request.headers', true)::json->>'x-forwarded-for',
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;