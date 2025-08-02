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
          <button class="add-funds-btn" @click="showAddFunds = true">Add Funds</button>
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
        <button class="action-btn wallet-btn" @click="goToCryptoWallet">
          <span class="btn-icon">🔗</span>
          Crypto Wallet
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
         <div class="investment-plans">
           <div 
             v-for="plan in investmentPlans" 
             :key="plan.id"
             class="plan-option"
             :class="{ selected: selectedPlan && selectedPlan.id === plan.id }"
             @click="selectPlan(plan)"
           >
             <h4>{{ plan.name }}</h4>
             <p>Min: ${{ formatNumber(plan.minAmount) }}</p>
             <p>Max: ${{ formatNumber(plan.maxAmount || 'Unlimited') }}</p>
             <p>ROI: {{ plan.roi }}%</p>
             <p>Duration: {{ plan.duration }} days</p>
           </div>
         </div>
         
         <div v-if="selectedPlan" class="investment-details">
           <h4>Investment Details</h4>
           <div class="investment-form">
             <div class="input-group">
               <label>Investment Amount:</label>
               <input 
                 v-model="investmentAmount" 
                 type="number" 
                 :placeholder="`Min: $${formatNumber(selectedPlan.minAmount)}`"
                 :min="selectedPlan.minAmount"
                 :max="selectedPlan.maxAmount || 999999"
               />
               <p class="amount-info">
                 Available Balance: ${{ formatNumber(userStats.walletBalance) }}
               </p>
             </div>
             <div class="investment-summary">
               <h5>Investment Summary:</h5>
               <div class="summary-item">
                 <span>Plan:</span>
                 <span>{{ selectedPlan.name }}</span>
               </div>
               <div class="summary-item">
                 <span>Amount:</span>
                 <span>${{ formatNumber(investmentAmount || 0) }}</span>
               </div>
               <div class="summary-item">
                 <span>Expected ROI:</span>
                 <span>{{ selectedPlan.roi }}%</span>
               </div>
               <div class="summary-item">
                 <span>Duration:</span>
                 <span>{{ selectedPlan.duration }} days</span>
               </div>
               <div class="summary-item total">
                 <span>Expected Return:</span>
                 <span>${{ formatNumber((investmentAmount || 0) * (1 + selectedPlan.roi / 100)) }}</span>
               </div>
             </div>
           </div>
         </div>
         
         <div class="modal-actions">
           <button @click="showInvestmentModal = false">Cancel</button>
           <button 
             @click="createInvestment" 
             :disabled="!selectedPlan || !investmentAmount || investmentAmount < selectedPlan.minAmount"
           >
             Invest Now
           </button>
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
             <button 
               class="withdrawal-btn bank" 
               :class="{ active: selectedWithdrawalMethod === 'bank' }"
               @click="selectedWithdrawalMethod = 'bank'"
             >
               <span>🏦</span> Bank Transfer
             </button>
             <button 
               class="withdrawal-btn crypto" 
               :class="{ active: selectedWithdrawalMethod === 'crypto' }"
               @click="selectedWithdrawalMethod = 'crypto'"
             >
               <span>🔗</span> Crypto Wallet
             </button>
           </div>
           
           <!-- Bank Transfer Form -->
           <div v-if="selectedWithdrawalMethod === 'bank'" class="bank-form">
             <h4>Bank Account Details</h4>
             <div class="bank-inputs">
               <div class="input-group">
                 <label>Account Holder Name:</label>
                 <input 
                   v-model="bankDetails.name" 
                   type="text" 
                   placeholder="John Doe"
                 />
               </div>
               <div class="input-group">
                 <label>Bank Name:</label>
                 <input 
                   v-model="bankDetails.bankName" 
                   type="text" 
                   placeholder="Bank of America"
                 />
               </div>
               <div class="input-group">
                 <label>Account Number:</label>
                 <input 
                   v-model="bankDetails.accountNumber" 
                   type="text" 
                   placeholder="1234567890"
                 />
               </div>
               <div class="input-group">
                 <label>Routing Number:</label>
                 <input 
                   v-model="bankDetails.routingNumber" 
                   type="text" 
                   placeholder="021000021"
                 />
               </div>
             </div>
           </div>
           
           <!-- Crypto Withdrawal Form -->
           <div v-if="selectedWithdrawalMethod === 'crypto'" class="crypto-withdrawal-form">
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
                 <option value="ETH">Ethereum (ETH)</option>
                 <option value="USDT">Tether (USDT)</option>
                 <option value="USDC">USD Coin (USDC)</option>
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
             <button 
               class="payment-btn crypto" 
               :class="{ active: selectedPaymentMethod === 'crypto' }"
               @click="selectedPaymentMethod = 'crypto'"
             >
               <span>🔗</span> Crypto Wallet
             </button>
             <button 
               class="payment-btn card" 
               :class="{ active: selectedPaymentMethod === 'card' }"
               @click="selectedPaymentMethod = 'card'"
             >
               <span>💳</span> Credit/Debit Card
             </button>
           </div>
           
           <!-- Crypto Payment Form -->
           <div v-if="selectedPaymentMethod === 'crypto'" class="crypto-form">
             <h4>Crypto Wallet Payment</h4>
             <div class="wallet-info">
               <p>Connect your crypto wallet to proceed with payment</p>
               <button class="connect-wallet-btn" @click="connectCryptoWallet">
                 Connect Wallet
               </button>
             </div>
           </div>
           
           <!-- Card Payment Form -->
           <div v-if="selectedPaymentMethod === 'card'" class="card-form">
             <h4>Card Details</h4>
             <div class="card-inputs">
               <div class="input-group">
                 <label>Card Number:</label>
                 <input 
                   v-model="cardDetails.number" 
                   type="text" 
                   placeholder="1234 5678 9012 3456"
                   maxlength="19"
                   @input="formatCardNumber"
                 />
               </div>
               <div class="input-row">
                 <div class="input-group">
                   <label>Expiry Date:</label>
                   <input 
                     v-model="cardDetails.expiry" 
                     type="text" 
                     placeholder="MM/YY"
                     maxlength="5"
                     @input="formatExpiry"
                   />
                 </div>
                 <div class="input-group">
                   <label>CVV:</label>
                   <input 
                     v-model="cardDetails.cvv" 
                     type="text" 
                     placeholder="123"
                     maxlength="4"
                   />
                 </div>
               </div>
               <div class="input-group">
                 <label>Cardholder Name:</label>
                 <input 
                   v-model="cardDetails.name" 
                   type="text" 
                   placeholder="John Doe"
                 />
               </div>
               <div class="input-group">
                 <label>Billing Address:</label>
                 <input 
                   v-model="cardDetails.address" 
                   type="text" 
                   placeholder="123 Main St, City, State"
                 />
               </div>
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
          name: 'Gold Plan',
          minAmount: 1500,
          roi: 5,
          duration: 30
        },
        {
          id: 2,
          name: 'Silver Plan',
          minAmount: 5000,
          roi: 10,
          duration: 60
        },
        {
          id: 3,
          name: 'Platinum Plan',
          minAmount: 20000,
          roi: 20,
          duration: 90
        }
      ],
             showInvestmentModal: false,
       showWithdrawModal: false,
       showAddFunds: false,
       selectedPlan: null,
       withdrawAmount: '',
       addFundsAmount: '',
       investmentAmount: '',
       selectedPaymentMethod: '',
       selectedWithdrawalMethod: '',
       cardDetails: {
         number: '',
         expiry: '',
         cvv: '',
         name: '',
         address: ''
       },
       bankDetails: {
         name: '',
         bankName: '',
         accountNumber: '',
         routingNumber: ''
       },
       cryptoWithdrawalAddress: '',
       selectedCrypto: 'BTC'
    }
  },
     computed: {
     isPaymentFormValid() {
       if (this.selectedPaymentMethod === 'card') {
         return this.cardDetails.number && 
                this.cardDetails.expiry && 
                this.cardDetails.cvv && 
                this.cardDetails.name && 
                this.cardDetails.address
       }
       return this.selectedPaymentMethod === 'crypto'
     },
     isWithdrawalFormValid() {
       if (this.selectedWithdrawalMethod === 'bank') {
         return this.bankDetails.name && 
                this.bankDetails.bankName && 
                this.bankDetails.accountNumber && 
                this.bankDetails.routingNumber
       }
       return this.selectedWithdrawalMethod === 'crypto' && this.cryptoWithdrawalAddress
     }
   },
   mounted() {
     this.loadUserData()
   },
  methods: {
    loadUserData() {
      // Load user data from localStorage
      const storedUser = localStorage.getItem('cryptoharvest_user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
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
      localStorage.removeItem('cryptoharvest_isAuthenticated')
      localStorage.removeItem('cryptoharvest_user')
      
      // Redirect to login page
      this.$router.push('/login')
    },
    goToCryptoWallet() {
      this.$router.push('/crypto-wallet')
    },
    openChat() {
      // Open chat support
      console.log('Opening chat...')
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
       this.selectedWithdrawalMethod = ''
       this.bankDetails = { name: '', bankName: '', accountNumber: '', routingNumber: '' }
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
     formatCardNumber(event) {
       let value = event.target.value.replace(/\D/g, '')
       value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
       this.cardDetails.number = value
     },
     formatExpiry(event) {
       let value = event.target.value.replace(/\D/g, '')
       if (value.length >= 2) {
         value = value.slice(0, 2) + '/' + value.slice(2)
       }
       this.cardDetails.expiry = value
     },
     processAddFunds() {
       if (!this.addFundsAmount || !this.selectedPaymentMethod) return
       
       const amount = parseFloat(this.addFundsAmount)
       
       if (amount <= 0) {
         alert('Please enter a valid amount')
         return
       }
       
       // Simulate payment processing
       if (this.selectedPaymentMethod === 'card') {
         // Simulate card payment
         alert('Processing card payment...')
         setTimeout(() => {
           this.addFundsToWallet(amount)
         }, 2000)
       } else if (this.selectedPaymentMethod === 'crypto') {
         // Simulate crypto payment
         alert('Processing crypto payment...')
         setTimeout(() => {
           this.addFundsToWallet(amount)
         }, 3000)
       }
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
       this.selectedPaymentMethod = ''
       this.cardDetails = { number: '', expiry: '', cvv: '', name: '', address: '' }
       
       alert(`Successfully added $${this.formatNumber(amount)} to your wallet!`)
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
  max-width: 500px;
  width: 90%;
  border: 1px solid #333;
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