<template>
  <div class="dashboard-container">
    <!-- Dashboard Header -->
    <div class="dashboard-header">
      <h1>Welcome back, {{ user.name }}!</h1>
      <div class="user-info">
        <span class="user-email">{{ user.email }}</span>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Investment Overview -->
    <div class="overview-section">
      <div class="overview-card total-invested">
        <div class="card-icon">💰</div>
        <div class="card-content">
          <h3>Total Invested</h3>
          <p class="amount">${{ formatNumber(userStats.totalInvested) }}</p>
          <span class="change positive">+{{ userStats.totalGrowth }}%</span>
        </div>
      </div>

      <div class="overview-card current-value">
        <div class="card-icon">📈</div>
        <div class="card-content">
          <h3>Current Value</h3>
          <p class="amount">${{ formatNumber(userStats.currentValue) }}</p>
          <span class="change positive">+${{ formatNumber(userStats.totalProfit) }}</span>
        </div>
      </div>

      <div class="overview-card active-investments">
        <div class="card-icon">🎯</div>
        <div class="card-content">
          <h3>Active Investments</h3>
          <p class="amount">{{ userStats.activeInvestments }}</p>
          <span class="status">Active</span>
        </div>
      </div>

      <div class="overview-card wallet-balance">
        <div class="card-icon">💳</div>
        <div class="card-content">
          <h3>Wallet Balance</h3>
          <p class="amount">${{ formatNumber(userStats.walletBalance) }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="actions-section">
      <h2>Quick Actions</h2>
      <div class="action-buttons">
        <button class="action-btn invest-btn" @click="showInvestmentModal = true">
          <span class="btn-icon">💎</span>
          New Investment
        </button>
        <button class="action-btn withdraw-btn" @click="showWithdrawModal = true">
          <span class="btn-icon">💸</span>
          Withdraw Funds
        </button>
        <button class="action-btn support-btn" @click="openChat">
          <span class="btn-icon">💬</span>
          Get Support
        </button>
      </div>
    </div>

         <!-- Investment Portfolio -->
     <div class="portfolio-section">
       <h2>Your Investment Portfolio</h2>
       <div v-if="userInvestments.length === 0" class="empty-state">
         <div class="empty-icon">💎</div>
         <h3>No Investments Yet</h3>
         <p>Start your investment journey by creating your first investment plan.</p>
         <button class="start-investing-btn" @click="showInvestmentModal = true">
           Start Investing
         </button>
       </div>
       <div v-else class="portfolio-grid">
         <div 
           v-for="investment in userInvestments" 
           :key="investment.id" 
           class="investment-item"
           :class="investment.status"
         >
          <div class="investment-header">
            <h3>{{ investment.planName }}</h3>
            <span class="status-badge" :class="investment.status">
              {{ investment.status }}
            </span>
          </div>
          <div class="investment-details">
            <div class="detail-row">
              <span>Invested Amount:</span>
              <span>${{ formatNumber(investment.amount) }}</span>
            </div>
            <div class="detail-row">
              <span>Current Value:</span>
              <span>${{ formatNumber(investment.currentValue) }}</span>
            </div>
            <div class="detail-row">
              <span>ROI:</span>
              <span class="roi" :class="investment.roi >= 0 ? 'positive' : 'negative'">
                {{ investment.roi >= 0 ? '+' : '' }}{{ investment.roi }}%
              </span>
            </div>
            <div class="detail-row">
              <span>Start Date:</span>
              <span>{{ formatDate(investment.startDate) }}</span>
            </div>
            <div class="detail-row">
              <span>End Date:</span>
              <span>{{ formatDate(investment.endDate) }}</span>
            </div>
          </div>
          <div class="investment-actions">
            <button class="view-details-btn" @click="viewInvestmentDetails(investment)">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

         <!-- Recent Transactions -->
     <div class="transactions-section">
       <h2>Recent Transactions</h2>
       <div v-if="recentTransactions.length === 0" class="empty-state">
         <div class="empty-icon">📊</div>
         <h3>No Transactions Yet</h3>
         <p>Your transaction history will appear here once you start investing.</p>
       </div>
       <div v-else class="transactions-table">
         <div class="table-header">
           <span>Type</span>
           <span>Amount</span>
           <span>Date</span>
           <span>Status</span>
         </div>
         <div 
           v-for="transaction in recentTransactions" 
           :key="transaction.id" 
           class="table-row"
         >
          <span class="transaction-type" :class="transaction.type">
            {{ transaction.type }}
          </span>
          <span class="transaction-amount">
            ${{ formatNumber(transaction.amount) }}
          </span>
          <span class="transaction-date">
            {{ formatDate(transaction.date) }}
          </span>
          <span class="transaction-status" :class="transaction.status">
            {{ transaction.status }}
          </span>
        </div>
      </div>
    </div>

    <!-- Modals -->
         <div v-if="showInvestmentModal" class="modal-overlay" @click="showInvestmentModal = false">
       <div class="modal" @click.stop>
         <h3>New Investment</h3>
         
         <!-- Step 1: Select Investment Plan -->
         <div v-if="investmentStep === 1" class="investment-step">
           <h4>Step 1: Choose Your Investment Plan</h4>
         <div class="investment-plans">
           <div 
             v-for="plan in investmentPlans" 
             :key="plan.id"
             class="plan-option"
             :class="{ selected: selectedPlan && selectedPlan.id === plan.id }"
             @click="selectPlan(plan)"
           >
             <h4>{{ plan.name }}</h4>
            <p>${{ formatNumber(plan.minAmount) }} - ${{ plan.maxAmount ? formatNumber(plan.maxAmount) : 'Unlimited' }}</p>
            <p>Daily</p>
            <p>Profit – {{ plan.roi }}%</p>
            <p>DAILY / {{ plan.duration }} DAYS ⛏️⛏️</p>
            <p>Instant Payout - {{ plan.instantPayout ? 'Yes' : 'No' }}</p>
           </div>
         </div>
         
         <div v-if="selectedPlan" class="investment-details">
           <h4>Investment Details</h4>
             <div class="investment-summary">
               <h5>Investment Summary:</h5>
               <div class="summary-item">
                 <span>Plan:</span>
                 <span>{{ selectedPlan.name }}</span>
               </div>
               <div class="summary-item">
                 <span>Min Investment:</span>
                 <span>${{ formatNumber(selectedPlan.minAmount) }}</span>
               </div>
               <div class="summary-item">
                 <span>Expected ROI:</span>
                 <span>{{ selectedPlan.roi }}%</span>
               </div>
               <div class="summary-item">
                 <span>Duration:</span>
                 <span>{{ selectedPlan.duration }} days</span>
               </div>
               </div>
             </div>
           
           <div class="modal-actions">
             <button @click="showInvestmentModal = false">Cancel</button>
             <button 
               @click="proceedToPayment" 
               :disabled="!selectedPlan"
             >
               Pay Now
             </button>
           </div>
         </div>

                   <!-- Step 2: Cryptocurrency Payment -->
         <div v-if="investmentStep === 2" class="investment-step">
           <h4>Step 2: Cryptocurrency Payment</h4>
           <div class="crypto-payment-intro">
             <div class="crypto-icon-large">🔗</div>
             <h5>Pay with Cryptocurrency</h5>
             <p>Choose your preferred cryptocurrency to complete your investment. All payments are processed securely on the blockchain.</p>
         </div>
         
         <div class="modal-actions">
             <button @click="investmentStep = 1">Back</button>
           <button 
               @click="proceedToWallet" 
               class="continue-btn"
           >
               Continue to Wallet Selection
           </button>
         </div>
         </div>

         <!-- Step 3: Wallet Address Display -->
         <div v-if="investmentStep === 3" class="investment-step">
           <h4>Step 3: Send Payment to Wallet</h4>
           <div class="wallet-payment-section">
             <div class="payment-info">
               <h5>Investment Details:</h5>
               <div class="summary-item">
                 <span>Plan:</span>
                 <span>{{ selectedPlan.name }}</span>
               </div>
               <div class="summary-item">
                 <span>Min Investment:</span>
                 <span>${{ formatNumber(selectedPlan.minAmount) }}</span>
               </div>
               <div class="summary-item">
                 <span>Expected ROI:</span>
                 <span>{{ selectedPlan.roi }}%</span>
               </div>
             </div>

             <div class="crypto-wallets">
               <h5>Select Cryptocurrency:</h5>
               <div class="crypto-options">
                 <button 
                   v-for="crypto in cryptoWallets" 
                   :key="crypto.symbol"
                   class="crypto-option"
                   :class="{ active: selectedCrypto === crypto.symbol }"
                   @click="selectedCrypto = crypto.symbol"
                 >
                   <span class="crypto-icon">{{ crypto.icon }}</span>
                   <span class="crypto-name">{{ crypto.name }}</span>
                 </button>
               </div>

               <div v-if="selectedCrypto" class="wallet-address-section">
                 <h5>Send {{ getSelectedCryptoName() }} to this address:</h5>
                 <div class="wallet-address">
                   <input 
                     :value="getSelectedWalletAddress()" 
                     readonly 
                     class="address-input"
                   />
                   <button @click="copyWalletAddress" class="copy-btn">
                     📋 Copy
                   </button>
                 </div>
                                 <div class="wallet-qr">
                  <img 
                    :src="getSelectedWalletQR()" 
                    :alt="getSelectedCryptoName() + ' QR Code'"
                    class="qr-code-image"
                  />
                </div>
                                            <div class="payment-instructions">
                             <h6>Payment Instructions:</h6>
                             <ol>
                               <li>Copy the wallet address above</li>
                               <li>Send your desired investment amount in {{ getSelectedCryptoName() }}</li>
                               <li>Minimum investment: ${{ formatNumber(selectedPlan.minAmount) }}</li>
                               <li>Wait for blockchain confirmation (usually 1-3 confirmations)</li>
                               <li>Your investment will be activated automatically</li>
                             </ol>
                   <div class="important-note">
                     <strong>⚠️ Important:</strong> Only send {{ getSelectedCryptoName() }} to this address. Sending other cryptocurrencies may result in permanent loss.
                   </div>
                 </div>
               </div>
             </div>
           </div>
           
           <div class="modal-actions">
             <button @click="investmentStep = 2">Back</button>
             <button @click="confirmPayment" class="confirm-btn">
               I've Sent the Payment
             </button>
           </div>
         </div>


       </div>
     </div>

         <div v-if="showWithdrawModal" class="modal-overlay" @click="showWithdrawModal = false">
       <div class="modal" @click.stop>
         <h3>Withdraw Funds</h3>
         <div class="withdraw-form">
           <div class="input-group">
             <label>Amount to withdraw:</label>
             <input 
               v-model="withdrawAmount" 
               type="number" 
               placeholder="Enter amount"
               min="0"
               :max="userStats.walletBalance"
             />
             <p class="available-balance">Available: ${{ formatNumber(userStats.walletBalance) }}</p>
           </div>
           
           <div class="withdrawal-methods">
             <h4>Withdrawal Method:</h4>
             <div class="crypto-withdrawal-intro">
               <div class="crypto-icon-large">🔗</div>
               <h5>Crypto Wallet Withdrawal</h5>
               <p>Withdraw your funds directly to your cryptocurrency wallet. Fast, secure, and decentralized.</p>
             </div>
           </div>
           
           <!-- Crypto Withdrawal Form -->
           <div class="crypto-withdrawal-form">
             <h4>Crypto Wallet Address</h4>
             <div class="input-group">
               <label>Wallet Address:</label>
               <input 
                 v-model="cryptoWithdrawalAddress" 
                 type="text" 
                 placeholder="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
               />
             </div>
             <div class="input-group">
               <label>Cryptocurrency:</label>
               <select v-model="selectedCrypto">
                 <option value="BTC">Bitcoin (BTC)</option>
                <option value="SOL">Solana (SOL)</option>
               </select>
             </div>
           </div>
         </div>
         <div class="modal-actions">
           <button @click="showWithdrawModal = false">Cancel</button>
           <button 
             @click="processWithdrawal" 
             :disabled="!withdrawAmount || !selectedWithdrawalMethod || !isWithdrawalFormValid"
           >
             Withdraw
           </button>
         </div>
       </div>
     </div>

         <div v-if="showAddFunds" class="modal-overlay" @click="showAddFunds = false">
       <div class="modal" @click.stop>
         <h3>Add Funds</h3>
         <div class="add-funds-form">
           <label>Amount to add:</label>
           <input 
             v-model="addFundsAmount" 
             type="number" 
             placeholder="Enter amount"
             min="0"
           />
           <div class="payment-methods">
             <h4>Payment Method:</h4>
             <div class="crypto-payment-intro">
               <div class="crypto-icon-large">🔗</div>
               <h5>Add Funds with Cryptocurrency</h5>
               <p>Connect your crypto wallet to add funds to your account. Fast, secure, and decentralized.</p>
             </div>
           </div>
           
           <!-- Crypto Payment Form -->
           <div class="crypto-form">
             <h4>Crypto Wallet Payment</h4>
             <div class="wallet-info">
               <p>Connect your crypto wallet to proceed with payment</p>
               <button class="connect-wallet-btn" @click="connectCryptoWallet">
                 Connect Wallet
               </button>
             </div>
           </div>
         </div>
         <div class="modal-actions">
           <button @click="showAddFunds = false">Cancel</button>
           <button 
             @click="processAddFunds" 
             :disabled="!addFundsAmount || !selectedPaymentMethod || !isPaymentFormValid"
           >
             Add Funds
           </button>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'UserDashboard',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      },
             userStats: {
         totalInvested: 0,
         currentValue: 0,
         totalGrowth: 0,
         totalProfit: 0,
         activeInvestments: 0,
         walletBalance: 0
       },
             userInvestments: [],
             recentTransactions: [],
      investmentPlans: [
        {
          id: 1,
          name: 'Basic Plan',
          minAmount: 1000,
          maxAmount: 4999,
          roi: 10,
          duration: 2,
          dailyProfit: true,
          instantPayout: true
        },
        {
          id: 2,
          name: 'Premium Plan',
          minAmount: 5000,
          maxAmount: null, // Unlimited
          roi: 20,
          duration: 5,
          dailyProfit: true,
          instantPayout: true
        }
      ],
             showInvestmentModal: false,
       showWithdrawModal: false,
       showAddFunds: false,
       selectedPlan: null,
       withdrawAmount: '',
       addFundsAmount: '',
       investmentAmount: '',
       selectedPaymentMethod: 'crypto',
       selectedWithdrawalMethod: 'crypto',
       cryptoWithdrawalAddress: '',
       selectedCrypto: 'BTC',
       investmentStep: 1,
             cryptoWallets: [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          icon: '₿',
          address: 'bc1qeks6hcj24zjf57u3a4sdvzep3h7ne5dcvp7vy4',
          qrCode: '/src/assets/bitcoin wallet.jpeg'
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          icon: '◎',
          address: 'HXFKFzY54JpeL3waBQffeH5K3pMpFoARgk9E7pHFVCXX',
          qrCode: '/src/assets/solana wallet.jpeg'
        }
       ]
    }
  },
     computed: {
     isPaymentFormValid() {
       return this.selectedPaymentMethod === 'crypto'
     },
     isWithdrawalFormValid() {
       return this.selectedWithdrawalMethod === 'crypto' && this.cryptoWithdrawalAddress
     }
   },
     async mounted() {
    await this.loadUserData()
   },
  methods: {
    async loadUserData() {
      try {
        // Load user data from Supabase authentication
        const storedUser = localStorage.getItem('user')
      if (storedUser) {
          const userData = JSON.parse(storedUser)
          
          // Get additional user data from Supabase database
          const { data: userProfile, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userData.id)
            .single()
          
          if (error) {
            console.error('Error loading user profile:', error)
            // Fallback to basic user data
            this.user = {
              name: userData.user_metadata?.name || 'User',
              email: userData.email
            }
          } else {
            // Use data from database
            this.user = {
              name: userProfile.name || userData.user_metadata?.name || 'User',
              email: userProfile.email || userData.email
            }
            
            // Update user stats from database
            this.userStats = {
              totalInvested: userProfile.total_invested || 0,
              currentValue: userProfile.total_invested || 0,
              totalGrowth: 0,
              totalProfit: userProfile.total_profit || 0,
              activeInvestments: 0,
              walletBalance: userProfile.wallet_balance || 0
            }
          }
        } else {
          // No user data found, redirect to login
          this.$router.push('/login')
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        // Fallback to basic user data from localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          this.user = {
            name: userData.user_metadata?.name || 'User',
            email: userData.email
          }
        }
      }
    },
    formatNumber(num) {
      return num.toLocaleString()
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    logout() {
      // Clear authentication data
      localStorage.removeItem('user')
      localStorage.removeItem('session')
      localStorage.removeItem('isAdmin')
      
      // Redirect to login page
      this.$router.push('/login')
    },
    goToCryptoWallet() {
      this.$router.push('/crypto-wallet')
    },
    openChat() {
      // Open Tawk.to chat widget
      if (window.Tawk_API) {
        window.Tawk_API.showWidget()
        window.Tawk_API.maximize()
      } else {
        // Fallback if Tawk.to is not loaded
        alert('Chat support is loading. Please try again in a moment.')
      }
    },
    viewInvestmentDetails(investment) {
      // Navigate to investment details
      console.log('Viewing investment:', investment)
    },
    selectPlan(plan) {
      this.selectedPlan = plan
    },
         createInvestment() {
       if (!this.selectedPlan || !this.investmentAmount) return
       
       // Validate investment amount
       if (this.investmentAmount < this.selectedPlan.minAmount) {
         alert(`Minimum investment amount is $${this.formatNumber(this.selectedPlan.minAmount)}`)
         return
       }
       
       if (this.investmentAmount > this.userStats.walletBalance) {
         alert('Insufficient wallet balance')
         return
       }
       
       // Create new investment
       const newInvestment = {
         id: Date.now(),
         planName: this.selectedPlan.name,
         amount: parseFloat(this.investmentAmount),
         currentValue: parseFloat(this.investmentAmount),
         roi: 0,
         status: 'active',
         startDate: new Date().toISOString().split('T')[0],
         endDate: new Date(Date.now() + this.selectedPlan.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
       }
       
       // Update user data
       this.userInvestments.push(newInvestment)
       this.userStats.totalInvested += parseFloat(this.investmentAmount)
       this.userStats.currentValue += parseFloat(this.investmentAmount)
       this.userStats.activeInvestments += 1
       this.userStats.walletBalance -= parseFloat(this.investmentAmount)
       
       // Add transaction
       this.recentTransactions.unshift({
         id: Date.now(),
         type: 'investment',
         amount: parseFloat(this.investmentAmount),
         date: new Date().toISOString().split('T')[0],
         status: 'completed'
       })
       
       // Reset form
       this.showInvestmentModal = false
       this.selectedPlan = null
       this.investmentAmount = ''
       
       alert('Investment created successfully!')
     },
         processWithdrawal() {
       if (!this.withdrawAmount || !this.selectedWithdrawalMethod) return
       
       const amount = parseFloat(this.withdrawAmount)
       
       if (amount > this.userStats.walletBalance) {
         alert('Insufficient wallet balance')
         return
       }
       
       // Process withdrawal
       this.userStats.walletBalance -= amount
       
       // Add transaction
       this.recentTransactions.unshift({
         id: Date.now(),
         type: 'withdrawal',
         amount: amount,
         date: new Date().toISOString().split('T')[0],
         status: 'pending'
       })
       
       // Reset form
       this.showWithdrawModal = false
       this.withdrawAmount = ''
       this.selectedWithdrawalMethod = 'crypto'
       this.cryptoWithdrawalAddress = ''
       
       alert('Withdrawal request submitted successfully! It will be processed within 24-48 hours.')
     },
         connectCryptoWallet() {
       // Simulate wallet connection
       alert('Connecting to crypto wallet...')
       setTimeout(() => {
         alert('Crypto wallet connected successfully!')
       }, 1000)
     },

     processAddFunds() {
       if (!this.addFundsAmount || !this.selectedPaymentMethod) return
       
       const amount = parseFloat(this.addFundsAmount)
       
       if (amount <= 0) {
         alert('Please enter a valid amount')
         return
       }
       
       // Simulate crypto payment processing
         alert('Processing crypto payment...')
         setTimeout(() => {
           this.addFundsToWallet(amount)
         }, 3000)
     },
     addFundsToWallet(amount) {
       // Add funds to wallet
       this.userStats.walletBalance += amount
       
       // Add transaction
       this.recentTransactions.unshift({
         id: Date.now(),
         type: 'deposit',
         amount: amount,
         date: new Date().toISOString().split('T')[0],
         status: 'completed'
       })
       
       // Reset form
       this.showAddFunds = false
       this.addFundsAmount = ''
       this.selectedPaymentMethod = 'crypto'
       
       alert(`Successfully added $${this.formatNumber(amount)} to your wallet!`)
     },
     
     // New investment flow methods
     proceedToPayment() {
       if (!this.selectedPlan) {
         alert('Please select a plan')
         return
       }
       this.investmentStep = 2
     },
     
     proceedToWallet() {
       this.investmentStep = 3
     },
     
     getSelectedCryptoName() {
       const crypto = this.cryptoWallets.find(w => w.symbol === this.selectedCrypto)
       return crypto ? crypto.name : 'Cryptocurrency'
     },
     
         getSelectedWalletAddress() {
      const crypto = this.cryptoWallets.find(w => w.symbol === this.selectedCrypto)
      return crypto ? crypto.address : ''
    },
    
    getSelectedWalletQR() {
      const crypto = this.cryptoWallets.find(w => w.symbol === this.selectedCrypto)
      return crypto ? crypto.qrCode : ''
    },
     
     copyWalletAddress() {
       const address = this.getSelectedWalletAddress()
       navigator.clipboard.writeText(address).then(() => {
         alert('Wallet address copied to clipboard!')
       }).catch(() => {
         // Fallback for older browsers
         const textArea = document.createElement('textarea')
         textArea.value = address
         document.body.appendChild(textArea)
         textArea.select()
         document.execCommand('copy')
         document.body.removeChild(textArea)
         alert('Wallet address copied to clipboard!')
       })
     },
     
     confirmPayment() {
       alert('Thank you! We will verify your payment and activate your investment within 1-3 confirmations.')
       this.resetInvestmentModal()
     },
     

     
     resetInvestmentModal() {
       this.showInvestmentModal = false
       this.investmentStep = 1
       this.selectedPlan = null
       this.selectedPaymentMethod = 'crypto'
       this.selectedCrypto = 'BTC'
     }
  }
}
</script>

