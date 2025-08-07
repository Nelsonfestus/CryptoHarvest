import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkExistingUsers() {
  try {
    console.log('🔧 Checking existing users...')
    
    // Check users in database
    console.log('\n📊 Users in database:')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    if (usersError) {
      console.error('❌ Database error:', usersError)
    } else {
      if (users && users.length > 0) {
        users.forEach(user => {
          console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
        })
      } else {
        console.log('No users found in database')
      }
    }
    
    // Try to sign in with existing admin
    console.log('\n📊 Testing existing admin login...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error('❌ Admin login failed:', signInError.message)
    } else {
      console.log('✅ Admin login successful!')
      console.log('🆔 User ID:', signInData.user.id)
      console.log('📧 Email:', signInData.user.email)
      
      // Update this user to use the new email
      console.log('\n📊 Updating user email...')
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          email: 'harvestcrypto200@gmail.com',
          role: 'admin'
        })
        .eq('id', signInData.user.id)
      
      if (updateError) {
        console.error('❌ Update error:', updateError)
      } else {
        console.log('✅ User updated successfully!')
        console.log('📧 New email: harvestcrypto200@gmail.com')
        console.log('👑 Role: admin')
      }
    }
    
    console.log('\n📝 Next steps:')
    console.log('1. Go to: http://localhost:5173/admin-login')
    console.log('2. Try login with: admin@cryptoharvest.com / admin123456')
    console.log('3. Or try: harvestcrypto200@gmail.com / admin123456')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkExistingUsers() 