import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: 'https://www.cryptoharvest.info/dashboard'
  }
})

async function testEmailConfiguration() {
  console.log('🧪 Testing Domain Email Configuration for CryptoHarvest')
  console.log('🌐 Domain: cryptoharvest.info')
  console.log('📧 Support Email: support@cryptoharvest.info')
  console.log('')
  
  const testEmail = `test${Date.now()}@cryptoharvest.info`
  const testPassword = 'testpassword123'
  const testName = 'Test User'
  
  try {
    // Test 1: Signup with domain email
    console.log('📝 Test 1: Signup with domain email...')
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: { name: testName },
        emailRedirectTo: 'https://www.cryptoharvest.info/dashboard'
      }
    })
    
    if (signupError) {
      console.error('❌ Signup failed:', signupError.message)
      return
    }
    
    console.log('✅ Signup successful:', signupData.user?.id)
    console.log('📧 Confirmation email sent to:', testEmail)
    
    // Test 2: Resend confirmation email
    console.log('')
    console.log('📧 Test 2: Resend confirmation email...')
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: testEmail
    })
    
    if (resendError) {
      console.error('❌ Email resend failed:', resendError.message)
    } else {
      console.log('✅ Email confirmation resent successfully')
    }
    
    // Test 3: Password reset email
    console.log('')
    console.log('🔐 Test 3: Password reset email...')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(testEmail, {
      redirectTo: 'https://www.cryptoharvest.info/reset-password'
    })
    
    if (resetError) {
      console.error('❌ Password reset failed:', resetError.message)
    } else {
      console.log('✅ Password reset email sent successfully')
    }
    
    // Test 4: Magic link email
    console.log('')
    console.log('🔗 Test 4: Magic link email...')
    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email: testEmail,
      options: {
        emailRedirectTo: 'https://www.cryptoharvest.info/dashboard'
      }
    })
    
    if (magicLinkError) {
      console.error('❌ Magic link failed:', magicLinkError.message)
    } else {
      console.log('✅ Magic link email sent successfully')
    }
    
    console.log('')
    console.log('🎉 All email tests completed!')
    console.log('')
    console.log('📋 Manual Verification:')
    console.log('1. Check email inbox for test emails')
    console.log('2. Verify emails from: support@cryptoharvest.info')
    console.log('3. Test confirmation links redirect to cryptoharvest.info')
    console.log('4. Verify all redirect URLs work correctly')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testEmailConfiguration()
