<template>
  <!-- Signup Section: Main wrapper for the signup form -->
  <section class="auth-section animate-fade-slide">
    <div class="auth-card">
      <!-- Title -->
      <h2 class="auth-title">Create Your Account</h2>
      <!-- Signup Form -->
      <form @submit.prevent="handleSignup" class="auth-form">
        <!-- Name Field -->
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="name" required placeholder="Enter your name" />
        </div>
        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
        <!-- Password Field -->
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Create a password" />
        </div>
        <!-- Confirm Password Field -->
        <div class="form-group">
          <label for="confirm">Confirm Password</label>
          <input type="password" id="confirm" v-model="confirm" required placeholder="Confirm your password" />
        </div>
        <!-- Error Message -->
        <div v-if="error" class="auth-error">{{ error }}</div>
        <!-- Submit Button -->
        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="!loading">Sign Up</span>
          <span v-else>Signing up...</span>
        </button>
      </form>
      <!-- Link to Login Page -->
      <p class="auth-link">Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: '', // User's name
      email: '', // User's email
      password: '', // User's password
      confirm: '', // Confirm password
      error: '', // Error message for validation
      loading: false, // Loading state for submit button
    }
  },
  methods: {
    // Handle signup form submission and validation
    async handleSignup() {
      this.error = ''
      if (!this.name) {
        this.error = 'Name is required.'
        return
      }
      if (!this.validateEmail(this.email)) {
        this.error = 'Please enter a valid email address.'
        return
      }
      if (!this.password) {
        this.error = 'Password is required.'
        return
      }
      if (this.password.length < 6) {
        this.error = 'Password must be at least 6 characters.'
        return
      }
      if (this.password !== this.confirm) {
        this.error = 'Passwords do not match.'
        return
      }
      this.loading = true
      
      try {
        const response = await fetch('https://web-production-8d9eb.up.railway.app/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        })

        const data = await response.json()
        
        if (response.ok && data.success) {
          // Store token and user data
          localStorage.setItem('cryptoharvest_token', data.token)
          localStorage.setItem('cryptoharvest_user', JSON.stringify(data.user))
          localStorage.setItem('cryptoharvest_isAuthenticated', 'true')
          
          // Redirect to dashboard
          this.$router.push('/dashboard')
        } else {
          this.error = data.message || 'Registration failed. Please try again.'
        }
      } catch (error) {
        console.error('Signup error:', error)
        this.error = 'Network error. Please check your connection and try again.'
      } finally {
        this.loading = false
      }
    },
    // Validate email format
    validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },
  },
}
</script>

<style scoped>
/* Signup Section Styles */
.auth-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #eb6709 0%, #f63d43 100%);
}

.auth-card {
  margin-top: 10%;
  margin-bottom: 10%;
  background: #202020;
  padding: 48px 32px 32px 32px;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  width: 100%;
  max-width: 400px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 6px;
  font-size: 1rem;
  color: #ffa600;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: none;
  background: #181818;
  color: #fff;
  font-size: 1rem;
  outline: none;
  margin-bottom: 2px;
}

input:focus {
  border: 1.5px solid #eb6709;
}

.auth-btn {
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  transition:
    background 0.3s,
    color 0.3s;
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-btn:hover:not(:disabled) {
  background: #fff;
  color: #eb6709;
}

.auth-link {
  margin-top: 18px;
  color: #e9e9e9;
  font-size: 1rem;
  text-align: center;
}

.auth-link a {
  color: #eb6709;
  font-weight: 600;
  text-decoration: underline;
}

.auth-error {
  color: #f63d43;
  font-size: 0.98rem;
  margin-bottom: 2px;
  text-align: left;
}

@media (max-width: 600px) {
  .auth-section {
    padding: 30px 20px;
  }

  .auth-card {
    padding: 24px 8px 18px 8px;
    border-radius: 10px;
  }

  .auth-title {
    font-size: 1.2rem;
  }
}
</style>
