-- Create tables for security monitoring and rate limiting

-- Create rate limiting log table
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    identifier text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    ip_address text,
    user_agent text
);

-- Enable RLS on rate_limit_log
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for rate_limit_log (only service role can manage)
CREATE POLICY "Service role can manage rate limit logs"
ON public.rate_limit_log
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create security logs table
CREATE TABLE IF NOT EXISTS public.security_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event text NOT NULL,
    details jsonb,
    severity text CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    created_at timestamp with time zone DEFAULT now(),
    ip_address text,
    user_agent text
);

-- Enable RLS on security_logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for security_logs (only service role can manage)
CREATE POLICY "Service role can manage security logs"
ON public.security_logs
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_rate_limit_log_identifier_created 
ON public.rate_limit_log (identifier, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_security_logs_severity_created 
ON public.security_logs (severity, created_at DESC);

-- Create function to clean old logs (for maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_security_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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