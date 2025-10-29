-- Drop and recreate the appointment booking policy to ensure it works correctly
DROP POLICY IF EXISTS "Allow anonymous appointment booking" ON public.appointments;

-- Create a fresh policy that allows anyone (anon and authenticated) to insert appointments
CREATE POLICY "Allow anonymous appointment booking"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;