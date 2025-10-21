-- Direct admin role assignment for existing users
-- This is a one-time setup to initialize the admin system

-- Add admin role to the primary account
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'avrumy@theyteam.co'
ON CONFLICT (user_id, role) DO NOTHING;

-- Log the admin assignment
INSERT INTO public.security_logs (event, severity, details)
SELECT 
  'initial_admin_setup' as event,
  'high' as severity,
  jsonb_build_object(
    'user_id', id,
    'email', email,
    'timestamp', now()
  ) as details
FROM auth.users
WHERE email = 'avrumy@theyteam.co';