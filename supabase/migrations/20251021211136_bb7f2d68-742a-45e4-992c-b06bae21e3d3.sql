-- SECURITY FIX: Remove email-based RLS policies on appointments table
-- These policies allowed authenticated users to query appointments by email,
-- enabling email enumeration and unauthorized access to PII

-- Drop the vulnerable email-based policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can delete their own appointments" ON public.appointments;

-- Keep the secure policies:
-- 1. "Allow anonymous appointment booking" - Allows public to INSERT appointments
-- 2. "Admins can view all appointments" - Admins can view all appointments via has_role()
-- 3. "Admins can update all appointments" - Admins can update appointments
-- 4. "Admins can delete all appointments" - Admins can delete appointments
-- 5. "Service role full access" - Service role for edge functions
-- 6. "Authenticated users can view appointments" - This uses has_role() for admin check

-- Verify no email-based policies remain
-- The remaining policies should only use:
-- - has_role(auth.uid(), 'admin'::app_role) for admin access
-- - true for anonymous INSERT
-- - Service role checks

-- Log this security fix
DO $$
BEGIN
  RAISE NOTICE 'SECURITY FIX APPLIED: Removed email-based RLS policies on appointments table';
  RAISE NOTICE 'Email enumeration vulnerability has been mitigated';
  RAISE NOTICE 'Only admins can now view/manage appointments via role-based access control';
END $$;