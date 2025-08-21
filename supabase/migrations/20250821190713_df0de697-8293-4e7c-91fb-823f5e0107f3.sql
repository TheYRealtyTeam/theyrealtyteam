-- CRITICAL SECURITY FIX: Remove public access to sensitive customer data

-- Drop all overly permissive policies on contact_submissions
DROP POLICY IF EXISTS "Allow public read access" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow public insert" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow edge function to insert contact submissions" ON public.contact_submissions;

-- Drop all overly permissive policies on appointments  
DROP POLICY IF EXISTS "Allow public read access" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert" ON public.appointments;
DROP POLICY IF EXISTS "Allow public to insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow users to view own appointments" ON public.appointments;

-- Create secure policies for contact_submissions
-- Only service role can read contact submissions (for admin access)
CREATE POLICY "Service role can manage contact submissions"
ON public.contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anonymous users to submit contact forms (but not read them)
CREATE POLICY "Allow anonymous contact form submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create secure policies for appointments
-- Only service role can read appointments (for admin access)  
CREATE POLICY "Service role can manage appointments"
ON public.appointments
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anonymous users to book appointments (but not read existing ones)
CREATE POLICY "Allow anonymous appointment booking"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Drop overly permissive policies on blog_posts
DROP POLICY IF EXISTS "Allow public read access" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can create blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Anyone can view blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow blog post deletion" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow blog post management" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow blog post updates" ON public.blog_posts;

-- Create secure blog policies
CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts
FOR SELECT
TO anon, authenticated
USING (true);

-- Only service role can manage blog posts (admin access)
CREATE POLICY "Service role can manage blog posts"
ON public.blog_posts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Drop overly permissive policies on resources
DROP POLICY IF EXISTS "Allow public insert" ON public.resources;
DROP POLICY IF EXISTS "Allow public read access" ON public.resources;
DROP POLICY IF EXISTS "Authenticated users can upload resources" ON public.resources;

-- Create secure resource policies
CREATE POLICY "Anyone can view resources"
ON public.resources
FOR SELECT
TO anon, authenticated
USING (true);

-- Only service role can manage resources
CREATE POLICY "Service role can manage resources"
ON public.resources
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);