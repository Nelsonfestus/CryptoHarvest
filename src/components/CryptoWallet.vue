<template>
  <div class="crypto-wallet">
    <!-- Wallet Connection Section -->
    <div class="wallet-section">
      <h2>Crypto Wallet Integration</h2>
      
      <!-- Wallet Status -->
      <div class="wallet-status" :class="{ connected: isWalletConnected }">
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">{{ isWalletConnected ? 'Wallet Connected' : 'Wallet Disconnected' }}</span>
        </div>
        <button 
          v-if="!isWalletConnected" 
          @click="connectWallet" 
          class="connect-btn"
          :disabled="connecting"
        >
          <span v-if="!connecting">Connect Wallet</span>
          <span v-else>Connecting...</span>
        </button>
        <button 
          v-else 
          @click="disconnectWallet" 
          class="disconnect-btn"
        >
          Disconnect
        </button>
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
    </div>

    <!-- Supported Networks -->
    <div class="networks-section">
      <h3>Supported Networks</h3>
      <div class="networks-grid">
        <div 
          v-for="network in supportedNetworks" 
          :key="network.id"
          :class="['network-card', { active: selectedNetwork.id === network.id }]"
          @click="selectNetwork(network)"
        >
          <img :src="network.icon" :alt="network.name" class="network-icon" />
          <div class="network-details">
            <h4>{{ network.name }}</h4>
            <p>{{ network.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Investment Payment Section -->
    <div v-if="isWalletConnected" class="payment-section">
      <h3>Make Investment Payment</h3>
      
      <div class="investment-form">
        <div class="form-group">
          <label>Select Investment Plan</label>
          <select v-model="selectedPlan" class="plan-select">
            <option value="">Choose a plan</option>
            <option v-for="plan in investmentPlans" :key="plan.id" :value="plan">
              {{ plan.name }} - Min: ${{ plan.minAmount }} | ROI: {{ plan.roi }}%
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Investment Amount ({{ selectedNetwork.symbol }})</label>
          <input 
            v-model="investmentAmount" 
            type="number" 
            :placeholder="`Enter amount in ${selectedNetwork.symbol}`"
            :min="selectedPlan ? selectedPlan.minAmount : 0"
            class="amount-input"
          />
          <div class="amount-info">
            <span>Min: ${{ selectedPlan ? selectedPlan.minAmount : 0 }}</span>
            <span>Max: ${{ selectedPlan ? selectedPlan.maxAmount : 'Unlimited' }}</span>
          </div>
        </div>

        <div class="payment-summary">
          <h4>Payment Summary</h4>
          <div class="summary-item">
            <span>Investment Amount:</span>
            <span>${{ investmentAmount || 0 }}</span>
          </div>
          <div class="summary-item">
            <span>Network Fee:</span>
            <span>{{ networkFee }} {{ selectedNetwork.symbol }}</span>
          </div>
          <div class="summary-item total">
            <span>Total to Pay:</span>
            <span>{{ totalToPay }} {{ selectedNetwork.symbol }}</span>
          </div>
        </div>

        <button 
          @click="processPayment" 
          class="pay-btn"
          :disabled="!canProcessPayment"
        >
          <span v-if="!processing">Pay {{ totalToPay }} {{ selectedNetwork.symbol }}</span>
          <span v-else>Processing Payment...</span>
        </button>
      </div>
    </div>

    <!-- Transaction History -->
    <div v-if="isWalletConnected" class="transactions-section">
      <h3>Transaction History</h3>
      <div class="transactions-list">
        <div 
          v-for="tx in transactions" 
          :key="tx.id" 
          class="transaction-item"
          :class="tx.status"
        >
          <div class="tx-info">
            <div class="tx-type">{{ tx.type }}</div>
            <div class="tx-amount">{{ tx.amount }} {{ tx.network }}</div>
            <div class="tx-date">{{ formatDate(tx.date) }}</div>
          </div>
          <div class="tx-status">
            <span :class="['status-badge', tx.status]">{{ tx.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPaymentModal" class="modal-overlay" @click="closePaymentModal">
      <div class="payment-modal" @click.stop>
        <h3>Confirm Payment</h3>
        <div class="payment-details">
          <p><strong>Amount:</strong> {{ investmentAmount }} {{ selectedNetwork.symbol }}</p>
          <p><strong>Network:</strong> {{ selectedNetwork.name }}</p>
          <p><strong>Plan:</strong> {{ selectedPlan.name }}</p>
          <p><strong>Fee:</strong> {{ networkFee }} {{ selectedNetwork.symbol }}</p>
          <p><strong>Total:</strong> {{ totalToPay }} {{ selectedNetwork.symbol }}</p>
        </div>
        <div class="modal-actions">
          <button @click="closePaymentModal" class="cancel-btn">Cancel</button>
          <button @click="confirmPayment" class="confirm-btn">Confirm Payment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CryptoWallet',
  data() {
    return {
      isWalletConnected: false,
      connecting: false,
      processing: false,
      walletAddress: '',
      walletBalance: 0,
      selectedNetwork: {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
        description: 'Smart contract platform'
      },
      supportedNetworks: [
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
          description: 'Smart contract platform'
        },
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
          description: 'Digital gold'
        },
        {
          id: 'binance',
          name: 'Binance Smart Chain',
          symbol: 'BNB',
          icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
          description: 'Fast and low-cost'
        },
        {
          id: 'polygon',
          name: 'Polygon',
          symbol: 'MATIC',
          icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
          description: 'Layer 2 scaling'
        }
      ],
      investmentPlans: [
        {
          id: 1,
          name: 'Gold Plan',
          minAmount: 1500,
          maxAmount: 5000,
          roi: 5,
          duration: 30
        },
        {
          id: 2,
          name: 'Silver Plan',
          minAmount: 5000,
          maxAmount: 20000,
          roi: 10,
          duration: 60
        },
        {
          id: 3,
          name: 'Platinum Plan',
          minAmount: 20000,
          maxAmount: null,
          roi: 20,
          duration: 90
        }
      ],
      selectedPlan: null,
      investmentAmount: '',
      networkFee: 0.001,
      transactions: [
        {
          id: 1,
          type: 'Investment',
          amount: 1500,
          network: 'ETH',
          date: '2024-01-15T10:30:00Z',
          status: 'completed'
        },
        {
          id: 2,
          type: 'Investment',
          amount: 5000,
          network: 'BTC',
          date: '2024-01-10T14:20:00Z',
          status: 'pending'
        }
      ],
      showPaymentModal: false
    }
  },
  computed: {
    totalToPay() {
      if (!this.investmentAmount) return 0
      return parseFloat(this.investmentAmount) + this.networkFee
    },
    canProcessPayment() {
      return this.isWalletConnected && 
             this.selectedPlan && 
             this.investmentAmount && 
             parseFloat(this.investmentAmount) >= this.selectedPlan.minAmount &&
             parseFloat(this.investmentAmount) <= (this.selectedPlan.maxAmount || Infinity) &&
             parseFloat(this.investmentAmount) <= this.walletBalance
    }
  },
  methods: {
    async connectWallet() {
      this.connecting = true
      
      try {
        // Simulate wallet connection (in real app, this would use Web3 or similar)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.isWalletConnected = true
        this.walletAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        this.walletBalance = 2.5
        
        // Store connection in localStorage
        localStorage.setItem('cryptoharvest_wallet_connected', 'true')
        localStorage.setItem('cryptoharvest_wallet_address', this.walletAddress)
        
        console.log('Wallet connected successfully')
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      } finally {
        this.connecting = false
      }
    },
    
    disconnectWallet() {
      this.isWalletConnected = false
      this.walletAddress = ''
      this.walletBalance = 0
      
      // Clear from localStorage
      localStorage.removeItem('cryptoharvest_wallet_connected')
      localStorage.removeItem('cryptoharvest_wallet_address')
      
      console.log('Wallet disconnected')
    },
    
    selectNetwork(network) {
      this.selectedNetwork = network
      // Update network fee based on network
      this.networkFee = this.getNetworkFee(network.id)
    },
    
    getNetworkFee(networkId) {
      const fees = {
        ethereum: 0.001,
        bitcoin: 0.0001,
        binance: 0.0005,
        polygon: 0.0001
      }
      return fees[networkId] || 0.001
    },
    
    formatAddress(address) {
      if (!address) return ''
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    },
    
    copyAddress() {
      navigator.clipboard.writeText(this.walletAddress)
      // Show success message
      console.log('Address copied to clipboard')
    },
    
    processPayment() {
      if (!this.canProcessPayment) return
      
      this.showPaymentModal = true
    },
    
    async confirmPayment() {
      this.processing = true
      this.showPaymentModal = false
      
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Create transaction record
        const transaction = {
          id: Date.now(),
          type: 'Investment',
          amount: parseFloat(this.investmentAmount),
          network: this.selectedNetwork.symbol,
          date: new Date().toISOString(),
          status: 'completed'
        }
        
        this.transactions.unshift(transaction)
        
        // Update wallet balance
        this.walletBalance -= this.totalToPay
        
        // Reset form
        this.selectedPlan = null
        this.investmentAmount = ''
        
        console.log('Payment processed successfully')
        
        // Show success message
        alert('Investment payment successful!')
        
      } catch (error) {
        console.error('Payment failed:', error)
        alert('Payment failed. Please try again.')
      } finally {
        this.processing = false
      }
    },
    
    closePaymentModal() {
      this.showPaymentModal = false
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    }
  },
  
  mounted() {
    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('cryptoharvest_wallet_connected')
    if (wasConnected === 'true') {
      this.isWalletConnected = true
      this.walletAddress = localStorage.getItem('cryptoharvest_wallet_address') || ''
      this.walletBalance = 2.5 // In real app, this would be fetched from blockchain
    }
  }
}
</script>

