import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to_email, subject, user_name, user_email, signup_date, user_id } = await req.json()

    // Validate required fields
    if (!to_email || !subject || !user_name || !user_email) {
      throw new Error('Missing required fields')
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Signup</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff; 
          }
          .header { 
            background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9; 
          }
          .content { 
            padding: 30px 20px; 
            background: #f9f9f9; 
          }
          .user-info { 
            background: white; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 8px; 
            border-left: 4px solid #eb6709; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          }
          .info-row { 
            margin: 10px 0; 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
          }
          .label { 
            font-weight: bold; 
            color: #666; 
            min-width: 120px; 
          }
          .value { 
            color: #333; 
            font-weight: 500; 
          }
          .details { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
          }
          .details h3 { 
            margin: 0 0 15px 0; 
            color: #eb6709; 
          }
          .details ul { 
            margin: 0; 
            padding-left: 20px; 
          }
          .details li { 
            margin: 8px 0; 
            color: #555; 
          }
          .button { 
            display: inline-block; 
            background: #eb6709; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0; 
            font-weight: bold; 
            text-align: center; 
          }
          .button:hover { 
            background: #d55a08; 
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 12px; 
            background: #f0f0f0; 
          }
          .status-badge { 
            background: #ffd700; 
            color: #333; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold; 
          }
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
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${user_name}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${user_email}</span>
              </div>
              <div class="info-row">
                <span class="label">Signup Date:</span>
                <span class="value">${signup_date}</span>
              </div>
              <div class="info-row">
                <span class="label">User ID:</span>
                <span class="value">${user_id}</span>
              </div>
              <div class="info-row">
                <span class="label">Status:</span>
                <span class="status-badge">Pending Email Verification</span>
              </div>
            </div>
            
            <div class="details">
              <h3>📋 Account Information</h3>
              <ul>
                <li><strong>Initial wallet balance:</strong> $1,000</li>
                <li><strong>Account type:</strong> Standard User</li>
                <li><strong>Email verification:</strong> Pending</li>
                <li><strong>Registration source:</strong> Web Signup</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://www.cryptoharvest.info/admin" class="button">
                🔗 View in Admin Dashboard
              </a>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated notification from CryptoHarvest Admin System</p>
            <p>Notification sent at: ${new Date().toLocaleString()}</p>
            <p>© 2024 CryptoHarvest. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // For now, we'll just return success and log the email content
    // In production, you would integrate with an email service like SendGrid, Mailgun, etc.
    console.log('📧 Admin Notification Details:')
    console.log('To:', to_email)
    console.log('Subject:', subject)
    console.log('User:', user_name, user_email)
    console.log('Signup Date:', signup_date)
    console.log('User ID:', user_id)

    // TODO: Integrate with email service
    // For now, we'll simulate success
    // You can add your preferred email service here:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // - Or use Supabase's email templates

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin notification processed successfully',
        user: { name: user_name, email: user_email, signup_date },
        note: 'Email service integration required for actual email sending'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing admin notification:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
