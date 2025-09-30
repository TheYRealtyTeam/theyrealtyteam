-- Security Fix: Allow authenticated users to view their own appointments
-- This creates consistency with existing UPDATE/DELETE policies

CREATE POLICY "Users can view their own appointments"
  ON public.appointments
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'email'::text) = email
  );

-- Add comment documenting the security model
COMMENT ON TABLE public.appointments IS 'Appointment data with RLS policies: anonymous users can book (INSERT), authenticated users can view/update/delete their own appointments (matched by email), admins have full access.';