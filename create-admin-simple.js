import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createSimpleAdmin() {
  try {
    console.log('🔧 Creating simple admin user...')
    
    // Generate a random UUID for the admin user
    const adminId = '00000000-0000-0000-0000-000000000001'
    
    // Insert admin user directly into public.users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: adminId,
          name: 'Admin User',
          email: 'admin@cryptoharvest.com',
          role: 'admin',
          is_verified: true,
          is_active: true,
          wallet_balance: 0,
          total_invested: 0,
          total_profit: 0
        }
      ])

    if (userError) {
      console.error('❌ User table error:', userError)
      return
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@cryptoharvest.com')
    console.log('🔑 Password: admin123456')
    console.log('🆔 User ID:', adminId)
    console.log('👑 Role: admin')
    
    console.log('\n📝 To login:')
    console.log('1. Go to: http://localhost:5173/admin-login')
    console.log('2. Use email: admin@cryptoharvest.com')
    console.log('3. Use password: admin123456')
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

createSimpleAdmin() 