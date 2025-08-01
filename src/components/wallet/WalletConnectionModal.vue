<template>
  <div v-if="show" class="wallet-modal-overlay" @click="closeModal">
    <div class="wallet-modal" @click.stop>
      <div class="modal-header">
        <h3>Connect Your Wallet</h3>
        <button @click="closeModal" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-content">
        <!-- Step 1: Wallet Type Selection -->
        <div v-if="currentStep === 1" class="step-content">
          <div class="step-indicator">
            <span class="step-number active">1</span>
            <span class="step-line"></span>
            <span class="step-number">2</span>
            <span class="step-line"></span>
            <span class="step-number">3</span>
          </div>
          
          <h4>Choose Your Wallet Type</h4>
          <p class="step-description">Select the type of wallet you want to connect</p>
          
          <div class="wallet-options">
            <div 
              v-for="wallet in walletTypes" 
              :key="wallet.id"
              @click="selectWalletType(wallet)"
              class="wallet-option"
              :class="{ selected: selectedWalletType?.id === wallet.id }"
            >
              <div class="wallet-icon">{{ wallet.icon }}</div>
              <div class="wallet-info">
                <h5>{{ wallet.name }}</h5>
                <p>{{ wallet.description }}</p>
              </div>
              <div class="selection-indicator">
                <i class="fas fa-check"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Wallet Details -->
        <div v-if="currentStep === 2" class="step-content">
          <div class="step-indicator">
            <span class="step-number completed">1</span>
            <span class="step-line completed"></span>
            <span class="step-number active">2</span>
            <span class="step-line"></span>
            <span class="step-number">3</span>
          </div>
          
          <h4>Enter Wallet Details</h4>
          <p class="step-description">Provide your wallet information for secure connection</p>
          
          <form @submit.prevent="validateWalletDetails" class="wallet-form">
            <div class="form-group">
              <label for="walletAddress">Wallet Address</label>
              <input
                id="walletAddress"
                v-model="walletDetails.address"
                type="text"
                placeholder="Enter your wallet address"
                required
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="walletName">Wallet Name (Optional)</label>
              <input
                id="walletName"
                v-model="walletDetails.name"
                type="text"
                placeholder="Give your wallet a name"
                class="form-input"
              />
            </div>
            
            <div class="form-group">
              <label for="network">Network</label>
              <select 
                id="network"
                v-model="walletDetails.network"
                required
                class="form-input"
              >
                <option value="">Select Network</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="polygon">Polygon (MATIC)</option>
                <option value="binance">Binance Smart Chain (BNB)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="walletDetails.agreeToTerms"
                  required
                />
                <span class="checkmark"></span>
                I agree to the terms and conditions for wallet connection
              </label>
            </div>
          </form>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-if="currentStep === 3" class="step-content">
          <div class="step-indicator">
            <span class="step-number completed">1</span>
            <span class="step-line completed"></span>
            <span class="step-number completed">2</span>
            <span class="step-line completed"></span>
            <span class="step-number active">3</span>
          </div>
          
          <h4>Confirm Connection</h4>
          <p class="step-description">Review your wallet details before connecting</p>
          
          <div class="confirmation-details">
            <div class="detail-item">
              <span class="detail-label">Wallet Type:</span>
              <span class="detail-value">{{ selectedWalletType?.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Wallet Address:</span>
              <span class="detail-value">{{ formatAddress(walletDetails.address) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Network:</span>
              <span class="detail-value">{{ getNetworkName(walletDetails.network) }}</span>
            </div>
            <div v-if="walletDetails.name" class="detail-item">
              <span class="detail-label">Wallet Name:</span>
              <span class="detail-value">{{ walletDetails.name }}</span>
            </div>
          </div>
          
          <div class="security-notice">
            <i class="fas fa-shield-alt"></i>
            <p>Your wallet connection is secure and encrypted. We never store your private keys.</p>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button 
          v-if="currentStep > 1" 
          @click="previousStep" 
          class="btn-secondary"
        >
          <i class="fas fa-arrow-left"></i>
          Back
        </button>
        
        <button 
          v-if="currentStep < 3" 
          @click="nextStep" 
          class="btn-primary"
          :disabled="!canProceed"
        >
          {{ currentStep === 1 ? 'Continue' : 'Next' }}
          <i class="fas fa-arrow-right"></i>
        </button>
        
        <button 
          v-if="currentStep === 3" 
          @click="connectWallet" 
          class="btn-primary"
          :disabled="connecting"
        >
          <span v-if="!connecting">
            <i class="fas fa-link"></i>
            Connect Wallet
          </span>
          <span v-else>
            <i class="fas fa-spinner fa-spin"></i>
            Connecting...
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WalletConnectionModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    connecting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentStep: 1,
      selectedWalletType: null,
      walletDetails: {
        address: '',
        name: '',
        network: '',
        agreeToTerms: false,
      },
      walletTypes: [
        {
          id: 'metamask',
          name: 'MetaMask',
          icon: '🦊',
          description: 'Popular Ethereum wallet with browser extension',
        },
        {
          id: 'trustwallet',
          name: 'Trust Wallet',
          icon: '🛡️',
          description: 'Mobile wallet supporting multiple blockchains',
        },
        {
          id: 'coinbase',
          name: 'Coinbase Wallet',
          icon: '🪙',
          description: 'User-friendly wallet from Coinbase',
        },
        {
          id: 'ledger',
          name: 'Ledger',
          icon: '🔒',
          description: 'Hardware wallet for maximum security',
        },
        {
          id: 'other',
          name: 'Other Wallet',
          icon: '💼',
          description: 'Connect any compatible wallet',
        },
      ],
    }
  },
  computed: {
    canProceed() {
      if (this.currentStep === 1) {
        return this.selectedWalletType !== null
      }
      if (this.currentStep === 2) {
        return this.walletDetails.address && 
               this.walletDetails.network && 
               this.walletDetails.agreeToTerms
      }
      return true
    },
  },
  methods: {
    selectWalletType(wallet) {
      this.selectedWalletType = wallet
    },
    
    nextStep() {
      if (this.canProceed) {
        this.currentStep++
      }
    },
    
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    
    validateWalletDetails() {
      if (this.canProceed) {
        this.nextStep()
      }
    },
    
    formatAddress(address) {
      if (!address) return ''
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    },
    
    getNetworkName(networkId) {
      const networks = {
        ethereum: 'Ethereum (ETH)',
        bitcoin: 'Bitcoin (BTC)',
        polygon: 'Polygon (MATIC)',
        binance: 'Binance Smart Chain (BNB)',
      }
      return networks[networkId] || networkId
    },
    
    async connectWallet() {
      this.$emit('connect', {
        walletType: this.selectedWalletType,
        details: this.walletDetails,
      })
    },
    
    closeModal() {
      this.$emit('close')
      this.resetForm()
    },
    
    resetForm() {
      this.currentStep = 1
      this.selectedWalletType = null
      this.walletDetails = {
        address: '',
        name: '',
        network: '',
        agreeToTerms: false,
      }
    },
  },
}
</script>

<style scoped>
.wallet-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.wallet-modal {
  background: var(--bg-dark);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: var(--text-white);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: var(--text-white);
  background: rgba(255, 255, 255, 0.1);
}

.modal-content {
  padding: 32px;
  max-height: 60vh;
  overflow-y: auto;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.step-number.active {
  background: var(--primary-gradient);
  color: white;
}

.step-number.completed {
  background: #4caf50;
  color: white;
}

.step-line {
  width: 60px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 16px;
  transition: all 0.3s ease;
}

.step-line.completed {
  background: #4caf50;
}

.step-content h4 {
  color: var(--text-white);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
}

.step-description {
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 32px;
}

.wallet-options {
  display: grid;
  gap: 16px;
}

.wallet-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.wallet-option:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-orange);
}

