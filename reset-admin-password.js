import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function resetAdminPassword() {
  try {
    console.log('🔧 Resetting admin password...')
    
    // Step 1: Check what users exist in database
    console.log('\n📊 Step 1: Checking users in database...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    if (usersError) {
      console.error('❌ Database error:', usersError)
      return
    }
    
    if (users && users.length > 0) {
      console.log('📊 Users found in database:')
      users.forEach(user => {
        console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
      })
    } else {
      console.log('No users found in database')
    }
    
    // Step 2: Try to reset password using recovery email
    console.log('\n📊 Step 2: Sending password reset email...')
    const { data: resetData, error: resetError } = await supabase.auth.resetPasswordForEmail('harvestcrypto200@gmail.com', {
      redirectTo: 'http://localhost:5173/admin-login'
    })
    
    if (resetError) {
      console.error('❌ Reset error:', resetError.message)
      console.log('\n📝 The user might not exist in Authentication table')
      console.log('📝 We need to create the user in Authentication first')
    } else {
      console.log('✅ Password reset email sent!')
      console.log('📧 Check your email: harvestcrypto200@gmail.com')
      console.log('📝 Follow the link in the email to set a new password')
    }
    
    // Step 3: Try to create the user in Authentication if it doesn't exist
    console.log('\n📊 Step 3: Trying to create user in Authentication...')
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'harvestcrypto200@gmail.com',
      password: 'admin123456',
      options: {
        data: {
          name: 'Admin User'
        }
      }
    })
    
    if (signUpError) {
      console.error('❌ Sign up error:', signUpError.message)
      console.log('\n📝 The user might already exist or there are restrictions')
    } else {
      console.log('✅ User created in Authentication!')
      console.log('🆔 User ID:', signUpData.user.id)
      console.log('📧 Email:', signUpData.user.email)
      
      // Step 4: Update the database record to match
      console.log('\n📊 Step 4: Updating database record...')
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          id: signUpData.user.id,
          email: 'harvestcrypto200@gmail.com',
          role: 'admin'
        })
        .eq('email', 'harvestcrypto200@gmail.com')
      
      if (updateError) {
        console.error('❌ Update error:', updateError)
      } else {
        console.log('✅ Database record updated!')
      }
    }
    
    console.log('\n🎉 Password reset process complete!')
    console.log('📝 Next steps:')
    console.log('1. Check your email for password reset link')
    console.log('2. Set password to: admin123456')
    console.log('3. Try login at: http://localhost:5173/admin-login')
    console.log('4. Or try: https://www.cryptoharvest.info/admin')
    
  } catch (error) {
    console.error('❌ Reset failed:', error)
  }
}

resetAdminPassword() 