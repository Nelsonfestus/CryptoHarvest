import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function simpleAdminTest() {
  try {
    console.log('🔧 Simple admin test...')
    
    // Test 1: Check if we can access users table
    console.log('\n📊 Test 1: Checking users table access...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)
    
    if (usersError) {
      console.error('❌ Users table error:', usersError)
      return
    } else {
      console.log('✅ Users table is accessible!')
      console.log('📊 Found', users.length, 'users in database')
      
      if (users.length > 0) {
        users.forEach(user => {
          console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
        })
      }
    }
    
    // Test 2: Try admin login
    console.log('\n📊 Test 2: Testing admin login...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error('❌ Admin login failed:', signInError.message)
      console.log('📝 You may need to reset the password in Supabase Dashboard')
    } else {
      console.log('✅ Admin login successful!')
      console.log('🆔 User ID:', signInData.user.id)
      console.log('📧 Email:', signInData.user.email)
      
      // Check if this user exists in public.users
      const adminUser = users.find(user => user.id === signInData.user.id)
      if (adminUser) {
        console.log('✅ User found in public.users table!')
        console.log('👑 Role:', adminUser.role)
        if (adminUser.role === 'admin') {
          console.log('🎉 Admin setup is working!')
        } else {
          console.log('⚠️ User role is not admin')
        }
      } else {
        console.log('❌ User not found in public.users table')
      }
    }
    
    console.log('\n📝 Next steps:')
    console.log('1. Go to: http://localhost:5173/admin-login')
    console.log('2. Login with admin@cryptoharvest.com')
    console.log('3. Or go to: https://www.cryptoharvest.info/admin')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

simpleAdminTest() 