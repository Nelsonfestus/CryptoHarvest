<template>
  <div class="admin-login-container">
    <div class="admin-login-box">
      <h2>Admin Login</h2>
      <form @submit.prevent="handleAdminLogin" class="admin-login-form">
        <div class="form-group">
          <label for="email">Admin Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter admin email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter password"
          />
        </div>
        <button type="submit" :disabled="loading" class="admin-login-btn">
          {{ loading ? 'Logging in...' : 'Login as Admin' }}
        </button>
      </form>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <div class="back-link">
        <router-link to="/login">← Back to User Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, supabase } from '../lib/supabase'

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleAdminLogin() {
      this.loading = true
      this.error = ''

      try {
        const { data, error } = await auth.signIn(this.email, this.password)
        
        if (error) {
          this.error = error.message || 'Login failed'
        return
      }
      
        if (data.user) {
          // Check if user is admin
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('role')
            .eq('id', data.user.id)
            .single()

          if (userError || userData?.role !== 'admin') {
            this.error = 'Access denied. Admin privileges required.'
            // Sign out the user since they're not admin
            await auth.signOut()
            return
          }

          // Store user info in localStorage
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('session', JSON.stringify(data.session))
          localStorage.setItem('isAdmin', 'true')
          
          // Redirect to admin dashboard
          this.$router.push('/admin')
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'
        console.error('Admin login error:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.admin-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.admin-login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.admin-login-box h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.admin-login-form {
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

.admin-login-btn {
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

.admin-login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.admin-login-btn:disabled {
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

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.back-link a:hover {
  text-decoration: underline;
}
</style> 