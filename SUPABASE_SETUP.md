# 🚀 Supabase Setup Guide for CryptoHarvest

## **Step 1: Create Supabase Project**

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Click "Start your project"
   - Sign up with GitHub or email

2. **Create New Project:**
   - Click "New Project"
   - Choose your organization
   - **Project Name:** `cryptoharvest`
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Your Credentials:**
   - Go to **Settings > API**
   - Copy these values:
     - **Project URL:** `https://your-project-id.supabase.co`
     - **Anon Public Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
     - **Service Role Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## **Step 2: Set Up Database Schema**

1. **Go to SQL Editor:**
   - In your Supabase dashboard, go to **SQL Editor**
   - Click "New Query"

2. **Run the Schema:**
   - Copy the entire content from `supabase-schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the schema

3. **Verify Tables:**
   - Go to **Table Editor**
   - You should see these tables:
     - `users`
     - `investments`
     - `chat_messages`
     - `transactions`
     - `investment_plans`

## **Step 3: Configure Environment Variables**

1. **Create `.env.local` file:**
   ```bash
   # In your project root, create .env.local
   VITE_SUPABASE_URL=your_supabase_project_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_APP_NAME=CryptoHarvest
   VITE_APP_URL=https://www.cryptoharvest.info
   ```

2. **Replace the placeholders:**
   - Replace `your_supabase_project_url_here` with your actual Project URL
   - Replace `your_supabase_anon_key_here` with your actual Anon Key

## **Step 4: Configure Authentication**

1. **Go to Authentication Settings:**
   - In Supabase dashboard, go to **Authentication > Settings**

2. **Configure Site URL:**
   - **Site URL:** `https://www.cryptoharvest.info`
   - **Redirect URLs:** 
     - `https://www.cryptoharvest.info/dashboard`
     - `https://www.cryptoharvest.info/admin`
     - `http://localhost:5173/dashboard` (for development)

3. **Email Templates (Optional):**
   - Customize email templates for confirmation and password reset

## **Step 5: Create Admin User**

1. **Sign up as Admin:**
   - Go to your website
   - Sign up with email: `admin@cryptoharvest.com`
   - Password: `admin123`
   - The database trigger will automatically assign admin role

2. **Or Create via SQL:**
   ```sql
   -- In SQL Editor, run this to create admin user
   INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
   VALUES (gen_random_uuid(), 'admin@cryptoharvest.com', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW());
   ```

## **Step 6: Test the Setup**

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test Features:**
   - User registration
   - User login
   - Admin login
   - Investment creation
   - Chat support

## **Step 7: Deploy to Production**

1. **Update Environment Variables:**
   - In your hosting platform (Vercel, Netlify, etc.)
   - Add the same environment variables

2. **Update Site URL:**
   - In Supabase Authentication settings
   - Update Site URL to your production domain

## **🔧 Key Features Included:**

### **Authentication:**
- ✅ User registration and login
- ✅ Admin role management
- ✅ Session management
- ✅ Password reset

### **Database:**
- ✅ Users table with wallet balance
- ✅ Investments table with ROI tracking
- ✅ Chat messages for support
- ✅ Transactions history
- ✅ Investment plans

### **Security:**
- ✅ Row Level Security (RLS)
- ✅ User data isolation
- ✅ Admin-only access to sensitive data
- ✅ JWT token authentication

### **Real-time Features:**
- ✅ Live chat updates
- ✅ Investment status updates
- ✅ Real-time notifications

## **📊 Database Tables:**

1. **users** - User profiles and wallet data
2. **investments** - Investment records and ROI tracking
3. **chat_messages** - Support chat messages
4. **transactions** - Financial transaction history
5. **investment_plans** - Available investment plans

## **🔐 Admin Access:**

- **Email:** `admin@cryptoharvest.com`
- **Password:** `admin123`
- **Features:** View all users, investments, and manage the platform

## **🚨 Important Notes:**

1. **Backup your database password** - You'll need it for database access
2. **Keep your Service Role Key secret** - Only use Anon Key in frontend
3. **Test thoroughly** before going live
4. **Monitor usage** - Supabase has usage limits on free tier

## **📞 Support:**

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify environment variables are correct
3. Ensure database schema is properly applied
4. Check browser console for errors 