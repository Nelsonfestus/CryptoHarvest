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
        <button class="action-btn wallet-btn" @click="connectWallet">
          <span class="btn-icon">🔗</span>
          Connect Wallet
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
      <div class="portfolio-grid">
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
      <div class="transactions-table">
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
            @click="selectPlan(plan)"
          >
            <h4>{{ plan.name }}</h4>
            <p>Min: ${{ formatNumber(plan.minAmount) }}</p>
            <p>ROI: {{ plan.roi }}%</p>
            <p>Duration: {{ plan.duration }} days</p>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showInvestmentModal = false">Cancel</button>
          <button @click="createInvestment" :disabled="!selectedPlan">Invest Now</button>
        </div>
      </div>
    </div>

    <div v-if="showWithdrawModal" class="modal-overlay" @click="showWithdrawModal = false">
      <div class="modal" @click.stop>
        <h3>Withdraw Funds</h3>
        <div class="withdraw-form">
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
        <div class="modal-actions">
          <button @click="showWithdrawModal = false">Cancel</button>
          <button @click="processWithdrawal" :disabled="!withdrawAmount">Withdraw</button>
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
            <button class="payment-btn crypto" @click="payWithCrypto">
              <span>🔗</span> Crypto Wallet
            </button>
            <button class="payment-btn card" @click="payWithCard">
              <span>💳</span> Credit/Debit Card
            </button>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showAddFunds = false">Cancel</button>
          <button @click="processAddFunds" :disabled="!addFundsAmount">Add Funds</button>
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
        totalInvested: 25000,
        currentValue: 28750,
        totalGrowth: 15.0,
        totalProfit: 3750,
        activeInvestments: 3,
        walletBalance: 5000
      },
      userInvestments: [
        {
          id: 1,
          planName: 'Gold Plan',
          amount: 15000,
          currentValue: 17250,
          roi: 15.0,
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-02-15'
        },
        {
          id: 2,
          planName: 'Silver Plan',
          amount: 8000,
          currentValue: 8800,
          roi: 10.0,
          status: 'active',
          startDate: '2024-01-20',
          endDate: '2024-03-20'
        },
        {
          id: 3,
          planName: 'Platinum Plan',
          amount: 2000,
          currentValue: 2700,
          roi: 35.0,
          status: 'active',
          startDate: '2024-01-10',
          endDate: '2024-04-10'
        }
      ],
      recentTransactions: [
        {
          id: 1,
          type: 'investment',
          amount: 15000,
          date: '2024-01-15',
          status: 'completed'
        },
        {
          id: 2,
          type: 'withdrawal',
          amount: 2500,
          date: '2024-01-10',
          status: 'completed'
        },
        {
          id: 3,
          type: 'deposit',
          amount: 5000,
          date: '2024-01-05',
          status: 'completed'
        }
      ],
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
      addFundsAmount: ''
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString()
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    logout() {
      // Handle logout logic
      this.$router.push('/login')
    },
    connectWallet() {
      // Handle wallet connection
      console.log('Connecting wallet...')
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
      // Handle investment creation
      console.log('Creating investment with plan:', this.selectedPlan)
      this.showInvestmentModal = false
      this.selectedPlan = null
    },
    processWithdrawal() {
      // Handle withdrawal
      console.log('Processing withdrawal:', this.withdrawAmount)
      this.showWithdrawModal = false
      this.withdrawAmount = ''
    },
    payWithCrypto() {
      // Handle crypto payment
      console.log('Paying with crypto...')
    },
    payWithCard() {
      // Handle card payment
      console.log('Paying with card...')
    },
    processAddFunds() {
      // Handle adding funds
      console.log('Adding funds:', this.addFundsAmount)
      this.showAddFunds = false
      this.addFundsAmount = ''
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