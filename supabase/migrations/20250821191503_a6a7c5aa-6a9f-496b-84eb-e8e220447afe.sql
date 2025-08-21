-- Fix function search path security issue
CREATE OR REPLACE FUNCTION public.cleanup_security_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Delete rate limit logs older than 24 hours
  DELETE FROM public.rate_limit_log 
  WHERE created_at < NOW() - INTERVAL '24 hours';
  
  -- Delete security logs older than 30 days (except critical ones)
  DELETE FROM public.security_logs 
  WHERE created_at < NOW() - INTERVAL '30 days' 
  AND severity != 'critical';
  
  -- Delete critical security logs older than 90 days
  DELETE FROM public.security_logs 
  WHERE created_at < NOW() - INTERVAL '90 days' 
  AND severity = 'critical';
END;
$$;