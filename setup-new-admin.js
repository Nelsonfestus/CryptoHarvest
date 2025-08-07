import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function setupNewAdmin() {
  try {
    console.log('🔧 Setting up new admin user...')
    
    // Step 1: Try to sign in to get the user ID
    console.log('\n📊 Step 1: Getting user ID...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'harvestcrypto200@gmail.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error('❌ Sign in error:', signInError.message)
      console.log('\n📝 You need to:')
      console.log('1. Go to Supabase Dashboard → Authentication → Users')
      console.log('2. Click "Add User"')
      console.log('3. Email: harvestcrypto200@gmail.com')
      console.log('4. Password: admin123456')
      console.log('5. User Metadata: {"name": "Admin User"}')
      console.log('6. Then run this script again')
      return
    }
    
    console.log('✅ Found new admin user!')
    console.log('🆔 User ID:', signInData.user.id)
    console.log('📧 Email:', signInData.user.email)
    
    // Step 2: Create admin record in database
    console.log('\n📊 Step 2: Creating admin record in database...')
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: signInData.user.id,
          name: 'Admin User',
          email: 'harvestcrypto200@gmail.com',
          role: 'admin',
          is_verified: true,
          is_active: true,
          wallet_balance: 0,
          total_invested: 0,
          total_profit: 0
        }
      ])
    
    if (insertError) {
      console.error('❌ Insert error:', insertError.message)
      console.log('\n📝 Try running this SQL manually in Supabase SQL Editor:')
      console.log('```sql')
      console.log('INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)')
      console.log('VALUES (')
      console.log(`  '${signInData.user.id}',`)
      console.log("  'Admin User',")
      console.log("  'harvestcrypto200@gmail.com',")
      console.log("  'admin',")
      console.log('  true,')
      console.log('  true,')
      console.log('  0,')
      console.log('  0,')
      console.log('  0')
      console.log(');')
      console.log('```')
      return
    }
    
    console.log('✅ Admin record created successfully!')
    
    // Step 3: Verify the setup
    console.log('\n📊 Step 3: Verifying admin setup...')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', signInData.user.id)
      .single()
    
    if (userError) {
      console.error('❌ Verification error:', userError.message)
    } else {
      console.log('✅ Admin user verified!')
      console.log('👤 User details:', {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        is_verified: userData.is_verified,
        is_active: userData.is_active
      })
    }
    
    console.log('\n🎉 New admin setup complete!')
    console.log('📝 Login credentials:')
    console.log('- Email: harvestcrypto200@gmail.com')
    console.log('- Password: admin123456')
    console.log('\n📝 Test URLs:')
    console.log('1. Local: http://localhost:5173/admin-login')
    console.log('2. Production: https://www.cryptoharvest.info/admin')
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupNewAdmin() 