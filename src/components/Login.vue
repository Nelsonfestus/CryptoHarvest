<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login to Your Account</h2>
      <form @submit.prevent="handleLogin" class="login-form">
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
          />
        </div>
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div class="signup-link">
        Don't have an account? <router-link to="/signup">Sign up here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, supabase } from '../lib/supabase'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''

      try {
        const { data, error } = await auth.signIn(this.email, this.password)
        
        if (error) {
          this.error = error.message || 'Login failed'
          return
        }

        if (data.user) {
          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('session', JSON.stringify(data.session))
          
          // Check if user is admin
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single()

          if (!userError && userData?.role === 'admin') {
            localStorage.setItem('isAdmin', 'true')
            this.$router.push('/admin')
          } else {
            localStorage.setItem('isAdmin', 'false')
            this.$router.push('/dashboard')
          }
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Login error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.login-form {
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

.login-btn {
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

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn:disabled {
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

.signup-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style> 