import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function cleanAndCreateAdmin() {
  console.log('🔧 Cleaning and Creating Admin User...')
  
  try {
    // Step 1: Clean up old admin user from database
    console.log('\n📊 Step 1: Cleaning up old admin user...')
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('email', 'harvestcrypto200@gmail.com')
    
    if (deleteError) {
      console.error('❌ Error deleting old user:', deleteError)
    } else {
      console.log('✅ Old admin user deleted from database')
    }
    
    // Step 2: Create new admin user in Supabase Auth
    console.log('\n📊 Step 2: Creating new admin user in Supabase Auth...')
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
      
      // If user already exists, try to sign in
      if (signUpError.message.includes('already registered')) {
        console.log('\n📊 User already exists, trying to sign in...')
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: 'admin@cryptoharvest.com',
          password: 'admin123456'
        })
        
        if (signInError) {
          console.error('❌ Sign in error:', signInError.message)
          console.log('\n📝 Manual steps needed:')
          console.log('1. Go to Supabase Dashboard > Authentication > Users')
          console.log('2. Find admin@cryptoharvest.com')
          console.log('3. Click the three dots (⋮) next to the user')
          console.log('4. Select "Send recovery email"')
          console.log('5. Check your email and set password to: admin123456')
        } else {
          console.log('✅ Sign in successful!')
          console.log('📊 User data:', {
            id: signInData.user.id,
            email: signInData.user.email
          })
          
          // Update the user in public.users table
          await updateUserInDatabase(signInData.user.id)
        }
      }
    } else {
      console.log('✅ New admin user created in Auth!')
      console.log('📊 User data:', {
        id: signUpData.user.id,
        email: signUpData.user.email
      })
      
      // Update the user in public.users table
      await updateUserInDatabase(signUpData.user.id)
    }
    
    // Step 3: Test the final setup
    console.log('\n📊 Step 3: Testing final setup...')
    const { data: finalSignIn, error: finalError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (finalError) {
      console.error('❌ Final sign in error:', finalError.message)
      console.log('\n📝 Manual steps needed:')
      console.log('1. Go to Supabase Dashboard > Authentication > Users')
      console.log('2. Find admin@cryptoharvest.com')
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

async function updateUserInDatabase(userId) {
  console.log('\n📊 Updating user in public.users table...')
  
  const { error: updateError } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email: 'admin@cryptoharvest.com',
      name: 'Admin User',
      role: 'admin',
      is_verified: true,
      is_active: true,
      wallet_balance: 0,
      total_invested: 0,
      total_profit: 0
    })
  
  if (updateError) {
    console.error('❌ Update error:', updateError)
  } else {
    console.log('✅ User updated in database successfully!')
  }
}

// Run the cleanup and creation
cleanAndCreateAdmin()