<style scoped>
.crypto-wallet {
  background: #0a0a0a;
  min-height: 100vh;
  color: #fff;
  padding: 20px;
}

.wallet-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #333;
}

.wallet-section h2 {
  color: #eb6709;
  margin-bottom: 20px;
}

.wallet-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #0a0a0a;
  border-radius: 8px;
  margin-bottom: 20px;
}

.wallet-status.connected {
  border: 1px solid #4ade80;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f63d43;
  animation: pulse 2s infinite;
}

.wallet-status.connected .status-dot {
  background: #4ade80;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.connect-btn, .disconnect-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.connect-btn {
  background: #eb6709;
  color: #fff;
}

.connect-btn:hover:not(:disabled) {
  background: #f63d43;
}

.connect-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.disconnect-btn {
  background: #f63d43;
  color: #fff;
}

.disconnect-btn:hover {
  background: #dc2626;
}

.wallet-info {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
}

.wallet-details h3 {
  color: #eb6709;
  margin-bottom: 15px;
}

.wallet-address, .wallet-balance, .network-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.label {
  color: #ccc;
  min-width: 80px;
}

.address, .balance, .network {
  font-family: monospace;
  background: #1a1a1a;
  padding: 5px 10px;
  border-radius: 4px;
  flex: 1;
}

