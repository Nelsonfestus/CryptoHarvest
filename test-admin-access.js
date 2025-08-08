import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAdminAccess() {
  console.log('🔧 Testing Admin Access...')
  
  try {
    // Step 1: Check users in database
    console.log('\n📊 Step 1: Checking users in database...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError)
      return
    }
    
    console.log('📊 Users found in database:')
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
    })
    
    // Step 2: Try to sign in with admin credentials
    console.log('\n📊 Step 2: Testing admin login...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error('❌ Sign in error:', signInError.message)
      
      // Step 3: Try to reset password
      console.log('\n📊 Step 3: Attempting password reset...')
      const { error: resetError } = await supabase.auth.resetPasswordForEmail('admin@cryptoharvest.com', {
        redirectTo: 'https://www.cryptoharvest.info/admin-login'
      })
      
      if (resetError) {
        console.error('❌ Password reset error:', resetError.message)
      } else {
        console.log('✅ Password reset email sent!')
      }
    } else {
      console.log('✅ Admin login successful!')
      console.log('📊 User data:', {
        id: signInData.user.id,
        email: signInData.user.email,
        role: signInData.user.user_metadata?.role || 'not set'
      })
      
      // Step 4: Check if user exists in public.users table
      console.log('\n📊 Step 4: Checking public.users table...')
      const { data: publicUser, error: publicUserError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signInData.user.id)
        .single()
      
      if (publicUserError) {
        console.error('❌ Error fetching public user:', publicUserError)
      } else {
        console.log('✅ User found in public.users:', {
          id: publicUser.id,
          email: publicUser.email,
          role: publicUser.role,
          is_verified: publicUser.is_verified,
          is_active: publicUser.is_active
        })
      }
    }
    
    // Step 5: Check authentication settings
    console.log('\n📊 Step 5: Checking authentication settings...')
    console.log('ℹ️  Make sure in Supabase Dashboard:')
    console.log('   - Go to Authentication > Settings')
    console.log('   - Enable "Enable email confirmations" is OFF')
    console.log('   - Enable "Enable email change confirmations" is OFF')
    console.log('   - Enable "Enable phone confirmations" is OFF')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the test
testAdminAccess()
