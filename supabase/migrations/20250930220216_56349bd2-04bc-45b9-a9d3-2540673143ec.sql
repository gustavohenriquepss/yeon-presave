-- Drop the overly permissive SELECT policy that exposes all email addresses
-- Users don't need to read email subscriptions, only insert them
DROP POLICY IF EXISTS "Authenticated users can view subscriptions" ON public.email_subscriptions;

-- If admin access is needed in the future, create a specific admin-only policy
-- instead of allowing all authenticated users to view sensitive data