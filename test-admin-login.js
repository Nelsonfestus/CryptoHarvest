import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAdminLogin() {
  console.log('🔧 Testing Admin Login...')
  console.log('=' .repeat(40))
  
  try {
    // Test admin login with existing admin users
    const adminEmails = [
      'admin@cryptoharvest.com',
      'testadmin@cryptoharvest.com',
      'admin-test@cryptoharvest.com'
    ]
    
    for (const email of adminEmails) {
      console.log(`\n📧 Testing login with: ${email}`)
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'admin123456'
      })
      
      if (signInError) {
        console.error(`❌ Login failed: ${signInError.message}`)
        
        if (signInError.message.includes('Invalid login credentials')) {
          console.log('🔧 This user needs to be created in Authentication > Users')
          console.log('📝 Steps:')
          console.log('   1. Go to Supabase Dashboard > Authentication > Users')
          console.log('   2. Click "Add User"')
          console.log(`   3. Email: ${email}`)
          console.log('   4. Password: admin123456')
          console.log('   5. User Metadata: {"name": "Admin", "role": "admin"}')
        }
      } else {
        console.log(`✅ Login successful!`)
        console.log('📊 User data:', {
          id: signInData.user.id,
          email: signInData.user.email
        })
        
        // Check if user is admin in database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', signInData.user.id)
          .single()
        
        if (userError) {
          console.error('❌ Error checking user role:', userError.message)
        } else {
          console.log(`📊 User role in database: ${userData.role}`)
          if (userData.role === 'admin') {
            console.log('🎉 Admin access confirmed!')
            console.log('\n📝 Working Admin Credentials:')
            console.log(`📧 Email: ${email}`)
            console.log('🔑 Password: admin123456')
            console.log('🌐 Go to: http://localhost:5173/admin-login')
            return
          }
        }
      }
    }
    
    console.log('\n📊 Summary:')
    console.log('❌ No working admin login found')
    console.log('🔧 You need to create admin users in Authentication > Users')
    console.log('📝 Follow the steps above for each email address')
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the test
testAdminLogin()

