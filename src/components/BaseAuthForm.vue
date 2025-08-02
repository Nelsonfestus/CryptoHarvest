<template>
  <section class="auth-section">
    <div class="auth-card">
      <h2 class="auth-title animate-text-slide">{{ title }}</h2>

      <!-- Wallet Info Section (only for signup) -->
      <div v-if="showWalletInfo" class="wallet-info-section animate-text-fade">
        <h3 class="wallet-title">Cryptocurrency Investment Wallets</h3>
        
        <!-- Bitcoin Wallet -->
        <div class="wallet-address-container">
          <label>Send Bitcoin to:</label>
          <div class="wallet-address-display">
            <span class="wallet-address">{{ bitcoinWalletAddress }}</span>
            <button @click="copyWalletAddress(bitcoinWalletAddress)" class="copy-btn">
              <i class="fas fa-copy"></i> Copy
            </button>
          </div>
        </div>

        <!-- Ethereum Wallet -->
        <div class="wallet-address-container">
          <label>Send Ethereum to:</label>
          <div class="wallet-address-display">
            <span class="wallet-address">{{ ethereumWalletAddress }}</span>
            <button @click="copyWalletAddress(ethereumWalletAddress)" class="copy-btn">
              <i class="fas fa-copy"></i> Copy
            </button>
          </div>
        </div>

        <p class="wallet-note">
          After creating your account, you can invest using either Bitcoin or Ethereum wallet addresses
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form animate-text-stagger">
        <div v-for="field in formFields" :key="field.name" class="form-group">
          <label :for="field.name">{{ field.label }}</label>
          <input
            :type="field.type"
            :id="field.name"
            :name="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            :placeholder="field.placeholder"
          />
        </div>

        <div v-if="error" class="auth-error">{{ error }}</div>

        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="!loading">{{ submitText }}</span>
          <span v-else>{{ loadingText }}</span>
        </button>
      </form>

      <p class="auth-link animate-text-fade">
        {{ linkText }}
        <router-link :to="linkRoute">{{ linkAction }}</router-link>
      </p>

      <!-- Additional links for signup -->
      <p v-if="showWalletInfo" class="auth-link animate-text-fade">
        Want to invest with crypto?
        <router-link to="/crypto-wallet">Access Crypto Wallet</router-link>
      </p>
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
  },
}
</script>

<style scoped>
.wallet-info-section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  border: 1px solid var(--primary-orange);
}

.wallet-title {
  font-size: var(--font-size-lg);
  color: var(--text-gold);
  margin-bottom: var(--spacing-lg);
  text-align: center;
}

.wallet-address-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.wallet-address-container:last-of-type {
  margin-bottom: var(--spacing-sm);
}

.wallet-address-container label {
  font-size: var(--font-size-sm);
  color: var(--text-white);
  font-weight: 600;
}

.wallet-address-display {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--bg-dark);
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.wallet-address {
  font-family: 'Courier New', monospace;
  font-size: var(--font-size-sm);
  color: var(--text-gold);
  word-break: break-all;
}

.copy-btn {
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.copy-btn:hover {
  background: var(--text-white);
  color: var(--primary-orange);
}

.wallet-note {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  text-align: center;
  margin-top: var(--spacing-sm);
}
</style>
