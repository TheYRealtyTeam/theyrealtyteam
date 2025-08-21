-- CRITICAL SECURITY FIX: Secure customer data with proper RLS policies

-- Fix contact_submissions table policies
DROP POLICY IF EXISTS "Allow service role to view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Service role can manage contact submissions" ON public.contact_submissions;

-- Create secure policies for contact_submissions
CREATE POLICY "Service role only: view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.role() = 'service_role'::text);

CREATE POLICY "Service role only: manage contact submissions" 
ON public.contact_submissions 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Fix appointments table policies  
DROP POLICY IF EXISTS "Service role can manage appointments" ON public.appointments;

-- The existing "Allow service role all operations" policy is secure, but let's make it more explicit
DROP POLICY IF EXISTS "Allow service role all operations" ON public.appointments;

CREATE POLICY "Service role only: manage appointments" 
ON public.appointments 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Fix security_logs table policies
DROP POLICY IF EXISTS "Service role can manage security logs" ON public.security_logs;

CREATE POLICY "Service role only: manage security logs" 
ON public.security_logs 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Fix rate_limit_log table policies
DROP POLICY IF EXISTS "Service role can manage rate limit logs" ON public.rate_limit_log;

CREATE POLICY "Service role only: manage rate limit logs" 
ON public.rate_limit_log 
FOR ALL 
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Ensure RLS is enabled on all sensitive tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;