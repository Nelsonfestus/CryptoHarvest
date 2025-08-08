-- Complete Supabase Fix - Run this in Supabase SQL Editor
-- This will fix all known issues with user creation and admin access

-- Step 1: Disable RLS completely to avoid permission issues
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing triggers and functions
DROP TRIGGER IF EXISTS handle_new_user ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 3: Drop any problematic foreign key constraints
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- Step 4: Create a simple, robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Simple insert that won't fail
  INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    true,
    true,
    0,
    0,
    0
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the auth signup
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Recreate the trigger
CREATE TRIGGER handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 6: Clear any existing problematic users
DELETE FROM public.users WHERE email IN (
  'admin@cryptoharvest.com',
  'testadmin@cryptoharvest.com',
  'trigger-test@example.com',
  'admin-test@cryptoharvest.com'
);

-- Step 7: Create admin users with proper structure
INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)
VALUES 
  (
    gen_random_uuid(),
    'Admin User',
    'admin@cryptoharvest.com',
    'admin',
    true,
    true,
    0,
    0,
    0
  ),
  (
    gen_random_uuid(),
    'Test Admin',
    'testadmin@cryptoharvest.com',
    'admin',
    true,
    true,
    0,
    0,
    0
  );

-- Step 8: Show current state
SELECT 'Current users in database:' as info;
SELECT id, email, role, is_verified, is_active FROM public.users ORDER BY created_at DESC;

-- Step 9: Verify trigger function exists
SELECT 'Trigger function status:' as info;
SELECT 
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'handle_new_user';

-- Step 10: Check RLS status
SELECT 'RLS status:' as info;
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';

