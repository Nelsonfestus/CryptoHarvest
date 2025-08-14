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
  console.log('🧪 Testing Email Configuration for CryptoHarvest...')
  
  const testEmail = `test${Date.now()}@cryptoharvest.info`
  const testPassword = 'testpassword123'
  const testName = 'Test User'
  
  try {
    // Step 1: Test Signup with Domain Email
    console.log('📝 Step 1: Testing signup with domain email...')
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
    console.log('📧 Confirmation email should be sent to:', testEmail)
    
    // Step 2: Test Email Confirmation Resend
    console.log('📧 Step 2: Testing email confirmation resend...')
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: testEmail
    })
    
    if (resendError) {
      console.error('❌ Email resend failed:', resendError.message)
    } else {
      console.log('✅ Email confirmation resent successfully')
    }
    
    // Step 3: Test Password Reset Email
    console.log('🔐 Step 3: Testing password reset email...')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(testEmail, {
      redirectTo: 'https://www.cryptoharvest.info/reset-password'
    })
    
    if (resetError) {
      console.error('❌ Password reset email failed:', resetError.message)
    } else {
      console.log('✅ Password reset email sent successfully')
    }
    
    // Step 4: Test Magic Link Email
    console.log('🔗 Step 4: Testing magic link email...')
    const { error: magicLinkError } = await supabase.auth.signInWithOtp({
      email: testEmail,
      options: {
        emailRedirectTo: 'https://www.cryptoharvest.info/dashboard'
      }
    })
    
    if (magicLinkError) {
      console.error('❌ Magic link email failed:', magicLinkError.message)
    } else {
      console.log('✅ Magic link email sent successfully')
    }
    
    console.log('\n🎉 Email Configuration Test Complete!')
    console.log('\n📋 Check the following:')
    console.log('   1. Check your email inbox for test emails')
    console.log('   2. Verify emails are from: support@cryptoharvest.info')
    console.log('   3. Test confirmation links work correctly')
    console.log('   4. Verify redirect URLs point to cryptoharvest.info')
    
    console.log('\n🔧 Next Steps:')
    console.log('   1. Update Supabase Dashboard settings')
    console.log('   2. Configure email templates')
    console.log('   3. Test with real domain emails')
    console.log('   4. Verify authentication flow')
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
  }
}

// Run the test
testEmailConfiguration()

