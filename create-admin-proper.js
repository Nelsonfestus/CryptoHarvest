import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminProper() {
  try {
    console.log('🔧 Creating admin user properly...')
    
    // Step 1: Create user in auth.users first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456',
      options: {
        data: {
          name: 'Admin User'
        }
      }
    })

    if (authError) {
      console.error('❌ Auth error:', authError.message)
      
      // If user already exists, try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@cryptoharvest.com',
        password: 'admin123456'
      })
      
      if (signInError) {
        console.error('❌ Sign in error:', signInError.message)
        console.log('\n📝 Manual steps needed:')
        console.log('1. Go to Supabase Dashboard → Authentication → Users')
        console.log('2. Click "Add User"')
        console.log('3. Email: admin@cryptoharvest.com')
        console.log('4. Password: admin123456')
        console.log('5. Then run this script again')
        return
      }
      
      console.log('✅ User exists in auth, ID:', signInData.user.id)
      
      // Check if user exists in public.users
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signInData.user.id)
        .single()
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Check error:', checkError)
        return
      }
      
      if (existingUser) {
        console.log('✅ Admin user already exists!')
        console.log('📧 Email: admin@cryptoharvest.com')
        console.log('🔑 Password: admin123456')
        console.log('🆔 User ID:', signInData.user.id)
        console.log('👑 Role:', existingUser.role)
        
        console.log('\n📝 To login:')
        console.log('1. Go to: http://localhost:5173/admin-login')
        console.log('2. Use email: admin@cryptoharvest.com')
        console.log('3. Use password: admin123456')
        return
      }
      
      // Update the user role to admin
      const { data: updateData, error: updateError } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', signInData.user.id)
      
      if (updateError) {
        console.error('❌ Update error:', updateError)
        return
      }
      
      console.log('✅ Admin role assigned successfully!')
      console.log('📧 Email: admin@cryptoharvest.com')
      console.log('🔑 Password: admin123456')
      console.log('🆔 User ID:', signInData.user.id)
      
    } else {
      console.log('✅ New user created in auth:', authData.user.id)
      console.log('📧 Email: admin@cryptoharvest.com')
      console.log('🔑 Password: admin123456')
      console.log('🆔 User ID:', authData.user.id)
      
      // The trigger should automatically create the user in public.users
      console.log('✅ User should be automatically created in public.users table')
    }
    
    console.log('\n📝 To login:')
    console.log('1. Go to: http://localhost:5173/admin-login')
    console.log('2. Use email: admin@cryptoharvest.com')
    console.log('3. Use password: admin123456')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

createAdminProper() 