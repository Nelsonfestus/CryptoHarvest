import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAdminSetup() {
  try {
    console.log('🔧 Testing admin user setup...')
    
    // Check if admin user exists in public.users
    console.log('\n📊 Checking admin user in database...')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', 'e6f66e29-a3ec-4779-89e6-2125a680f230')
      .single()
    
    if (userError) {
      console.error('❌ Admin user not found in database:', userError.message)
      console.log('📝 You need to run the SQL insert statement first')
      return
    } else {
      console.log('✅ Admin user found in database!')
      console.log('👤 User details:', {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        is_verified: userData.is_verified,
        is_active: userData.is_active
      })
    }
    
    // Test admin login
    console.log('\n📊 Testing admin login...')
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
      
      // Check if role is admin
      if (userData.role === 'admin') {
        console.log('👑 Role: admin (correct!)')
      } else {
        console.log('⚠️ Role:', userData.role, '(should be admin)')
      }
    }
    
    console.log('\n🎉 Admin setup test complete!')
    console.log('📝 Next steps:')
    console.log('1. Go to: http://localhost:5173/admin-login')
    console.log('2. Login with admin@cryptoharvest.com')
    console.log('3. You should be redirected to the admin dashboard')
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

testAdminSetup() 