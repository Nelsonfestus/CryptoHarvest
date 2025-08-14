# Supabase Domain Email Setup Guide

## 🎯 **Domain Email Configuration for CryptoHarvest**

### **Domain Information:**
- **Domain**: cryptoharvest.info
- **Support Email**: support@cryptoharvest.info

---

## 📋 **Step 1: Supabase Dashboard Configuration**

### **1.1 Authentication Settings**
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Settings**
3. Update the following settings:

#### **Site URL:**
```
https://www.cryptoharvest.info
```

#### **Redirect URLs:**
```
https://www.cryptoharvest.info/dashboard
https://www.cryptoharvest.info/admin
https://www.cryptoharvest.info/login
https://www.cryptoharvest.info/signup
```

### **1.2 Email Templates**
1. Go to **Authentication** → **Email Templates**
2. Update the following templates:

#### **Confirm Signup Email:**
- **Subject**: `Welcome to CryptoHarvest - Confirm Your Account`
- **From Email**: `support@cryptoharvest.info`
- **From Name**: `CryptoHarvest Support`

#### **Magic Link Email:**
- **Subject**: `CryptoHarvest - Your Magic Link`
- **From Email**: `support@cryptoharvest.info`
- **From Name**: `CryptoHarvest Support`

#### **Change Email Address:**
- **Subject**: `CryptoHarvest - Confirm Email Change`
- **From Email**: `support@cryptoharvest.info`
- **From Name**: `CryptoHarvest Support`

#### **Reset Password:**
- **Subject**: `CryptoHarvest - Reset Your Password`
- **From Email**: `support@cryptoharvest.info`
- **From Name**: `CryptoHarvest Support`

---

## 📧 **Step 2: Email Provider Configuration**

### **2.1 SMTP Settings (if using custom SMTP)**
If you're using a custom SMTP provider:

```
SMTP Host: [Your SMTP Host]
SMTP Port: 587 (or 465 for SSL)
Username: support@cryptoharvest.info
Password: [Your SMTP Password]
Encryption: TLS
```

### **2.2 Supabase Built-in Email (Recommended)**
If using Supabase's built-in email service:
- No additional configuration needed
- Emails will be sent from Supabase's infrastructure
- You can customize the "From" name and email in templates

---

## 🔧 **Step 3: Frontend Configuration Updates**

### **3.1 Update Supabase Client Configuration**
Update your `src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: 'https://www.cryptoharvest.info/dashboard'
  }
})
```

### **3.2 Update Email Confirmation Settings**
In your signup component, ensure email confirmation is properly configured:

```javascript
// In Signup.vue
const { data, error } = await supabase.auth.signUp({
  email: this.email,
  password: this.password,
  options: {
    data: { name: this.name },
    emailRedirectTo: 'https://www.cryptoharvest.info/dashboard'
  }
})
```

---

## 🧪 **Step 4: Testing Configuration**

### **4.1 Test Email Templates**
1. Go to **Authentication** → **Users**
2. Create a test user or use existing user
3. Send test emails:
   - **Confirm Signup**: Resend confirmation email
   - **Reset Password**: Send password reset email
   - **Magic Link**: Send magic link email

### **4.2 Test Email Delivery**
1. Check if emails are received
2. Verify "From" address shows `support@cryptoharvest.info`
3. Test email links work correctly
4. Verify redirect URLs work properly

### **4.3 Test Authentication Flow**
1. **Signup Flow**:
   - User signs up → Email confirmation sent
   - User clicks confirmation link → Redirected to dashboard
   
2. **Login Flow**:
   - User logs in → Session created
   - User redirected to dashboard
   
3. **Password Reset Flow**:
   - User requests password reset → Email sent
   - User clicks reset link → Password reset page
   - User sets new password → Login page

---

## 🔍 **Step 5: Verification Checklist**

### **✅ Email Configuration:**
- [ ] Support email set to `support@cryptoharvest.info`
- [ ] All email templates updated
- [ ] Site URL set to `https://www.cryptoharvest.info`
- [ ] Redirect URLs configured correctly

### **✅ Authentication Flow:**
- [ ] Signup emails sent from correct address
- [ ] Confirmation links work properly
- [ ] Password reset emails delivered
- [ ] Magic link emails functional

### **✅ Frontend Integration:**
- [ ] Supabase client configured correctly
- [ ] Email confirmation flow working
- [ ] Redirect URLs functioning
- [ ] Session management working

---

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Emails not sending**:
   - Check SMTP configuration
   - Verify email provider settings
   - Check Supabase email quotas

2. **Confirmation links not working**:
   - Verify redirect URLs in Supabase dashboard
   - Check frontend redirect configuration
   - Test with different browsers

3. **Domain not verified**:
   - Add DNS records for domain verification
   - Contact Supabase support if needed

---

## 📞 **Support**

If you encounter issues:
1. Check Supabase documentation
2. Review email provider settings
3. Test with different email addresses
4. Contact Supabase support if needed

**Domain**: cryptoharvest.info  
**Support**: support@cryptoharvest.info

