<template>
  <section class="auth-section animate-fade-slide">
    <div class="auth-card">
      <h2 class="auth-title">Login to Your Account</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
        </div>
        <div v-if="error" class="auth-error">{{ error }}</div>
        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else>Logging in...</span>
        </button>
      </form>
      <p class="auth-link">Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      this.error = ''
      if (!this.validateEmail(this.email)) {
        this.error = 'Please enter a valid email address.'
        return
      }
      if (!this.password) {
        this.error = 'Password is required.'
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // Simulate login success
        // this.$router.push('/')
        this.error = 'Invalid email or password.'
      }, 1200)
    },
    validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },
  },
}
</script>

<style scoped>
.auth-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #eb6709 0%, #f63d43 100%);
}
.auth-card {
  margin-top: 10%;
  background: #202020;
  padding: 48px 32px 32px 32px;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
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
  transition: background 0.3s, color 0.3s;
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
    padding: 20px 30px;
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