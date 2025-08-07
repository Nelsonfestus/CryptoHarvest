import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminDirect() {
  try {
    console.log('🔧 Creating admin user directly...')
    
    // First, let's create the user in auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })

    if (authError) {
      console.error('❌ Auth error:', authError.message)
      
      // If user already exists, try to sign in to get the user ID
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'admin@cryptoharvest.com',
        password: 'admin123456'
      })
      
      if (signInError) {
        console.error('❌ Sign in error:', signInError.message)
        return
      }
      
      console.log('✅ User exists, got ID:', signInData.user.id)
      
      // Check if user exists in public.users table
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('email', 'admin@cryptoharvest.com')
        .single()
      
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Check error:', checkError)
        return
      }
      
      if (existingUser) {
        console.log('✅ Admin user already exists in database')
        console.log('📧 Email: admin@cryptoharvest.com')
        console.log('🔑 Password: admin123456')
        console.log('🆔 User ID:', signInData.user.id)
        console.log('👑 Role:', existingUser.role)
        return
      }
      
      // Insert admin user into public.users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: signInData.user.id,
            name: 'Admin User',
            email: 'admin@cryptoharvest.com',
            role: 'admin',
            is_verified: true,
            is_active: true
          }
        ])

      if (userError) {
        console.error('❌ User table error:', userError)
        return
      }

      console.log('✅ Admin user created successfully!')
      console.log('📧 Email: admin@cryptoharvest.com')
      console.log('🔑 Password: admin123456')
      console.log('🆔 User ID:', signInData.user.id)
    } else {
      console.log('✅ New user created in auth:', authData.user.id)
      
      // Insert admin user into public.users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            name: 'Admin User',
            email: 'admin@cryptoharvest.com',
            role: 'admin',
            is_verified: true,
            is_active: true
          }
        ])

      if (userError) {
        console.error('❌ User table error:', userError)
        return
      }

      console.log('✅ Admin user created successfully!')
      console.log('📧 Email: admin@cryptoharvest.com')
      console.log('🔑 Password: admin123456')
      console.log('🆔 User ID:', authData.user.id)
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

createAdminDirect() 