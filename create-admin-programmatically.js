import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdminProgrammatically() {
  try {
    console.log('🔧 Creating new admin user programmatically...')
    
    // Step 1: Create user in Supabase Auth
    console.log('\n📊 Step 1: Creating user in Authentication...')
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'harvestcrypto200@gmail.com',
      password: 'admin123456',
      options: {
        data: {
          name: 'Admin User'
        }
      }
    })
    
    if (authError) {
      console.error('❌ Auth creation error:', authError.message)
      
      // If user already exists, try to sign in
      console.log('\n📊 Trying to sign in with existing user...')
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'harvestcrypto200@gmail.com',
        password: 'admin123456'
      })
      
      if (signInError) {
        console.error('❌ Sign in error:', signInError.message)
        console.log('\n📝 The user might not exist or password is wrong')
        console.log('📝 Try creating the user manually in Supabase Dashboard')
        return
      }
      
      console.log('✅ User exists, got ID:', signInData.user.id)
      
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
        console.log('✅ User already exists in database!')
        console.log('👤 User details:', {
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role
        })
        
        if (existingUser.role === 'admin') {
          console.log('🎉 Admin user is ready!')
        } else {
          console.log('⚠️ User role is not admin, updating...')
          const { error: updateError } = await supabase
            .from('users')
            .update({ role: 'admin' })
            .eq('id', signInData.user.id)
          
          if (updateError) {
            console.error('❌ Update error:', updateError)
          } else {
            console.log('✅ Role updated to admin!')
          }
        }
      } else {
        console.log('📝 User not found in database, creating record...')
        await createUserRecord(signInData.user.id)
      }
      
    } else {
      console.log('✅ New user created in auth:', authData.user.id)
      await createUserRecord(authData.user.id)
    }
    
    console.log('\n🎉 Admin setup complete!')
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

async function createUserRecord(userId) {
  console.log('\n📊 Creating user record in database...')
  const { data: insertData, error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
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
    console.log('\n📝 Try running this SQL manually:')
    console.log('```sql')
    console.log('INSERT INTO public.users (id, name, email, role, is_verified, is_active, wallet_balance, total_invested, total_profit)')
    console.log('VALUES (')
    console.log(`  '${userId}',`)
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
  } else {
    console.log('✅ User record created successfully!')
  }
}

createAdminProgrammatically() 