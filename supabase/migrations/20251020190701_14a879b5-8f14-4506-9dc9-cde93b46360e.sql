-- Create rate limiting table for AI chat
CREATE TABLE IF NOT EXISTS public.ai_chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_request_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for fast lookups
CREATE INDEX IF NOT EXISTS idx_ai_chat_rate_limits_identifier 
  ON public.ai_chat_rate_limits(identifier);

-- Create index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_ai_chat_rate_limits_window_start 
  ON public.ai_chat_rate_limits(window_start);

-- Enable RLS
ALTER TABLE public.ai_chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- Service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
  ON public.ai_chat_rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to clean up old rate limit entries (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_ai_chat_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.ai_chat_rate_limits
  WHERE window_start < NOW() - INTERVAL '24 hours';
END;
$$;

COMMENT ON TABLE public.ai_chat_rate_limits IS 'Rate limiting for AI chat to prevent abuse - stores request counts per identifier (IP or user ID)';
COMMENT ON FUNCTION public.cleanup_ai_chat_rate_limits IS 'Cleanup function to remove old rate limit entries - run periodically';