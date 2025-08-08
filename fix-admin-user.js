import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fixAdminUser() {
  console.log('🔧 Fixing Admin User...')
  
  try {
    // Step 1: Check current admin user
    console.log('\n📊 Step 1: Checking current admin user...')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'admin')
    
    if (usersError) {
      console.error('❌ Error fetching admin users:', usersError)
      return
    }
    
    console.log('📊 Admin users found:')
    users.forEach(user => {
      console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
    })
    
    if (users.length === 0) {
      console.log('❌ No admin users found!')
      return
    }
    
    const adminUser = users[0]
    console.log(`📊 Working with admin user: ${adminUser.email}`)
    
    // Step 2: Try to sign up a new admin user with the correct email
    console.log('\n📊 Step 2: Creating new admin user...')
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456',
      options: {
        data: {
          name: 'Admin User',
          role: 'admin'
        }
      }
    })
    
    if (signUpError) {
      console.error('❌ Sign up error:', signUpError.message)
      
      // Step 3: Try to sign in with existing admin
      console.log('\n📊 Step 3: Trying to sign in with existing admin...')
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminUser.email,
        password: 'admin123456'
      })
      
      if (signInError) {
        console.error('❌ Sign in error:', signInError.message)
        console.log('\n📝 Next steps:')
        console.log('1. Go to Supabase Dashboard > Authentication > Users')
        console.log('2. Find the user with email:', adminUser.email)
        console.log('3. Click the three dots (⋮) next to the user')
        console.log('4. Select "Send recovery email"')
        console.log('5. Check your email and set password to: admin123456')
        console.log('6. Try logging in at: https://www.cryptoharvest.info/admin-login')
      } else {
        console.log('✅ Sign in successful!')
        console.log('📊 User data:', {
          id: signInData.user.id,
          email: signInData.user.email
        })
        
        // Step 4: Update the user in public.users table
        console.log('\n📊 Step 4: Updating public.users table...')
        const { error: updateError } = await supabase
          .from('users')
          .update({
            email: 'admin@cryptoharvest.com',
            role: 'admin',
            is_verified: true,
            is_active: true
          })
          .eq('id', signInData.user.id)
        
        if (updateError) {
          console.error('❌ Update error:', updateError)
        } else {
          console.log('✅ User updated successfully!')
        }
      }
    } else {
      console.log('✅ New admin user created!')
      console.log('📊 User data:', {
        id: signUpData.user.id,
        email: signUpData.user.email
      })
      
      // Step 4: Update the user in public.users table
      console.log('\n📊 Step 4: Updating public.users table...')
      const { error: updateError } = await supabase
        .from('users')
        .update({
          email: 'admin@cryptoharvest.com',
          role: 'admin',
          is_verified: true,
          is_active: true
        })
        .eq('id', signUpData.user.id)
      
      if (updateError) {
        console.error('❌ Update error:', updateError)
      } else {
        console.log('✅ User updated successfully!')
      }
    }
    
    // Step 5: Test the final setup
    console.log('\n📊 Step 5: Testing final setup...')
    const { data: finalSignIn, error: finalError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (finalError) {
      console.error('❌ Final sign in error:', finalError.message)
      console.log('\n📝 Manual steps needed:')
      console.log('1. Go to Supabase Dashboard > Authentication > Users')
      console.log('2. Find the admin user')
      console.log('3. Reset password manually')
      console.log('4. Set password to: admin123456')
    } else {
      console.log('✅ Final sign in successful!')
      console.log('🎉 Admin access is now working!')
      console.log('📝 You can now login at: https://www.cryptoharvest.info/admin-login')
      console.log('📝 Use email: admin@cryptoharvest.com')
      console.log('📝 Use password: admin123456')
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the fix
fixAdminUser()
