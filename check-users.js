import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkUsers() {
  try {
    console.log('🔧 Checking existing users...')
    
    // Check users in public.users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
    
    if (usersError) {
      console.error('❌ Users table error:', usersError)
      return
    }
    
    console.log('📊 Users in database:')
    if (users && users.length > 0) {
      users.forEach(user => {
        console.log(`- ${user.email} (${user.role}) - ID: ${user.id}`)
      })
    } else {
      console.log('No users found in database')
    }
    
    // Check if tables exist
    console.log('\n🔧 Checking table structure...')
    const { data: tables, error: tablesError } = await supabase
      .from('users')
      .select('*')
      .limit(1)
    
    if (tablesError) {
      console.error('❌ Table access error:', tablesError)
    } else {
      console.log('✅ Users table is accessible')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

checkUsers() 