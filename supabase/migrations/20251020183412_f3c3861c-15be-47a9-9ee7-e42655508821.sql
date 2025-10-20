-- Create table to securely store Microsoft Graph tokens server-side
CREATE TABLE IF NOT EXISTS public.microsoft_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user_id UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.microsoft_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own tokens
CREATE POLICY "Users can manage their own Microsoft tokens"
  ON public.microsoft_tokens
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_microsoft_tokens_updated_at
  BEFORE UPDATE ON public.microsoft_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_microsoft_tokens_user_id ON public.microsoft_tokens(user_id);
CREATE INDEX idx_microsoft_tokens_expires_at ON public.microsoft_tokens(expires_at);