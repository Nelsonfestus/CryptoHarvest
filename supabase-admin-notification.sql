-- Alternative function using Supabase's built-in email capabilities
CREATE OR REPLACE FUNCTION notify_admin_new_user_supabase()
RETURNS TRIGGER AS $$
DECLARE
  email_content TEXT;
BEGIN
  -- Create email content
  email_content := format(
    'Subject: New User Signup - CryptoHarvest

A new user has signed up for CryptoHarvest!

User Details:
- Name: %s
- Email: %s
- Signup Date: %s
- User ID: %s
- Status: Pending Email Verification

Account Information:
- Initial wallet balance: $1,000
- Account type: Standard User
- Email verification: Pending

Admin Dashboard: https://www.cryptoharvest.info/admin

This is an automated notification from CryptoHarvest Admin System.
Time: %s',
    NEW.name,
    NEW.email,
    to_char(NEW.created_at, 'YYYY-MM-DD HH24:MI:SS'),
    NEW.id,
    to_char(now(), 'YYYY-MM-DD HH24:MI:SS')
  );

  -- Send email using Supabase's built-in email function
  -- Note: This requires the pg_net extension to be enabled
  PERFORM
    net.http_post(
      url := 'https://ivjbrnhgrlgmqvtygkkl.supabase.co/functions/v1/send-admin-notification',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key'),
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'to_email', 'support@cryptoharvest.info',
        'subject', 'New User Signup - CryptoHarvest',
        'user_name', NEW.name,
        'user_email', NEW.email,
        'signup_date', to_char(NEW.created_at, 'YYYY-MM-DD HH24:MI:SS'),
        'user_id', NEW.id
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for the alternative function
CREATE OR REPLACE TRIGGER trigger_notify_admin_new_user_supabase
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_new_user_supabase();
