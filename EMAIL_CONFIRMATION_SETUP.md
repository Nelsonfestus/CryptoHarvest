# Email Confirmation Setup Guide

## 📧 Setting Up Email Confirmation in Supabase

### **Why Email Confirmation is Important**

- **Security**: Prevents fake accounts and spam registrations
- **User Verification**: Ensures users provide valid email addresses
- **Account Recovery**: Enables password reset functionality
- **Professional**: Builds trust with your users

## 🚀 Step-by-Step Setup

### **1. Configure Email Settings in Supabase Dashboard**

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/ivjbrnhgrlgmqvtygkkl
2. **Navigate to**: Authentication > Settings
3. **Click on**: "Email Templates"

### **2. Choose Email Provider**

#### **Option A: Supabase Built-in Email (Free - Good for Development)**

**Pros:**
- ✅ Free (100 emails/day)
- ✅ Easy setup
- ✅ No configuration needed
- ✅ Perfect for testing

**Cons:**
- ❌ Limited to 100 emails/day
- ❌ Basic templates
- ❌ Not suitable for production

#### **Option B: Custom SMTP Provider (Recommended for Production)**

**Popular Options:**
- **SendGrid**: 100 emails/day free, then $14.95/month
- **Mailgun**: 5,000 emails/month free
- **Gmail**: 500 emails/day (requires app password)
- **Amazon SES**: Very cheap ($0.10 per 1,000 emails)

### **3. Configure SMTP Settings (If using Custom Provider)**

If you choose a custom SMTP provider, you'll need these settings:

```bash
# Example for Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SENDER_NAME=CryptoHarvest
SMTP_SENDER_EMAIL=noreply@cryptoharvest.info
```

### **4. Customize Email Templates**

In Supabase Dashboard > Authentication > Email Templates, you can customize:

#### **Confirmation Email Template**
```html
<h2>Welcome to CryptoHarvest!</h2>
<p>Hi {{ .Name }},</p>
<p>Thank you for creating your account with CryptoHarvest. Please click the button below to verify your email address:</p>
<a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
  Verify Email Address
</a>
<p>If you didn't create this account, you can safely ignore this email.</p>
<p>Best regards,<br>The CryptoHarvest Team</p>
```

#### **Password Reset Email Template**
```html
<h2>Reset Your Password</h2>
<p>Hi {{ .Name }},</p>
<p>We received a request to reset your password. Click the button below to create a new password:</p>
<a href="{{ .ConfirmationURL }}" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
  Reset Password
</a>
<p>This link will expire in 24 hours. If you didn't request this, you can safely ignore this email.</p>
<p>Best regards,<br>The CryptoHarvest Team</p>
```

### **5. Configure Authentication Settings**

In Supabase Dashboard > Authentication > Settings:

#### **Enable Email Confirmation**
- ✅ **Enable email confirmations**: Turn this ON
- ✅ **Secure email change**: Turn this ON
- ✅ **Enable phone confirmations**: Turn this OFF (unless you want SMS verification)

#### **Site URL Configuration**
- **Site URL**: `https://www.cryptoharvest.info` (for production)
- **Redirect URLs**: Add your domain URLs
  - `https://www.cryptoharvest.info/login`
  - `https://www.cryptoharvest.info/dashboard`
  - `http://localhost:5173/login` (for development)
  - `http://localhost:5173/dashboard` (for development)

### **6. Test Email Confirmation**

1. **Start your development server**: `npm run dev`
2. **Go to**: `http://localhost:5173/signup`
3. **Create a test account** with a real email address
4. **Check your email** for the confirmation link
5. **Click the confirmation link** to verify your account
6. **Try logging in** with the verified account

## 🔧 Advanced Configuration

### **Custom Email Templates with Branding**

You can create more professional email templates:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verify Your Email - CryptoHarvest</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #667eea; margin: 0;">CryptoHarvest</h1>
            <p style="color: #666; margin: 5px 0;">Your Crypto Investment Platform</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
            <h2 style="color: #333; margin-top: 0;">Welcome to CryptoHarvest!</h2>
            
            <p>Hi <strong>{{ .Name }}</strong>,</p>
            
            <p>Thank you for creating your account with CryptoHarvest. We're excited to have you join our community of crypto investors!</p>
            
            <p>To get started, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          font-weight: bold; 
                          display: inline-block;">
                    Verify Email Address
                </a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
                This link will expire in 24 hours. If you didn't create this account, 
                you can safely ignore this email.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>The CryptoHarvest Team</strong>
            </p>
            
            <div style="margin-top: 20px;">
                <a href="https://www.cryptoharvest.info" style="color: #667eea; text-decoration: none;">
                    Visit CryptoHarvest
                </a>
            </div>
        </div>
    </div>
</body>
</html>
```

### **Environment Variables for Production**

Add these to your production environment variables:

```bash
# Supabase Email Settings (if using custom SMTP)
SUPABASE_SMTP_HOST=smtp.gmail.com
SUPABASE_SMTP_PORT=587
SUPABASE_SMTP_USER=your-email@gmail.com
SUPABASE_SMTP_PASS=your-app-password
SUPABASE_SMTP_SENDER_NAME=CryptoHarvest
SUPABASE_SMTP_SENDER_EMAIL=noreply@cryptoharvest.info

# Site URLs
VITE_SITE_URL=https://www.cryptoharvest.info
VITE_REDIRECT_URL=https://www.cryptoharvest.info/dashboard
```

## 🧪 Testing Checklist

### **Development Testing**
- [ ] Sign up with valid email
- [ ] Receive confirmation email
- [ ] Click confirmation link
- [ ] Successfully log in after confirmation
- [ ] Test password reset functionality
- [ ] Verify email templates look good

### **Production Testing**
- [ ] Test with real domain
- [ ] Verify email deliverability
- [ ] Check spam folder settings
- [ ] Test on different email clients
- [ ] Monitor email analytics

## 🚨 Troubleshooting

### **Common Issues**

1. **Emails not sending**
   - Check SMTP settings
   - Verify email provider limits
   - Check spam folder

2. **Confirmation links not working**
   - Verify redirect URLs in Supabase
   - Check site URL configuration
   - Test with different browsers

3. **Template not updating**
   - Clear browser cache
   - Wait a few minutes for changes to propagate
   - Check template syntax

### **Email Provider Limits**

| Provider | Free Tier | Paid Plans |
|----------|-----------|------------|
| Supabase | 100/day | N/A |
| SendGrid | 100/day | $14.95/month |
| Mailgun | 5,000/month | $35/month |
| Gmail | 500/day | N/A |
| Amazon SES | $0.10/1,000 | Pay per use |

## 📊 Monitoring & Analytics

### **Track Email Performance**
- **Open rates**: How many users open your emails
- **Click rates**: How many users click confirmation links
- **Bounce rates**: Failed email deliveries
- **Spam complaints**: Users marking emails as spam

### **Best Practices**
- ✅ Use clear, professional subject lines
- ✅ Include your brand colors and logo
- ✅ Make confirmation buttons prominent
- ✅ Provide clear instructions
- ✅ Include support contact information
- ✅ Test on multiple email clients

---

**Need help?** Contact the development team or refer to the [Supabase documentation](https://supabase.com/docs/guides/auth/auth-email-templates). 