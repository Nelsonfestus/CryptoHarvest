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
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            minlength="6"
          />
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
import { auth } from '../lib/supabase'

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
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
          // Automatically log in the user after successful signup
          const { data: loginData, error: loginError } = await auth.signIn(this.email, this.password)
          
          if (loginError) {
            this.error = 'Account created but login failed. Please try logging in manually.'
            return
          }

          if (loginData.user) {
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(loginData.user))
            localStorage.setItem('session', JSON.stringify(loginData.session))
            localStorage.setItem('isAdmin', 'false')
            
            // Redirect to dashboard
            this.$router.push('/dashboard')
          }
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
