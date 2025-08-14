<template>
  <div class="password-reset-container">
    <div class="password-reset-box">
      <h2>Reset Your Password</h2>
      
      <!-- Step 1: Request Reset -->
      <div v-if="step === 1" class="reset-step">
        <p class="description">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form @submit.prevent="requestReset" class="reset-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email address"
            />
          </div>
          <button type="submit" :disabled="loading" class="reset-btn">
            {{ loading ? 'Sending...' : 'Send Reset Link' }}
          </button>
        </form>
      </div>

      <!-- Step 2: Set New Password -->
      <div v-if="step === 2" class="reset-step">
        <p class="description">
          Enter your new password below.
        </p>
        <form @submit.prevent="updatePassword" class="reset-form">
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <div class="password-input-container">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="newPassword"
                required
                placeholder="Enter new password"
                minlength="6"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showNewPassword = !showNewPassword"
              >
                <span v-if="showNewPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <div class="password-input-container">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                required
                placeholder="Confirm new password"
                minlength="6"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <span v-if="showConfirmPassword">👁️</span>
                <span v-else>👁️‍🗨️</span>
              </button>
            </div>
          </div>
          <div v-if="passwordError" class="password-error">
            {{ passwordError }}
          </div>
          <button type="submit" :disabled="loading || !isPasswordValid" class="reset-btn">
            {{ loading ? 'Updating...' : 'Update Password' }}
          </button>
        </form>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="success" class="success-message">
        {{ success }}
      </div>
      
      <div class="back-to-login">
        <router-link to="/login">← Back to Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../lib/supabase'

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
      newPassword: '',
      confirmPassword: '',
      step: 1,
      loading: false,
      error: '',
      success: '',
      showNewPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    isPasswordValid() {
      return this.newPassword.length >= 6 && this.newPassword === this.confirmPassword
    },
    passwordError() {
      if (this.newPassword && this.newPassword.length < 6) {
        return 'Password must be at least 6 characters long'
      }
      if (this.confirmPassword && this.newPassword !== this.confirmPassword) {
        return 'Passwords do not match'
      }
      return ''
    }
  },
  methods: {
    async requestReset() {
      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const { error } = await auth.resetPassword(this.email)
        
        if (error) {
          this.error = error.message || 'Failed to send reset email'
          return
        }

        this.success = 'Password reset link sent! Check your email and click the link to continue.'
        this.step = 2
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Password reset error:', err)
      } finally {
        this.loading = false
      }
    },

    async updatePassword() {
      if (!this.isPasswordValid) {
        this.error = 'Please fix the password errors above'
        return
      }

      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const { error } = await auth.updatePassword(this.newPassword)
        
        if (error) {
          this.error = error.message || 'Failed to update password'
          return
        }

        this.success = 'Password updated successfully! Redirecting to login...'
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Password update error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.password-reset-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.password-reset-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.password-reset-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.5;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-container input {
  flex: 1;
  padding: 12px 16px;
  padding-right: 50px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.password-input-container input:focus {
  outline: none;
  border-color: #667eea;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #667eea;
}

.password-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
}

.reset-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reset-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.reset-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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

.back-to-login {
  text-align: center;
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
</style>
