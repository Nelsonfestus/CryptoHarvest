<template>
  <div class="email-confirmation-container">
    <div class="email-confirmation-box">
      <div v-if="!isConfirmed" class="confirmation-pending">
        <div class="icon">📧</div>
        <h2>Confirm Your Email</h2>
        <p class="description">
          We've sent a confirmation email to <strong>{{ email }}</strong>
        </p>
        <p class="instructions">
          Please check your email and click the confirmation link to activate your account.
        </p>
        
        <div class="email-actions">
          <button @click="resendConfirmation" :disabled="resendLoading" class="resend-btn">
            {{ resendLoading ? 'Sending...' : 'Resend Confirmation Email' }}
          </button>
          <button @click="checkConfirmation" :disabled="checking" class="check-btn">
            {{ checking ? 'Checking...' : "I've Confirmed My Email" }}
          </button>
        </div>

        <div class="help-section">
          <h4>Didn't receive the email?</h4>
          <ul>
            <li>Check your spam or junk folder</li>
            <li>Make sure you entered the correct email address</li>
            <li>Wait a few minutes for the email to arrive</li>
            <li>Try clicking "Resend Confirmation Email" above</li>
          </ul>
        </div>

        <div class="back-to-login">
          <router-link to="/login">← Back to Login</router-link>
        </div>
      </div>

      <div v-else class="confirmation-success">
        <div class="icon">✅</div>
        <h2>Email Confirmed!</h2>
        <p class="success-message">
          Your email has been successfully confirmed. You can now log in to your account.
        </p>
        <button @click="goToLogin" class="login-btn">
          Go to Login
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="success" class="success-message">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script>
import { auth, supabase } from '../lib/supabase'

export default {
  name: 'EmailConfirmation',
  data() {
    return {
      email: '',
      isConfirmed: false,
      checking: false,
      resendLoading: false,
      error: '',
      success: ''
    }
  },
  async mounted() {
    // Get email from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    this.email = urlParams.get('email') || localStorage.getItem('pendingEmail') || ''
    
    // Check if user is already confirmed
    await this.checkUserConfirmation()
  },
  methods: {
    async checkUserConfirmation() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (user && user.email_confirmed_at) {
          this.isConfirmed = true
          this.success = 'Your email has been confirmed successfully!'
        }
      } catch (err) {
        console.error('Error checking user confirmation:', err)
      }
    },

    async resendConfirmation() {
      if (!this.email) {
        this.error = 'No email address found. Please sign up again.'
        return
      }

      this.resendLoading = true
      this.error = ''
      this.success = ''

      try {
        const { error } = await auth.resendConfirmation(this.email)
        
        if (error) {
          this.error = error.message || 'Failed to resend confirmation email'
          return
        }

        this.success = 'Confirmation email sent! Please check your inbox.'
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Resend confirmation error:', err)
      } finally {
        this.resendLoading = false
      }
    },

    async checkConfirmation() {
      this.checking = true
      this.error = ''
      this.success = ''

      try {
        // Try to sign in to check if email is confirmed
        const { data, error } = await auth.signIn(this.email, '')
        
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            this.error = 'Email not yet confirmed. Please check your email and click the confirmation link.'
          } else {
            this.error = 'Please check your email and confirm your account before trying to log in.'
          }
          return
        }

        if (data.user && data.user.email_confirmed_at) {
          this.isConfirmed = true
          this.success = 'Email confirmed successfully! You can now log in.'
        }
      } catch (err) {
        this.error = 'An unexpected error occurred while checking confirmation'
        console.error('Check confirmation error:', err)
      } finally {
        this.checking = false
      }
    },

    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.email-confirmation-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.email-confirmation-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.email-confirmation-box h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
}

.description {
  color: #666;
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
}

.instructions {
  color: #888;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.5;
}

.email-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.resend-btn, .check-btn, .login-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.resend-btn {
  background: #f8f9fa;
  color: #667eea;
  border: 2px solid #667eea;
}

.resend-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
}

.check-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.check-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  margin-top: 20px;
}

.login-btn:hover {
  transform: translateY(-2px);
}

.resend-btn:disabled, .check-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.help-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.help-section h4 {
  color: #333;
  margin-bottom: 10px;
  font-size: 16px;
}

.help-section ul {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
  padding-left: 20px;
}

.help-section li {
  margin-bottom: 5px;
}

.back-to-login {
  margin-top: 20px;
}

.back-to-login a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.back-to-login a:hover {
  text-decoration: underline;
}

.confirmation-success {
  text-align: center;
}

.success-message {
  color: #28a745;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 12px;
  border-radius: 6px;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.success-message {
  background: #efe;
  color: #363;
  padding: 12px;
  border-radius: 6px;
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 768px) {
  .email-confirmation-box {
    padding: 30px 20px;
  }
  
  .email-actions {
    gap: 10px;
  }
  
  .resend-btn, .check-btn, .login-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
