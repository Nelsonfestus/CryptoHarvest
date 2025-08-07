-- COMPLETE DATABASE FIX
-- This will completely reset the users table and recreate everything

-- Step 1: Disable RLS completely
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Allow insert for trigger" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for users based on email" ON public.users;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON public.users;

-- Step 3: Drop the trigger and function
DROP TRIGGER IF EXISTS handle_new_user ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 4: Clear the users table (optional - only if you want to start fresh)
-- TRUNCATE TABLE public.users;

-- Step 5: Create a simple trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    CASE 
      WHEN NEW.email = 'admin@cryptoharvest.com' THEN 'admin'
      ELSE 'user'
    END,
    true,
    true,
    0,
    0,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create the trigger
CREATE TRIGGER handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Keep RLS disabled for now (we'll enable it later if needed)
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 8: Create simple policies (only if you want RLS enabled)
-- CREATE POLICY "Allow all operations" ON public.users FOR ALL USING (true); 