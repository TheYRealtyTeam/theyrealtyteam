-- Phase 1: Critical Security Fixes - Implement Role-Based Access Control

-- Step 1: Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all roles"
ON public.user_roles
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Step 4: Update contact_submissions RLS policies
DROP POLICY IF EXISTS "Authenticated admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage contact submissions"
ON public.contact_submissions
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Step 5: Update appointments RLS policies
DROP POLICY IF EXISTS "Authenticated users can view appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can update all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can delete all appointments" ON public.appointments;

CREATE POLICY "Admins can view all appointments"
ON public.appointments
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all appointments"
ON public.appointments
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete all appointments"
ON public.appointments
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Step 6: Update blog_posts RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to update their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admin only: insert blog posts" ON public.blog_posts;

CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Step 7: Add admin role for existing admin user (if exists)
-- This will need to be run manually for the actual admin user
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'admin@yrealty.com'
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Step 8: Ensure security_logs is properly secured
CREATE POLICY "Admins can view security logs"
ON public.security_logs
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Step 9: Ensure rate_limit_log is properly secured
CREATE POLICY "Admins can view rate limit logs"
ON public.rate_limit_log
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));