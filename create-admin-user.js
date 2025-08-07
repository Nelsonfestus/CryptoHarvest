import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user...')
    
    // Create user in Supabase Auth
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
      console.error('❌ Auth error:', authError)
      return
    }

    if (authData.user) {
      console.log('✅ User created in auth:', authData.user.id)
      
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

createAdminUser() 