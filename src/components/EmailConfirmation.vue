<template>
  <div class="email-confirmation-container">
    <div class="email-confirmation-box">
      <div class="confirmation-icon">📧</div>
      <h2>Verify Your Email</h2>
      <p class="confirmation-message">
        We've sent a verification link to <strong>{{ email }}</strong>
      </p>
      <p class="instructions">
        Please check your email and click the verification link to activate your account.
      </p>
      
      <div class="action-buttons">
        <button @click="resendEmail" :disabled="resendLoading" class="resend-btn">
          {{ resendLoading ? 'Sending...' : 'Resend Email' }}
        </button>
        <button @click="goToLogin" class="login-btn">
          Back to Login
        </button>
      </div>
      
      <div v-if="resendSuccess" class="success-message">
        ✅ Verification email sent successfully!
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div class="help-section">
        <h4>Need Help?</h4>
        <ul>
          <li>Check your spam/junk folder</li>
          <li>Make sure you entered the correct email address</li>
          <li>Wait a few minutes for the email to arrive</li>
          <li>Contact support if you continue having issues</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../lib/supabase'

export default {
  name: 'EmailConfirmation',
  data() {
    return {
      resendLoading: false,
      resendSuccess: false,
      error: ''
    }
  },
  computed: {
    email() {
      return this.$route.query.email || ''
    }
  },
  methods: {
    async resendEmail() {
      this.resendLoading = true
      this.error = ''
      this.resendSuccess = false

      try {
        const { error } = await auth.resendConfirmation(this.email)
        
        if (error) {
          this.error = error.message || 'Failed to resend email'
        } else {
          this.resendSuccess = true
          setTimeout(() => {
            this.resendSuccess = false
          }, 5000)
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Resend error:', err)
      } finally {
        this.resendLoading = false
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

.confirmation-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.email-confirmation-box h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
}

.confirmation-message {
  font-size: 16px;
  color: #555;
  margin-bottom: 15px;
}

.instructions {
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
}

.resend-btn, .login-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.resend-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.resend-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.resend-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn {
  background: #f8f9fa;
  color: #333;
  border: 2px solid #e1e5e9;
}

.login-btn:hover {
  background: #e9ecef;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.help-section {
  text-align: left;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.help-section h4 {
  color: #333;
  margin-bottom: 15px;
  font-size: 16px;
}

.help-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-section li {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.help-section li:before {
  content: "•";
  color: #667eea;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 600px) {
  .email-confirmation-box {
    padding: 30px 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .resend-btn, .login-btn {
    width: 100%;
  }
}
</style> 