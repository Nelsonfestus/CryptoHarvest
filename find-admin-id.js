import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function findAdminId() {
  try {
    console.log('🔧 Finding admin user ID...')
    
    // Try to sign in to get the user ID
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'admin@cryptoharvest.com',
      password: 'admin123456'
    })
    
    if (signInError) {
      console.error('❌ Sign in error:', signInError.message)
      console.log('\n📝 You need to:')
      console.log('1. Go to Supabase Dashboard → Authentication → Users')
      console.log('2. Find admin@cryptoharvest.com')
      console.log('3. Copy the User ID')
      console.log('4. Use that ID in the SQL insert statement')
      return
    }
    
    console.log('✅ Found admin user!')
    console.log('🆔 User ID:', signInData.user.id)
    console.log('📧 Email:', signInData.user.email)
    
    console.log('\n📝 Now run this SQL in Supabase SQL Editor:')
    console.log('```sql')
    console.log('INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)')
    console.log('VALUES (')
    console.log(`  '${signInData.user.id}',`)
    console.log("  'Admin User',")
    console.log("  'admin@cryptoharvest.com',")
    console.log("  'admin',")
    console.log('  true,')
    console.log('  true,')
    console.log('  0,')
    console.log('  0,')
    console.log('  0')
    console.log(');')
    console.log('```')
    
    // Check if user already exists in public.users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', signInData.user.id)
      .single()
    
    if (userError && userError.code === 'PGRST116') {
      console.log('\n✅ User does NOT exist in public.users table - you need to insert it')
    } else if (userError) {
      console.log('\n❌ Error checking public.users:', userError)
    } else {
      console.log('\n✅ User already exists in public.users table!')
      console.log('👤 Current role:', userData.role)
      if (userData.role !== 'admin') {
        console.log('⚠️ User role is not admin - you may need to update it')
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

findAdminId() 