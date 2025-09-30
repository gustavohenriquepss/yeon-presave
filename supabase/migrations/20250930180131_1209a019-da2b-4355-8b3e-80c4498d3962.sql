-- Create email subscriptions table
CREATE TABLE public.email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their email (public sign-up)
CREATE POLICY "Anyone can subscribe with their email"
  ON public.email_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Allow reading for authenticated users (for future admin panel)
CREATE POLICY "Authenticated users can view subscriptions"
  ON public.email_subscriptions
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create index for faster email lookups
CREATE INDEX idx_email_subscriptions_email ON public.email_subscriptions(email);