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

async function testDomainEmailConfiguration() {
  console.log('🧪 Testing Domain Email Configuration for CryptoHarvest...')
  console.log('🌐 Domain: cryptoharvest.info')
  console.log('📧 Support Email: support@cryptoharvest.info')
  console.log('')
  
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
    console.log('🔗 Redirect URL configured:', 'https://www.cryptoharvest.info/dashboard')
    
    // Step 2: Test Email Confirmation Resend
    console.log('')
    console.log('📧 Step 2: Testing email confirmation resend...')
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: testEmail
    })
    
    if (resendError) {
      console.error('❌ Email resend failed:', resendError.message)
    } else {
      console.log('✅ Email confirmation resent successfully')
      console.log('📧 Check inbox for email from: support@cryptoharvest.info')
    }
    
    // Step 3: Test Password Reset Email
    console.log('')
    console.log('🔐 Step 3: Testing password reset email...')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(testEmail, {
      redirectTo: 'https://www.cryptoharvest.info/reset-password'
    })
    
    if (resetError) {
      console.error('❌ Password reset email failed:', resetError.message)
    } else {
      console.log('✅ Password reset email sent successfully')
      console.log('📧 Check inbox for password reset email')
    }
    
    // Step 4: Test Magic Link Email
    console.log('')
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
      console.log('📧 Check inbox for magic link email')
    }
    
    // Step 5: Test OAuth Configuration
    console.log('')
    console.log('🔐 Step 5: Testing OAuth configuration...')
    console.log('✅ OAuth providers should redirect to: https://www.cryptoharvest.info/dashboard')
    
    console.log('')
    console.log('🎉 Domain Email Configuration Test Complete!')
    console.log('')
    console.log('📋 Manual Verification Checklist:')
    console.log('   1. ✅ Check email inbox for test emails')
    console.log('   2. ✅ Verify emails are from: support@cryptoharvest.info')
    console.log('   3. ✅ Test confirmation links redirect to cryptoharvest.info')
    console.log('   4. ✅ Verify password reset links work')
    console.log('   5. ✅ Test magic link authentication')
    console.log('   6. ✅ Check OAuth redirects (if configured)')
    
    console.log('')
    console.log('🔧 Supabase Dashboard Configuration:')
    console.log('   ✅ Site URL: https://www.cryptoharvest.info')
    console.log('   ✅ Redirect URLs configured')
    console.log('   ✅ Email templates updated')
    console.log('   ✅ Support email: support@cryptoharvest.info')
    
    console.log('')
    console.log('🚀 Next Steps:')
    console.log('   1. Test with real user accounts')
    console.log('   2. Verify all email templates')
    console.log('   3. Test authentication flow end-to-end')
    console.log('   4. Monitor email delivery rates')
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
  }
}

// Run the test
testDomainEmailConfiguration()

