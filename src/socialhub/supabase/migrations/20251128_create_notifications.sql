-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sent_by UUID,
  user_id UUID,
  is_global BOOLEAN DEFAULT true
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Allow SELECT only for global notifications or notifications targeted to the user
CREATE POLICY "Public can view notifications"
  ON public.notifications FOR SELECT
  USING (is_global = true OR user_id = auth.uid());

-- Allow authenticated users to INSERT notifications only if they set sent_by to their id
CREATE POLICY "Authenticated can insert own notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() = sent_by);
