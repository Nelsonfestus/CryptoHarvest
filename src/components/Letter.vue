<template>
  <section class="news-section animate-fade-slide">
    <h1>Don’t miss out on the chance to maximize your returns and secure your financial future.</h1>
    <p>
      Sign up for our newsletter to receive exclusive updates and investment tips from CryptoHarvest
      Investment Trading.
    </p>
    <form class="email-input-wrapper" @submit.prevent="handleSubscribe">
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email"
        required
        aria-label="Email address"
      />
      <button type="submit" :disabled="loading">
        <span v-if="!loading">Subscribe <i class="bi bi-send-fill"></i></span>
        <span v-else><i class="bi bi-arrow-repeat send-spin"></i> Sending...</span>
      </button>
    </form>
    <p v-if="success" class="newsletter-success">Thank you for subscribing!</p>
    <p v-if="error" class="newsletter-error">{{ error }}</p>
  </section>
</template>

<script>
export default {
  name: 'Letter',
  data() {
    return {
      email: '',
      loading: false,
      success: false,
      error: '',
    }
  },
  methods: {
    handleSubscribe() {
      this.error = ''
      this.success = false
      if (!this.validateEmail(this.email)) {
        this.error = 'Please enter a valid email address.'
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.success = true
        this.email = ''
      }, 1200)
    },
    validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },
  },
}
</script>

<style scoped>
.news-section {
  background: #202020;
  color: white;
  text-align: center;
  padding: 60px 20px;
}
.news-section h1 {
  text-transform: uppercase;
  font-size: 2rem;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
}
.news-section p {
  text-transform: capitalize;
  margin-bottom: 30px;
  color: #ccc;
  font-size: 1rem;
}
.email-input-wrapper {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
}
.email-input-wrapper input {
  width: 100%;
  padding: 15px 120px 15px 20px;
  border-radius: 30px;
  border: none;
  outline: none;
  font-size: 1rem;
}
.email-input-wrapper button {
  position: absolute;
  top: 4px;
  right: 4px;
  bottom: 4px;
  padding: 0 25px;
  border: none;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: white;
  font-size: 0.95rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.email-input-wrapper button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.email-input-wrapper button:hover:not(:disabled) {
  background: linear-gradient(90deg, #f63d43 0%, #eb6709 100%);
}
.send-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.newsletter-success {
  color: #4caf50;
  font-weight: 600;
  margin-top: 8px;
}
.newsletter-error {
  color: #ff4d4f;
  font-weight: 600;
  margin-top: 8px;
}
.animate-fade-slide {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}
@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
