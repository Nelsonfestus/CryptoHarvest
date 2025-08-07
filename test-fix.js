import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testFix() {
  try {
    console.log('🔧 Testing database fix...')
    
    // Test 1: Check if users table is accessible
    console.log('\n📊 Test 1: Checking users table...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (usersError) {
      console.error('❌ Users table still has issues:', usersError)
      return
    } else {
      console.log('✅ Users table is now accessible!')
    }
    
    // Test 2: Try to create a test user
    console.log('\n📊 Test 2: Testing user creation...')
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'test123456',
      options: {
        data: {
          name: 'Test User'
        }
      }
    })
    
    if (authError) {
      console.error('❌ User creation still failing:', authError.message)
      return
    } else {
      console.log('✅ User creation is working!')
      console.log('📧 Created user ID:', authData.user.id)
      
      // Test 3: Check if user was added to public.users
      console.log('\n📊 Test 3: Checking if user was added to public.users...')
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()
      
      if (userError) {
        console.error('❌ User not found in public.users:', userError)
      } else {
        console.log('✅ User successfully added to public.users!')
        console.log('👤 User details:', {
          name: userData.name,
          email: userData.email,
          role: userData.role
        })
      }
      
      // Clean up - delete test user
      console.log('\n🧹 Cleaning up test user...')
      const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id)
      if (deleteError) {
        console.log('⚠️ Could not delete test user (this is normal)')
      } else {
        console.log('✅ Test user cleaned up')
      }
    }
    
    console.log('\n🎉 Database fix appears to be working!')
    console.log('📝 Next steps:')
    console.log('1. Create admin user in Supabase Dashboard')
    console.log('2. Test admin login at: http://localhost:5173/admin-login')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testFix() 