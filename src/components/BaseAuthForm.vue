<template>
  <section class="auth-section">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">
            <span class="logo-icon">💎</span>
          </div>
          <h2 class="auth-title animate-text-slide">{{ title }}</h2>
          <p class="auth-subtitle animate-text-slide">Welcome to CryptoHarvest</p>
        </div>

        <!-- Wallet Info Section (only for signup) -->
        <div v-if="showWalletInfo" class="wallet-info-section animate-text-fade">
          <div class="wallet-header">
            <span class="wallet-icon">💰</span>
            <h3 class="wallet-title">Investment Wallets</h3>
          </div>
          
          <!-- Bitcoin Wallet -->
          <div class="wallet-address-container">
            <div class="wallet-label">
              <span class="crypto-icon">₿</span>
              <span>Bitcoin Address</span>
            </div>
            <div class="wallet-address-display">
              <span class="wallet-address">{{ bitcoinWalletAddress }}</span>
              <button @click="copyWalletAddress(bitcoinWalletAddress)" class="copy-btn">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <!-- Ethereum Wallet -->
          <div class="wallet-address-container">
            <div class="wallet-label">
              <span class="crypto-icon">Ξ</span>
              <span>Ethereum Address</span>
            </div>
            <div class="wallet-address-display">
              <span class="wallet-address">{{ ethereumWalletAddress }}</span>
              <button @click="copyWalletAddress(ethereumWalletAddress)" class="copy-btn">
                <i class="fas fa-copy"></i>
              </button>
            </div>
          </div>

          <p class="wallet-note">
            Use these addresses to send cryptocurrency for investment after creating your account
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form animate-text-stagger">
          <div v-for="field in formFields" :key="field.name" class="form-group">
            <label :for="field.name" class="form-label">{{ field.label }}</label>
            <div class="input-container">
              <input
                :type="field.type === 'password' ? (showPassword ? 'text' : 'password') : field.type"
                :id="field.name"
                :name="field.name"
                v-model="formData[field.name]"
                :required="field.required"
                :placeholder="field.placeholder"
                class="form-input"
                :class="{ 'password-input': field.type === 'password' }"
              />
              <div class="input-focus-border"></div>
              
              <!-- Password visibility toggle -->
              <button 
                v-if="field.type === 'password'" 
                type="button"
                @click="togglePasswordVisibility"
                class="password-toggle-btn"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div v-if="error" class="auth-error">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </div>

          <button type="submit" class="auth-btn" :disabled="loading">
            <span v-if="!loading" class="btn-text">{{ submitText }}</span>
            <span v-else class="btn-loading">
              <i class="fas fa-spinner fa-spin"></i>
              {{ loadingText }}
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p class="auth-link animate-text-fade">
            {{ linkText }}
            <router-link :to="linkRoute" class="auth-link-btn">{{ linkAction }}</router-link>
          </p>

          <!-- Additional links for signup -->
          <p v-if="showWalletInfo" class="auth-link animate-text-fade">
            Want to invest with crypto?
            <router-link to="/crypto-wallet" class="auth-link-btn">Access Crypto Wallet</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BaseAuthForm',
  props: {
    title: {
      type: String,
      required: true,
    },
    formFields: {
      type: Array,
      required: true,
    },
    submitText: {
      type: String,
      required: true,
    },
    loadingText: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
    linkAction: {
      type: String,
      required: true,
    },
    linkRoute: {
      type: String,
      required: true,
    },
    showWalletInfo: {
      type: Boolean,
      default: false,
    },
    bitcoinWalletAddress: {
      type: String,
      default: 'bc1qguk7k34dr64ly2rmn2l0mwsrvk553fa8c8yl7c',
    },
    ethereumWalletAddress: {
      type: String,
      default: '0xBE4D058F6f12dE10158B2F9837eB65208FE4036f',
    },
  },
  data() {
    return {
      formData: {},
      error: '',
      loading: false,
      showPassword: false, // New data property for password visibility
    }
  },
  created() {
    // Initialize formData based on formFields
    this.formFields.forEach((field) => {
      this.formData[field.name] = ''
    })
  },
  methods: {
    async handleSubmit() {
      this.error = ''
      this.loading = true

      try {
        // Emit submit event with form data
        await this.$emit('submit', this.formData)
      } catch (error) {
        this.error = error.message || 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    copyWalletAddress(address) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          // You could add a toast notification here
          console.log('Wallet address copied to clipboard')
        })
        .catch((err) => {
          console.error('Failed to copy wallet address:', err)
        })
    },

    validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  },
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.auth-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo {
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 48px;
  display: block;
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.auth-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--bg-dark);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.auth-subtitle {
  color: var(--text-muted);
  font-size: 16px;
  font-weight: 500;
}

/* Wallet Info Section */
.wallet-info-section {
  background: linear-gradient(135deg, rgba(235, 103, 9, 0.15) 0%, rgba(246, 61, 67, 0.15) 100%);
  border: 1px solid rgba(235, 103, 9, 0.3);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
}

.wallet-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.wallet-icon {
  font-size: 24px;
}

.wallet-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-white);
  margin: 0;
}

.wallet-address-container {
  margin-bottom: 16px;
}

.wallet-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-white);
}

.crypto-icon {
  font-size: 16px;
  font-weight: bold;
}

.wallet-address-display {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.3);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(235, 103, 9, 0.2);
}

.wallet-address {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-gold);
  word-break: break-all;
  flex: 1;
}

.copy-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(235, 103, 9, 0.3);
}

.wallet-note {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin: 0;
  line-height: 1.5;
}

/* Form Styles */
.auth-form {
  margin-bottom: 32px;
  width: 100%;
}

.form-group {
  margin-bottom: 24px;
  width: 100%;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--bg-dark);
  margin-bottom: 8px;
}

.input-container {
  position: relative;
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--bg-dark);
  transition: all 0.3s ease;
  outline: none;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--primary-orange);
  background: white;
  box-shadow: 0 0 0 4px rgba(235, 103, 9, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.input-focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-gradient);
  transition: width 0.3s ease;
}

.form-input:focus + .input-focus-border {
  width: 100%;
}

.auth-error {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #dc3545;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(220, 53, 69, 0.2);
}

.auth-btn {
  width: 100%;
  padding: 16px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.auth-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.auth-btn:hover::before {
  left: 100%;
}

.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(235, 103, 9, 0.3);
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Password Input Specific Styles */
.password-input {
  padding-right: 50px; /* Make space for the eye icon */
}

.password-toggle-btn {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 18px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
}

.password-toggle-btn:hover {
  color: var(--primary-orange);
  background: rgba(235, 103, 9, 0.1);
}

.password-toggle-btn:active {
  transform: translateY(-50%) scale(0.95);
}

/* Footer */
.auth-footer {
  text-align: center;
}

.auth-link {
  color: var(--text-muted);
  font-size: 14px;
  margin-bottom: 12px;
}

.auth-link:last-child {
  margin-bottom: 0;
}

.auth-link-btn {
  color: var(--primary-orange);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-link-btn:hover {
  color: var(--primary-red);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-container {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .auth-card {
    padding: 32px 24px;
  }
  
  .auth-title {
    font-size: 24px;
  }
  
  .logo-icon {
    font-size: 40px;
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 24px 20px;
  }
  
  .auth-title {
    font-size: 22px;
  }
  
  .form-input {
    padding: 14px 16px;
  }
  
  .auth-btn {
    padding: 14px;
  }
}
</style>
