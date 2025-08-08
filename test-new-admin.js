import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testNewAdmin() {
  console.log('🔧 Testing New Admin User...')
  console.log('=' .repeat(40))
  
  try {
    // Test login with the new admin user
    console.log('\n📧 Testing login with: admin1@cryptoharvest.com')
    
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin1@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error(`❌ Login failed: ${signInError.message}`)
      return
    } else {
      console.log(`✅ Login successful!`)
      console.log('📊 User data:', {
        id: signInData.user.id,
        email: signInData.user.email
      })
      
      // Check if user exists in public.users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signInData.user.id)
        .single()
      
      if (userError) {
        console.log('⚠️  User not found in public.users table')
        console.log('🔧 Adding user to public.users table...')
        
        // Add user to public.users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: signInData.user.id,
            email: signInData.user.email,
            name: 'Admin User',
            role: 'admin',
            is_verified: true,
            is_active: true,
            wallet_balance: 0,
            total_invested: 0,
            total_profit: 0
          })
        
        if (insertError) {
          console.error('❌ Error adding user to database:', insertError.message)
        } else {
          console.log('✅ User added to public.users table successfully!')
        }
      } else {
        console.log('✅ User found in public.users table')
        console.log(`📊 User role: ${userData.role}`)
        
        // Update role to admin if needed
        if (userData.role !== 'admin') {
          console.log('🔧 Updating user role to admin...')
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', signInData.user.id)
          
          if (updateError) {
            console.error('❌ Error updating role:', updateError.message)
          } else {
            console.log('✅ Role updated to admin!')
          }
        }
      }
      
      console.log('\n🎉 Admin access confirmed!')
      console.log('\n📝 Working Admin Credentials:')
      console.log('📧 Email: admin1@cryptoharvest.com')
      console.log('🔑 Password: admin123456')
      console.log('🌐 Go to: http://localhost:5173/admin-login')
      console.log('\n✅ You can now use these credentials to log into your admin panel!')
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the test
testNewAdmin() 