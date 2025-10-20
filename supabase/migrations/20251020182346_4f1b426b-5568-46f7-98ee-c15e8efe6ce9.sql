-- Update RLS policies to remove hardcoded admin email checks and use role-based access via has_role()

-- Blog posts: admin-only insert policy
DROP POLICY IF EXISTS "Admin only: insert blog posts" ON public.blog_posts;
CREATE POLICY "Admin only: insert blog posts"
ON public.blog_posts
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Appointments: admin can update all
DROP POLICY IF EXISTS "Admins can update all appointments" ON public.appointments;
CREATE POLICY "Admins can update all appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Appointments: admin can delete all
DROP POLICY IF EXISTS "Admins can delete all appointments" ON public.appointments;
CREATE POLICY "Admins can delete all appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Contact submissions: admins can view
DROP POLICY IF EXISTS "Authenticated admins can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Authenticated admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Appointments: view policy (restrict to admins, keeping original name for continuity)
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
CREATE POLICY "Authenticated users can view appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
