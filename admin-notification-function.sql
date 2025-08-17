-- Function to send admin notification when new user signs up
CREATE OR REPLACE FUNCTION notify_admin_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Send email notification to admin
  PERFORM
    net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Authorization', 'Bearer ' || current_setting('app.resend_api_key'),
        'Content-Type', 'application/json'
      ),
      body := jsonb_build_object(
        'from', 'CryptoHarvest <noreply@cryptoharvest.info>',
        'to', ARRAY['support@cryptoharvest.info'],
        'subject', 'New User Signup - CryptoHarvest',
        'html', format(
          '<!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New User Signup</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
              .user-info { background: white; padding: 15px; margin: 15px 0; border-radius: 5px; border-left: 4px solid #eb6709; }
              .label { font-weight: bold; color: #666; }
              .value { color: #333; }
              .button { display: inline-block; background: #eb6709; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New User Signup</h1>
                <p>A new user has joined CryptoHarvest!</p>
              </div>
              <div class="content">
                <div class="user-info">
                  <p><span class="label">Name:</span> <span class="value">%s</span></p>
                  <p><span class="label">Email:</span> <span class="value">%s</span></p>
                  <p><span class="label">Signup Date:</span> <span class="value">%s</span></p>
                  <p><span class="label">User ID:</span> <span class="value">%s</span></p>
                  <p><span class="label">Status:</span> <span class="value">Pending Email Verification</span></p>
                </div>
                <p><strong>User Details:</strong></p>
                <ul>
                  <li>Initial wallet balance: $1,000</li>
                  <li>Account type: Standard User</li>
                  <li>Email verification: Pending</li>
                </ul>
                <a href="https://www.cryptoharvest.info/admin" class="button">View in Admin Dashboard</a>
              </div>
              <div class="footer">
                <p>This is an automated notification from CryptoHarvest Admin System</p>
                <p>Time: %s</p>
              </div>
            </div>
          </body>
          </html>',
          NEW.name,
          NEW.email,
          to_char(NEW.created_at, 'YYYY-MM-DD HH24:MI:SS'),
          NEW.id,
          to_char(now(), 'YYYY-MM-DD HH24:MI:SS')
        )
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function when new user is inserted
CREATE OR REPLACE TRIGGER trigger_notify_admin_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_new_user();

-- Also create trigger for users table (in case user profile is created separately)
CREATE OR REPLACE TRIGGER trigger_notify_admin_new_user_profile
  AFTER INSERT ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION notify_admin_new_user();
