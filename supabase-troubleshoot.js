import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function troubleshootSupabase() {
  console.log('🔧 Comprehensive Supabase Troubleshooting...')
  console.log('=' .repeat(50))
  
  try {
    // Step 1: Test basic connection
    console.log('\n📊 Step 1: Testing Supabase Connection...')
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Connection failed:', testError.message)
      return
    } else {
      console.log('✅ Supabase connection successful!')
    }
    
    // Step 2: Check database schema
    console.log('\n📊 Step 2: Checking Database Schema...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    if (usersError) {
      console.error('❌ Users table error:', usersError.message)
      console.log('🔧 This suggests a schema issue')
    } else {
      console.log(`✅ Users table accessible - ${users.length} users found`)
      users.forEach(user => {
        console.log(`  - ${user.email} (${user.role}) - ID: ${user.id}`)
      })
    }
    
    // Step 3: Test RLS policies
    console.log('\n📊 Step 3: Testing RLS Policies...')
    const { data: rlsTest, error: rlsError } = await supabase
      .from('users')
      .insert({
        id: 'test-rls-' + Date.now(),
        email: 'test-rls@example.com',
        name: 'Test RLS',
        role: 'user',
        is_verified: true,
        is_active: true,
        wallet_balance: 0,
        total_invested: 0,
        total_profit: 0
      })
    
    if (rlsError) {
      console.error('❌ RLS policy blocking insert:', rlsError.message)
      console.log('🔧 RLS needs to be disabled or policies fixed')
    } else {
      console.log('✅ RLS policies allow inserts')
      // Clean up test data
      await supabase
        .from('users')
        .delete()
        .eq('email', 'test-rls@example.com')
    }
    
    // Step 4: Test trigger function
    console.log('\n📊 Step 4: Testing Trigger Function...')
    const { data: triggerTest, error: triggerError } = await supabase.auth.signUp({
      email: 'trigger-test@example.com',
      password: 'test123456'
    })
    
    if (triggerError) {
      console.error('❌ Trigger function error:', triggerError.message)
      console.log('🔧 Trigger function needs to be fixed')
    } else {
      console.log('✅ Trigger function working - user created in auth')
      
      // Check if user was added to public.users
      const { data: publicUser, error: publicError } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'trigger-test@example.com')
        .single()
      
      if (publicError) {
        console.error('❌ User not added to public.users:', publicError.message)
        console.log('🔧 Trigger function not working properly')
      } else {
        console.log('✅ User successfully added to public.users')
      }
    }
    
    // Step 5: Test admin user creation
    console.log('\n📊 Step 5: Testing Admin User Creation...')
    const { data: adminTest, error: adminError } = await supabase.auth.signUp({
      email: 'admin-test@cryptoharvest.com',
      password: 'admin123456',
      options: {
        data: {
          name: 'Admin Test',
          role: 'admin'
        }
      }
    })
    
    if (adminError) {
      console.error('❌ Admin user creation failed:', adminError.message)
    } else {
      console.log('✅ Admin user created in auth')
      
      // Update role in public.users
      const { error: roleError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('email', 'admin-test@cryptoharvest.com')
      
      if (roleError) {
        console.error('❌ Failed to update role:', roleError.message)
      } else {
        console.log('✅ Admin role set successfully')
      }
    }
    
    // Step 6: Test authentication
    console.log('\n📊 Step 6: Testing Authentication...')
    const { data: authTest, error: authError } = await supabase.auth.signInWithPassword({
      email: 'admin-test@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (authError) {
      console.error('❌ Authentication failed:', authError.message)
    } else {
      console.log('✅ Authentication successful!')
      console.log('📊 User session:', {
        id: authTest.user.id,
        email: authTest.user.email
      })
    }
    
    // Step 7: Provide summary and recommendations
    console.log('\n📊 Step 7: Summary and Recommendations...')
    console.log('=' .repeat(50))
    console.log('🔧 Based on the tests above, here are the issues and fixes:')
    console.log('')
    console.log('1. If RLS is blocking inserts:')
    console.log('   - Go to Supabase Dashboard > SQL Editor')
    console.log('   - Run: ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;')
    console.log('')
    console.log('2. If trigger function is failing:')
    console.log('   - Drop and recreate the handle_new_user function')
    console.log('   - Check for foreign key constraints')
    console.log('')
    console.log('3. If authentication is failing:')
    console.log('   - Check if users exist in Authentication > Users')
    console.log('   - Reset passwords manually if needed')
    console.log('')
    console.log('4. For admin access:')
    console.log('   - Create admin users manually in Authentication > Users')
    console.log('   - Set role to "admin" in public.users table')
    console.log('')
    console.log('🌐 Test your app at: http://localhost:5173/admin-login')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the troubleshooting
troubleshootSupabase()

