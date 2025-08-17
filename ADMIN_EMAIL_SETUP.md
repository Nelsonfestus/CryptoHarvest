# Admin Email Notification Setup Guide

## 🎯 **Overview**
This guide will help you set up automatic email notifications to `support@cryptoharvest.info` whenever a new user signs up for CryptoHarvest.

---

## 📋 **Step 1: Supabase Database Setup**

### **1.1 Enable Required Extensions**
1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Extensions**
3. Enable the following extensions:
   - `pg_net` (for HTTP requests)
   - `uuid-ossp` (for UUID generation)

### **1.2 Run Database Functions**
1. Go to **SQL Editor** in your Supabase Dashboard
2. Run the SQL from `admin-notification-function.sql` or `supabase-admin-notification.sql`
3. This creates the database triggers and functions

---

## 🚀 **Step 2: Deploy Supabase Edge Function**

### **2.1 Install Supabase CLI**
```bash
npm install -g supabase
```

### **2.2 Login to Supabase**
```bash
supabase login
```

### **2.3 Deploy the Edge Function**
```bash
# Navigate to your project directory
cd CryptoHarvest

# Deploy the function
supabase functions deploy send-admin-notification
```

### **2.4 Set Environment Variables**
In your Supabase Dashboard:
1. Go to **Settings** → **API**
2. Copy your **Service Role Key**
3. Go to **Settings** → **Edge Functions**
4. Add environment variable:
   - Key: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: Your service role key

---

## 📧 **Step 3: Email Configuration**

### **3.1 Supabase Email Settings**
1. Go to **Authentication** → **Settings**
2. Configure email settings:
   - **Site URL**: `https://www.cryptoharvest.info`
   - **Redirect URLs**: Add your confirmation URLs

### **3.2 Email Templates (Optional)**
1. Go to **Authentication** → **Email Templates**
2. Customize the **Confirm Signup** template:
   - **Subject**: `Welcome to CryptoHarvest - Confirm Your Account`
   - **From Email**: `support@cryptoharvest.info`
   - **From Name**: `CryptoHarvest Support`

---

## 🔧 **Step 4: Frontend Configuration**

### **4.1 Environment Variables**
Ensure your `.env` file has:
```env
VITE_SUPABASE_URL=https://ivjbrnhgrlgmqvtygkkl.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### **4.2 Test the Setup**
1. Create a test user account
2. Check if email is sent to `support@cryptoharvest.info`
3. Verify the email contains all user details

---

## 📊 **Step 5: Admin Dashboard Integration**

### **5.1 View Recent Signups**
The admin dashboard will now show:
- New user notifications
- User signup history
- Account status tracking

### **5.2 Email Content**
Each admin notification includes:
- ✅ User's full name
- ✅ User's email address
- ✅ Signup date and time
- ✅ User ID
- ✅ Account status
- ✅ Direct link to admin dashboard

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. Emails Not Sending**
- Check Supabase Edge Function logs
- Verify service role key is set correctly
- Ensure `pg_net` extension is enabled

#### **2. Function Deployment Fails**
- Check Supabase CLI is installed and logged in
- Verify project linking is correct
- Check function syntax in `index.ts`

#### **3. Database Triggers Not Working**
- Verify SQL functions are executed successfully
- Check database permissions
- Ensure triggers are created on correct tables

### **Testing the System:**
```bash
# Test the edge function directly
curl -X POST https://ivjbrnhgrlgmqvtygkkl.supabase.co/functions/v1/send-admin-notification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "to_email": "support@cryptoharvest.info",
    "subject": "Test Notification",
    "user_name": "Test User",
    "user_email": "test@example.com",
    "signup_date": "2024-01-01 12:00:00",
    "user_id": "test-id"
  }'
```

---

## 📈 **Monitoring & Analytics**

### **Track Email Deliverability:**
- Monitor Supabase Edge Function logs
- Check email delivery status
- Track notification success rates

### **Admin Dashboard Features:**
- Real-time user signup notifications
- User activity tracking
- Account verification status
- Investment activity monitoring

---

## 🔒 **Security Considerations**

### **Data Protection:**
- Admin emails contain sensitive user information
- Ensure `support@cryptoharvest.info` is secure
- Consider email encryption for sensitive data

### **Rate Limiting:**
- Implement rate limiting on signup process
- Monitor for spam signups
- Set up abuse detection

---

## ✅ **Verification Checklist**

- [ ] Database functions deployed successfully
- [ ] Edge function deployed and accessible
- [ ] Environment variables configured
- [ ] Email templates customized
- [ ] Test signup sends admin notification
- [ ] Admin dashboard shows new users
- [ ] Email content is properly formatted
- [ ] Links to admin dashboard work correctly

---

## 📞 **Support**

If you encounter issues:
1. Check Supabase Dashboard logs
2. Verify all configuration steps
3. Test with a new signup
4. Contact support if problems persist

**Admin Email**: `support@cryptoharvest.info`
**System Status**: Active and monitoring new signups
