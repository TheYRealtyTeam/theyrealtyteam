-- Security Fix: Lock down contact_submissions table to protect customer PII
-- This migration ensures only admins and service role can view customer contact information

-- First, drop all existing policies on contact_submissions to start fresh
DROP POLICY IF EXISTS "Admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow service role all operations" ON public.contact_submissions;
DROP POLICY IF EXISTS "Service role full access" ON public.contact_submissions;
DROP POLICY IF EXISTS "Service role only: view contact submissions" ON public.contact_submissions;

-- Ensure RLS is enabled
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous users to submit contact forms (INSERT only)
-- This is safe because users can only create new submissions, not read existing ones
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Only admins can view contact submissions (SELECT)
-- This protects customer PII from unauthorized access
CREATE POLICY "Only admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Policy 3: Only admins can update contact submissions
CREATE POLICY "Only admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy 4: Only admins can delete contact submissions
CREATE POLICY "Only admins can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Policy 5: Service role has full access for backend operations
CREATE POLICY "Service role full access to contact submissions"
  ON public.contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add comment documenting the security model
COMMENT ON TABLE public.contact_submissions IS 'Contains customer PII (names, emails, phone numbers). RLS policies ensure only admins can read this data. Anonymous users can only insert new submissions via the contact form.';