<style scoped>
.dashboard-container {
  background: #151515;
  min-height: 100vh;
  color: #fff;
  padding: 20px;
  padding-top: 100px; /* Add top padding to account for fixed navbar */
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  border: 1px solid #333;
}

.dashboard-header h1 {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 4%;
  font-size: 2rem;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-email {
  color: #ccc;
}

.logout-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.overview-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 25px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  border-radius: 50%;
}

.card-content h3 {
  margin: 0 0 5px 0;
  color: #ccc;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.amount {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #fff;
}

.change {
  font-size: 0.9rem;
  font-weight: 600;
}

.change.positive {
  color: #4ade80;
}

.status {
  color: #ffa600;
  font-weight: 600;
}

.add-funds-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 600;
}

.actions-section {
  margin-bottom: 30px;
}

.actions-section h2 {
  margin-bottom: 20px;
  color: #ffa600;
  font-size: 1.5rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.action-btn {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border: 1px solid #333;
  color: #fff;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.action-btn:hover {
  transform: translateY(-3px);
  border-color: #eb6709;
  box-shadow: 0 10px 20px rgba(235, 103, 9, 0.2);
}

.btn-icon {
  font-size: 2rem;
}

.portfolio-section {
  margin-bottom: 30px;
}

.portfolio-section h2 {
  margin-bottom: 20px;
  color: #ffa600;
  font-size: 1.5rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.investment-item {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid #333;
  transition: transform 0.3s ease;
}

.investment-item:hover {
  transform: translateY(-5px);
}

.investment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.investment-header h3 {
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: #4ade80;
  color: #000;
}

.investment-details {
  margin-bottom: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.detail-row span:first-child {
  color: #ccc;
}

.roi.positive {
  color: #4ade80;
}

.roi.negative {
  color: #ef4444;
}

.investment-actions {
  text-align: center;
}

.view-details-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.transactions-section h2 {
  margin-bottom: 20px;
  color: #ffa600;
  font-size: 1.5rem;
}

.transactions-table {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #333;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  background: #333;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 15px 20px;
  border-bottom: 1px solid #333;
  transition: background 0.3s ease;
}

.table-row:hover {
  background: #2a2a2a;
}

.table-row:last-child {
  border-bottom: none;
}

.transaction-type {
  font-weight: 600;
  text-transform: capitalize;
}

.transaction-type.investment {
  color: #4ade80;
}

.transaction-type.withdrawal {
  color: #ef4444;
}

.transaction-type.deposit {
  color: #3b82f6;
}

.transaction-status {
  font-weight: 600;
  text-transform: capitalize;
}

.transaction-status.completed {
  color: #4ade80;
}

.transaction-status.pending {
  color: #ffa600;
}

.transaction-status.failed {
  color: #ef4444;
}

/* Modal Styles */
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

.modal {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 30px;
  max-width: 90vw;
  max-height: 90vh;
  width: 90%;
  border: 1px solid #333;
  overflow-y: auto;
  overflow-x: hidden;
}

.modal h3 {
  margin-bottom: 20px;
  color: #ffa600;
  text-align: center;
}

.investment-plans {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

.plan-option {
  background: #2a2a2a;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #333;
}

.plan-option:hover {
  border-color: #eb6709;
  transform: translateY(-2px);
}

.plan-option h4 {
  margin: 0 0 10px 0;
  color: #fff;
}

.plan-option p {
  margin: 5px 0;
  color: #ccc;
  font-size: 0.9rem;
}

.withdraw-form,
.add-funds-form {
  margin-bottom: 20px;
}

.withdraw-form label,
.add-funds-form label {
  display: block;
  margin-bottom: 8px;
  color: #ccc;
}

.withdraw-form input,
.add-funds-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 10px;
}

.available-balance {
  color: #ccc;
  font-size: 0.9rem;
  margin: 0;
}

.payment-methods {
  margin-top: 20px;
}

.payment-methods h4 {
  margin-bottom: 15px;
  color: #ccc;
}

.payment-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
}

 .payment-btn:hover {
   border-color: #eb6709;
   transform: translateY(-2px);
 }

 .payment-btn.active {
   border-color: #eb6709;
   background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
   color: #fff;
 }

 .crypto-form,
 .card-form,
 .bank-form,
 .crypto-withdrawal-form {
   margin-top: 20px;
   padding: 20px;
   background: #2a2a2a;
   border-radius: 10px;
   border: 1px solid #333;
 }

 .crypto-form h4,
 .card-form h4,
 .bank-form h4,
 .crypto-withdrawal-form h4 {
   margin-bottom: 15px;
   color: #ffa600;
 }

 .wallet-info p {
   color: #ccc;
   margin-bottom: 15px;
 }

 .connect-wallet-btn {
   background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
   color: #fff;
   border: none;
   padding: 10px 20px;
   border-radius: 8px;
   cursor: pointer;
   font-weight: 600;
 }

 .card-inputs,
 .bank-inputs {
   display: grid;
   gap: 15px;
 }

 .input-group {
   display: flex;
   flex-direction: column;
   gap: 5px;
 }

 .input-group label {
   color: #ccc;
   font-size: 0.9rem;
   font-weight: 600;
 }

 .input-group input,
 .input-group select {
   padding: 12px;
   border: 1px solid #333;
   border-radius: 8px;
   background: #1a1a1a;
   color: #fff;
   font-size: 1rem;
 }

 .input-group input:focus,
 .input-group select:focus {
   outline: none;
   border-color: #eb6709;
 }

 .input-row {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 15px;
 }

 .withdrawal-methods {
   margin-top: 20px;
 }

 .withdrawal-methods h4 {
   margin-bottom: 15px;
   color: #ccc;
 }

 .withdrawal-btn {
   display: flex;
   align-items: center;
   gap: 10px;
   width: 100%;
   padding: 15px;
   margin-bottom: 10px;
   background: #2a2a2a;
   border: 1px solid #333;
   border-radius: 10px;
   color: #fff;
   cursor: pointer;
   transition: all 0.3s ease;
   font-size: 1rem;
   font-weight: 600;
 }

 .withdrawal-btn:hover {
   border-color: #eb6709;
   transform: translateY(-2px);
 }

 .withdrawal-btn.active {
   border-color: #eb6709;
   background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
   color: #fff;
 }

 .withdrawal-btn span {
   font-size: 1.2rem;
 }

 .investment-details {
   margin-top: 20px;
   padding: 20px;
   background: #2a2a2a;
   border-radius: 10px;
   border: 1px solid #333;
 }

 .investment-details h4 {
   margin-bottom: 15px;
   color: #ffa600;
 }

 .investment-form {
   display: grid;
   gap: 20px;
 }

 .amount-info {
   color: #ccc;
   font-size: 0.9rem;
   margin-top: 5px;
 }

 .investment-summary {
   background: #1a1a1a;
   padding: 15px;
   border-radius: 8px;
   border: 1px solid #333;
 }

 .investment-summary h5 {
   color: #ffa600;
   margin-bottom: 10px;
   font-size: 1rem;
 }

 .summary-item {
   display: flex;
   justify-content: space-between;
   margin-bottom: 8px;
   font-size: 0.9rem;
 }

 .summary-item span:first-child {
   color: #ccc;
 }

 .summary-item.total {
   border-top: 1px solid #333;
   padding-top: 8px;
   margin-top: 8px;
   font-weight: 600;
   color: #fff;
 }

 .plan-option.selected {
   border-color: #eb6709;
   background: linear-gradient(135deg, #2a2a2a 0%, #333 100%);
   transform: translateY(-2px);
   box-shadow: 0 8px 16px rgba(235, 103, 9, 0.2);
 }

.payment-btn span {
  font-size: 1.2rem;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.modal-actions button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.modal-actions button:first-child {
  background: #333;
  color: #fff;
}

.modal-actions button:last-child {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.modal-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

 /* Empty State Styles */
 .empty-state {
   text-align: center;
   padding: 60px 20px;
   background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
   border-radius: 15px;
   border: 1px solid #333;
   margin: 20px 0;
 }

 .empty-icon {
   font-size: 4rem;
   margin-bottom: 20px;
   opacity: 0.7;
 }

 .empty-state h3 {
   color: #ffa600;
   font-size: 1.5rem;
   margin-bottom: 10px;
 }

 .empty-state p {
   color: #ccc;
   font-size: 1rem;
   margin-bottom: 25px;
   max-width: 400px;
   margin-left: auto;
   margin-right: auto;
 }

 .start-investing-btn {
   background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
   color: #fff;
   border: none;
   padding: 12px 24px;
   border-radius: 8px;
   cursor: pointer;
   font-weight: 600;
   font-size: 1rem;
   transition: all 0.3s ease;
 }

 .start-investing-btn:hover {
   transform: translateY(-2px);
   box-shadow: 0 8px 16px rgba(235, 103, 9, 0.3);
 }

 /* Investment Modal Styles */
 .investment-step {
   margin-bottom: 20px;
 }

 .investment-step h4 {
   color: #ffa600;
   margin-bottom: 20px;
   text-align: center;
 }

 .crypto-wallets {
   margin-top: 20px;
 }

 .crypto-options {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
   gap: 10px;
   margin-bottom: 20px;
 }

 @media (max-width: 768px) {
   .crypto-options {
     grid-template-columns: repeat(2, 1fr);
   }
   
   .modal {
     padding: 20px;
     max-width: 95vw;
     max-height: 95vh;
   }
   
   .investment-step {
     margin-bottom: 15px;
   }
   
   .wallet-address {
     flex-direction: column;
     gap: 10px;
   }
   
   .copy-btn {
     width: 100%;
   }
   
   .modal-actions {
     flex-direction: column;
     gap: 10px;
   }
   
   .modal-actions button {
     width: 100%;
     padding: 12px 20px;
   }
 }

 .crypto-option {
   background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
   border: 2px solid #333;
   border-radius: 10px;
   padding: 15px;
   cursor: pointer;
   transition: all 0.3s ease;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 8px;
 }

 .crypto-option:hover {
   border-color: #ffa600;
   transform: translateY(-2px);
 }

 .crypto-option.active {
   border-color: #ffa600;
   background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
 }

 .crypto-icon {
   font-size: 1.5rem;
 }

 .crypto-name {
   font-size: 0.9rem;
   color: #ccc;
 }

 .wallet-address-section {
   background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
   border-radius: 10px;
   padding: 20px;
   margin-top: 20px;
   border: 1px solid #333;
 }

 .wallet-address {
   display: flex;
   gap: 10px;
   margin-bottom: 20px;
 }

 .address-input {
   flex: 1;
   background: #333;
   border: 1px solid #555;
   border-radius: 8px;
   padding: 12px;
   color: #fff;
   font-family: monospace;
   font-size: 0.9rem;
 }

 .copy-btn {
   background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
   color: #fff;
   border: none;
   padding: 12px 16px;
   border-radius: 8px;
   cursor: pointer;
   font-weight: 600;
   white-space: nowrap;
 }

 .wallet-qr {
  text-align: center;
  margin-bottom: 20px;
  background: #333;
  border-radius: 10px;
  padding: 20px;
}

.qr-code-image {
  max-width: 200px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  border: 2px solid #555;
}

 .payment-instructions {
   background: #333;
   border-radius: 8px;
   padding: 15px;
   margin-top: 15px;
 }

 .payment-instructions h6 {
   color: #ffa600;
   margin-bottom: 10px;
 }

 .payment-instructions ol {
   color: #ccc;
   margin-bottom: 15px;
   padding-left: 20px;
 }

 .payment-instructions li {
   margin-bottom: 5px;
 }

 .important-note {
   background: rgba(255, 166, 0, 0.1);
   border: 1px solid #ffa600;
   border-radius: 8px;
   padding: 10px;
   color: #ffa600;
   font-size: 0.9rem;
 }

 .confirm-btn {
   background: linear-gradient(90deg, #28a745 0%, #20c997 100%) !important;
   color: #fff !important;
 }

 .payment-info {
   background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
   border-radius: 10px;
   padding: 15px;
   margin-bottom: 20px;
   border: 1px solid #333;
 }

 .payment-info h5 {
   color: #ffa600;
   margin-bottom: 10px;
 }

 .input-row {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 15px;
 }

 /* Responsive Design */
 @media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .overview-section {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .table-header span:nth-child(3),
  .table-row span:nth-child(3) {
    display: none;
  }
}
</style> 