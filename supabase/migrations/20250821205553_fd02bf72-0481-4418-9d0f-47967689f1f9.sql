-- Fix security vulnerabilities identified in audit

-- Add explicit RLS policies for appointments table to protect customer data
CREATE POLICY "Authenticated users can view appointments" 
ON public.appointments 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email')::text = 'admin@yrealty.com');

-- Add explicit RLS policies for contact_submissions table to protect customer data  
CREATE POLICY "Authenticated admins can view contact submissions"
ON public.contact_submissions
FOR SELECT 
USING (auth.uid() IS NOT NULL AND (auth.jwt() ->> 'email')::text = 'admin@yrealty.com');

-- Update existing overly permissive policies
DROP POLICY IF EXISTS "Service role only: manage appointments" ON public.appointments;
DROP POLICY IF EXISTS "Service role only: manage contact submissions" ON public.contact_submissions;