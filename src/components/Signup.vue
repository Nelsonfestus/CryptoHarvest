<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>Create Your Account</h2>
      <form @submit.prevent="handleSignup" class="signup-form">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Enter your full name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-input-container">
          <input
              :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            minlength="6"
          />
            <button 
              type="button" 
              class="password-toggle"
              @click="showPassword = !showPassword"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>
        <button type="submit" :disabled="loading" class="signup-btn">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div v-if="success" class="success-message">
        Account created successfully! Redirecting to dashboard...
      </div>
      <div class="login-link">
        Already have an account? <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, supabase } from '../lib/supabase'

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      error: '',
      success: '',
      showPassword: false
    }
  },
  methods: {
    async sendAdminNotification(userId) {
      try {
        const response = await fetch('https://ivjbrnhgrlgmqvtygkkl.supabase.co/functions/v1/send-admin-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            to_email: 'support@cryptoharvest.info',
            subject: 'New User Signup - CryptoHarvest',
            user_name: this.name,
            user_email: this.email,
            signup_date: new Date().toLocaleString(),
            user_id: userId
          })
        })

        if (!response.ok) {
          throw new Error('Failed to send admin notification')
        }

        console.log('Admin notification sent successfully')
      } catch (error) {
        console.error('Error sending admin notification:', error)
        throw error
      }
    },

    async handleSignup() {
      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const { data, error } = await auth.signUp(this.email, this.password, {
          name: this.name
        })
        
        if (error) {
          this.error = error.message || 'Signup failed'
          return
        }

        if (data.user) {
          // Create user profile with initial balance
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              id: data.user.id,
              email: this.email,
              name: this.name,
              role: 'user',
              wallet_balance: 1000, // Initial balance of $1000
              is_verified: false,
              created_at: new Date().toISOString()
            })

          if (profileError) {
            console.error('Profile creation error:', profileError)
            this.error = 'Account created but profile setup failed. Please contact support.'
            return
          }

          // Send admin notification
          try {
            await this.sendAdminNotification(data.user.id)
          } catch (notificationError) {
            console.error('Admin notification error:', notificationError)
            // Don't block signup if notification fails
          }

          // Store email for confirmation page
          localStorage.setItem('pendingEmail', this.email)
          
          // Redirect to email confirmation page
          this.$router.push(`/email-confirmation?email=${encodeURIComponent(this.email)}`)
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Signup error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.signup-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.signup-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.signup-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.signup-form {
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

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
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

.signup-btn {
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

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.signup-btn:disabled {
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

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
