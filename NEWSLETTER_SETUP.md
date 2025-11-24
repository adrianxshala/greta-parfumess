# Newsletter Setup Guide

## 1. Create Newsletter Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for subscriptions)
CREATE POLICY "Allow public insert" ON newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public read (optional - for checking if email exists)
CREATE POLICY "Allow public read" ON newsletter_subscriptions
  FOR SELECT
  USING (true);
```

## 2. Email Notifications (Optional)

To receive email notifications when someone subscribes, you have two options:

### Option A: Use Supabase Edge Functions (Recommended)

Create an Edge Function that sends you an email when someone subscribes.

### Option B: Use EmailJS (Simple)

1. Sign up at https://www.emailjs.com/
2. Create an email service template
3. Add your EmailJS credentials to `.env`

## 3. Environment Variables

Add to your `.env` file (if using EmailJS):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_EMAIL=your-email@example.com
```