.wallet-option.selected {
  background: rgba(235, 103, 9, 0.1);
  border-color: var(--primary-orange);
}

.wallet-icon {
  font-size: 32px;
  width: 48px;
  text-align: center;
}

.wallet-info {
  flex: 1;
}

.wallet-info h5 {
  color: var(--text-white);
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.wallet-info p {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0;
}

.selection-indicator {
  color: var(--primary-orange);
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wallet-option.selected .selection-indicator {
  opacity: 1;
}

.wallet-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: grid;
  gap: 8px;
}

.form-group label {
  color: var(--text-white);
  font-weight: 600;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-white);
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: var(--primary-orange);
  background: rgba(255, 255, 255, 0.1);
}

.form-input::placeholder {
  color: var(--text-muted);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  color: var(--text-white);
  font-size: 14px;
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.3s ease;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: var(--primary-orange);
  border-color: var(--primary-orange);
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.confirmation-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: var(--text-muted);
  font-weight: 600;
}

.detail-value {
  color: var(--text-white);
  font-weight: 500;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  padding: 16px;
}

.security-notice i {
  color: #4caf50;
  font-size: 20px;
}

.security-notice p {
  color: var(--text-white);
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  gap: 16px;
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;
}

.btn-primary {
  background: var(--primary-gradient);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(235, 103, 9, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-white);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .wallet-modal {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header,
  .modal-content,
  .modal-footer {
    padding: 20px;
  }
  
  .wallet-option {
    padding: 16px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style> 