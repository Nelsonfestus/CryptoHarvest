<template>
  <div class="wallet-section">
    <h2>Crypto Wallet Integration</h2>

    <!-- Wallet Status -->
    <div class="wallet-status" :class="{ connected: isWalletConnected }">
      <div class="status-indicator">
        <span class="status-dot"></span>
        <span class="status-text">{{
          isWalletConnected ? 'Wallet Connected' : 'Wallet Disconnected'
        }}</span>
      </div>
      <button
        v-if="!isWalletConnected"
        @click="showConnectionModal"
        class="connect-btn"
        :disabled="connecting"
      >
        <span v-if="!connecting">Connect Wallet</span>
        <span v-else>Connecting...</span>
      </button>
      <button v-else @click="$emit('disconnect')" class="disconnect-btn">Disconnect</button>
    </div>

    <!-- Connected Wallet Info -->
    <div v-if="isWalletConnected" class="wallet-info">
      <div class="wallet-details">
        <h3>Connected Wallet</h3>
        <div class="wallet-address">
          <span class="label">Address:</span>
          <span class="address">{{ formatAddress(walletAddress) }}</span>
          <button @click="copyAddress" class="copy-btn">Copy</button>
        </div>
        <div class="wallet-balance">
          <span class="label">Balance:</span>
          <span class="balance">{{ walletBalance }} {{ selectedNetwork.symbol }}</span>
        </div>
        <div class="network-info">
          <span class="label">Network:</span>
          <span class="network">{{ selectedNetwork.name }}</span>
        </div>
      </div>
    </div>

    <!-- Investment Wallet Info -->
    <div class="investment-wallet-info">
      <h3>Investment Wallet Address</h3>
      <div class="investment-wallet-details">
        <div class="wallet-address">
          <span class="label">Send {{ selectedNetwork.symbol }} to:</span>
          <span class="address">{{ getInvestmentWalletAddress() }}</span>
          <button @click="copyInvestmentAddress" class="copy-btn">Copy</button>
        </div>
        <p class="investment-note">
          Send your investment amount to this address to complete your investment
        </p>
      </div>
    </div>

    <!-- Wallet Connection Modal -->
    <WalletConnectionModal
      :show="showModal"
      :connecting="connecting"
      @close="hideConnectionModal"
      @connect="handleWalletConnection"
    />
  </div>
</template>

<script>
import WalletConnectionModal from './WalletConnectionModal.vue'

export default {
  name: 'WalletHeader',
  components: {
    WalletConnectionModal,
  },
  props: {
    isWalletConnected: {
      type: Boolean,
      default: false,
    },
    connecting: {
      type: Boolean,
      default: false,
    },
    walletAddress: {
      type: String,
      default: '',
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
    selectedNetwork: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    showConnectionModal() {
      this.showModal = true
    },
    
    hideConnectionModal() {
      this.showModal = false
    },
    
    handleWalletConnection(walletData) {
      // Emit the connection event with wallet details
      this.$emit('connect', walletData)
      this.hideConnectionModal()
    },
    
    formatAddress(address) {
      if (!address) return ''
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    },

    copyAddress() {
      navigator.clipboard
        .writeText(this.walletAddress)
        .then(() => {
          console.log('Wallet address copied to clipboard')
        })
        .catch((err) => {
          console.error('Failed to copy address:', err)
        })
    },

    copyInvestmentAddress() {
      const address = this.getInvestmentWalletAddress()
      navigator.clipboard
        .writeText(address)
        .then(() => {
          console.log('Investment address copied to clipboard')
        })
        .catch((err) => {
          console.error('Failed to copy investment address:', err)
        })
    },

    getInvestmentWalletAddress() {
      // This would typically come from your backend
      const addresses = {
        ethereum: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        bitcoin: 'bc1qguk7k34dr64ly2rmn2l0mwsrvk553fa8c8yl7c',
        polygon: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        binance: 'bnb1guk7k34dr64ly2rmn2l0mwsrvk553fa8c8yl7c',
      }
      return addresses[this.selectedNetwork.id] || addresses.ethereum
    },
  },
}
</script>

<style scoped>
.wallet-section {
  background: #000000;
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.wallet-section h2 {
  color: var(--text-white);
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.wallet-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-darker);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  border: 2px solid #333;
  transition: all var(--transition-normal);
}

.wallet-status.connected {
  border-color: #4caf50;
  background: rgba(76, 175, 80, 0.1);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f44336;
  animation: pulse 2s infinite;
}

.wallet-status.connected .status-dot {
  background: #4caf50;
}

.status-text {
  color: var(--text-white);
  font-weight: 600;
}

.connect-btn,
.disconnect-btn {
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.connect-btn:hover:not(:disabled),
.disconnect-btn:hover {
  background: var(--text-white);
  color: var(--primary-orange);
}

.connect-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.wallet-info {
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.wallet-details h3 {
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
}

.wallet-address,
.wallet-balance,
.network-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.label {
  color: var(--text-muted);
  font-weight: 600;
  min-width: 80px;
}

.address,
.balance,
.network {
  color: var(--text-white);
  font-family: 'Courier New', monospace;
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
}

.copy-btn:hover {
  background: var(--text-white);
  color: var(--primary-orange);
}

.investment-wallet-info {
  background: var(--bg-darker);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  border: 1px solid var(--primary-orange);
}

.investment-wallet-info h3 {
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
}

.investment-note {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  font-style: italic;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .wallet-status {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .wallet-address,
  .wallet-balance,
  .network-info {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
