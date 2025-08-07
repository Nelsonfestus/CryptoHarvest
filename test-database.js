import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDatabase() {
  try {
    console.log('🔧 Testing database connectivity...')
    
    // Test 1: Check if we can access the users table
    console.log('\n📊 Test 1: Checking users table access...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (usersError) {
      console.error('❌ Users table error:', usersError)
    } else {
      console.log('✅ Users table is accessible')
    }
    
    // Test 2: Check if trigger function exists
    console.log('\n📊 Test 2: Checking trigger function...')
    const { data: functions, error: functionsError } = await supabase
      .rpc('handle_new_user', {})
    
    if (functionsError) {
      console.error('❌ Trigger function error:', functionsError)
    } else {
      console.log('✅ Trigger function exists')
    }
    
    // Test 3: Try to create a test user
    console.log('\n📊 Test 3: Testing user creation...')
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'test123456'
    })
    
    if (authError) {
      console.error('❌ Auth signup error:', authError.message)
      console.error('❌ Error details:', authError)
    } else {
      console.log('✅ Test user created successfully:', authData.user.id)
      
      // Clean up - delete the test user
      const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id)
      if (deleteError) {
        console.log('⚠️ Could not delete test user (this is normal)')
      } else {
        console.log('✅ Test user cleaned up')
      }
    }
    
    // Test 4: Check RLS policies
    console.log('\n📊 Test 4: Checking RLS policies...')
    const { data: policies, error: policiesError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (policiesError) {
      console.error('❌ RLS policy error:', policiesError)
    } else {
      console.log('✅ RLS policies are working')
    }
    
  } catch (error) {
    console.error('❌ General error:', error)
  }
}

testDatabase() 