.copy-btn {
  background: #333;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.networks-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #333;
}

.networks-section h3 {
  color: #eb6709;
  margin-bottom: 20px;
}

.networks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.network-card {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 15px;
}

.network-card:hover {
  border-color: #eb6709;
  transform: translateY(-2px);
}

.network-card.active {
  border-color: #eb6709;
  background: #1a1a1a;
}

.network-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.network-details h4 {
  margin: 0 0 5px 0;
  color: #fff;
}

.network-details p {
  margin: 0;
  color: #ccc;
  font-size: 0.9rem;
}

.payment-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #333;
}

.payment-section h3 {
  color: #eb6709;
  margin-bottom: 20px;
}

.investment-form {
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
  color: #ccc;
  font-weight: 600;
}

.plan-select, .amount-input {
  padding: 12px;
  border: 1px solid #333;
  border-radius: 6px;
  background: #0a0a0a;
  color: #fff;
  font-size: 1rem;
}

.plan-select:focus, .amount-input:focus {
  border-color: #eb6709;
  outline: none;
}

.amount-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #ccc;
}

.payment-summary {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
}

.payment-summary h4 {
  color: #eb6709;
  margin-bottom: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  border-top: 1px solid #333;
  padding-top: 10px;
  font-weight: bold;
  color: #eb6709;
}

.pay-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(235, 103, 9, 0.3);
}

.pay-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transactions-section {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #333;
}

.transactions-section h3 {
  color: #eb6709;
  margin-bottom: 20px;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #0a0a0a;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid #333;
}

.tx-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.tx-type {
  font-weight: 600;
  color: #fff;
}

.tx-amount {
  color: #eb6709;
  font-weight: 600;
}

.tx-date {
  color: #ccc;
  font-size: 0.9rem;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-badge.completed {
  background: #4ade80;
  color: #000;
}

.status-badge.pending {
  background: #fbbf24;
  color: #000;
}

.status-badge.failed {
  background: #f63d43;
  color: #fff;
}

.modal-overlay {
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
}

.payment-modal {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #333;
  max-width: 500px;
  width: 90%;
}

.payment-modal h3 {
  color: #eb6709;
  margin-bottom: 20px;
}

.payment-details {
  margin-bottom: 20px;
}

.payment-details p {
  margin-bottom: 10px;
  color: #ccc;
}

.payment-details strong {
  color: #fff;
}

.modal-actions {
  display: flex;
  gap: 10px;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.cancel-btn {
  background: #333;
  color: #fff;
}

.confirm-btn {
  background: #eb6709;
  color: #fff;
}

@media (max-width: 768px) {
  .crypto-wallet {
    padding: 10px;
  }
  
  .wallet-status {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .networks-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style> 