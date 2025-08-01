<template>
  <div class="crypto-wallet">
    <!-- Wallet Header Component -->
    <WalletHeader
      :is-wallet-connected="isWalletConnected"
      :connecting="connecting"
      :wallet-address="walletAddress"
      :wallet-balance="walletBalance"
      :selected-network="selectedNetwork"
      @connect="connectWallet"
      @disconnect="disconnectWallet"
    />

    <!-- Network Selector Component -->
    <NetworkSelector
      :supported-networks="supportedNetworks"
      :selected-network="selectedNetwork"
      @select-network="selectNetwork"
    />

    <!-- Payment Form Component -->
    <PaymentForm
      :is-wallet-connected="isWalletConnected"
      :selected-network="selectedNetwork"
      :investment-plans="investmentPlans"
      :selected-plan="selectedPlan"
      :investment-amount="investmentAmount"
      :network-fee="networkFee"
      :total-to-pay="totalToPay"
      :can-process-payment="canProcessPayment"
      :processing="processing"
      @update:selected-plan="selectedPlan = $event"
      @update:investment-amount="investmentAmount = $event"
      @process-payment="processPayment"
    />

    <!-- Transaction History Component -->
    <TransactionHistory :is-wallet-connected="isWalletConnected" :transactions="transactions" />

    <!-- Payment Modal Component -->
    <PaymentModal
      :show="showPaymentModal"
      :investment-amount="investmentAmount"
      :selected-network="selectedNetwork"
      :selected-plan="selectedPlan"
      :network-fee="networkFee"
      :total-to-pay="totalToPay"
      @close="closePaymentModal"
      @confirm="confirmPayment"
    />
  </div>
</template>

<script>
import WalletHeader from './wallet/WalletHeader.vue'
import NetworkSelector from './wallet/NetworkSelector.vue'
import PaymentForm from './wallet/PaymentForm.vue'
import TransactionHistory from './wallet/TransactionHistory.vue'
import PaymentModal from './wallet/PaymentModal.vue'

export default {
  name: 'CryptoWallet',
  components: {
    WalletHeader,
    NetworkSelector,
    PaymentForm,
    TransactionHistory,
    PaymentModal,
  },
  data() {
    return {
      isWalletConnected: false,
      connecting: false,
      walletAddress: '',
      walletBalance: 0,
      walletDetails: null, // Store wallet connection details
      selectedNetwork: {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        icon: '🔷',
      },
      supportedNetworks: [
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          icon: '🔷',
        },
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          icon: '₿',
        },
        {
          id: 'polygon',
          name: 'Polygon',
          symbol: 'MATIC',
          icon: '🔷',
        },
        {
          id: 'binance',
          name: 'Binance Smart Chain',
          symbol: 'BNB',
          icon: '🟡',
        },
      ],
      investmentPlans: [
        {
          id: 1,
          name: 'Silver Plan',
          minAmount: 5000,
          maxAmount: 20000,
          duration: 60,
          roi: 10,
        },
        {
          id: 2,
          name: 'Gold Plan',
          minAmount: 10000,
          maxAmount: 50000,
          duration: 75,
          roi: 15,
        },
        {
          id: 3,
          name: 'Platinum Plan',
          minAmount: 20000,
          maxAmount: 100000,
          duration: 90,
          roi: 20,
        },
      ],
      selectedPlan: null,
      investmentAmount: '',
      networkFee: 0.001,
      totalToPay: 0,
      canProcessPayment: false,
      processing: false,
      showPaymentModal: false,
      transactions: [],
    }
  },
  computed: {
    totalToPay() {
      const amount = parseFloat(this.investmentAmount) || 0
      return amount + this.networkFee
    },
    canProcessPayment() {
      return (
        this.isWalletConnected &&
        this.selectedPlan &&
        this.investmentAmount &&
        parseFloat(this.investmentAmount) >= this.selectedPlan.minAmount &&
        !this.processing
      )
    },
  },
  methods: {
    connectWallet(walletData) {
      this.connecting = true
      
      // Simulate wallet connection with provided details
      setTimeout(() => {
        // Store wallet details
        this.walletDetails = {
          type: walletData.walletType,
          address: walletData.details.address,
          name: walletData.details.name,
          network: walletData.details.network,
        }
        
        // Update connection state
        this.isWalletConnected = true
        this.walletAddress = walletData.details.address
        
        // Set wallet balance based on network
        const balances = {
          ethereum: 2.5,
          bitcoin: 0.15,
          polygon: 150,
          binance: 5.2,
        }
        this.walletBalance = balances[walletData.details.network] || 2.5
        
        // Update selected network if different
        if (walletData.details.network !== this.selectedNetwork.id) {
          const networkMap = {
            ethereum: this.supportedNetworks.find(n => n.id === 'ethereum'),
            bitcoin: this.supportedNetworks.find(n => n.id === 'bitcoin'),
            polygon: this.supportedNetworks.find(n => n.id === 'polygon'),
            binance: this.supportedNetworks.find(n => n.id === 'binance'),
          }
          this.selectedNetwork = networkMap[walletData.details.network] || this.selectedNetwork
        }
        
        this.connecting = false

        // Load transaction history
        this.loadTransactionHistory()
        
        // Show success message
        console.log('Wallet connected successfully!', walletData)
      }, 2000)
    },

    disconnectWallet() {
      this.isWalletConnected = false
      this.walletAddress = ''
      this.walletBalance = 0
      this.transactions = []
    },

    selectNetwork(network) {
      this.selectedNetwork = network
      // Update network fee based on selected network
      const fees = {
        ethereum: 0.001,
        bitcoin: 0.0001,
        polygon: 0.0001,
        binance: 0.0001,
      }
      this.networkFee = fees[network.id] || 0.001
    },

    processPayment() {
      if (this.canProcessPayment) {
        this.showPaymentModal = true
      }
    },

    closePaymentModal() {
      this.showPaymentModal = false
    },

    async confirmPayment() {
      this.processing = true
      this.showPaymentModal = false

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Add transaction to history
      const transaction = {
        id: Date.now(),
        type: 'Investment Payment',
        amount: this.investmentAmount,
        network: this.selectedNetwork.symbol,
        date: new Date().toISOString(),
        status: 'completed',
      }

      this.transactions.unshift(transaction)

      // Reset form
      this.selectedPlan = null
      this.investmentAmount = ''
      this.processing = false

      // Show success message (you could add a toast notification here)
      console.log('Payment processed successfully!')
    },

    loadTransactionHistory() {
      // Simulate loading transaction history
      this.transactions = [
        {
          id: 1,
          type: 'Investment Payment',
          amount: '0.5',
          network: 'ETH',
          date: '2024-01-15T10:30:00Z',
          status: 'completed',
        },
        {
          id: 2,
          type: 'Investment Payment',
          amount: '0.25',
          network: 'ETH',
          date: '2024-01-10T14:20:00Z',
          status: 'completed',
        },
      ]
    },
  },
}
</script>

<style scoped>
.crypto-wallet {
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: var(--spacing-xl);
}

@media (max-width: 768px) {
  .crypto-wallet {
    padding: var(--spacing-md);
  }
}
</style>
