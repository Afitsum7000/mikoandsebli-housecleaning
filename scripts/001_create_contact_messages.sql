-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public contact form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only allow authenticated users (admins) to read messages
CREATE POLICY "Allow authenticated users to read" ON public.contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');
