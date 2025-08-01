<template>
  <div>
    <section class="calculate-section">
      <div class="calculate-container">
        <!-- Header -->
        <div class="calculate-header animate-text-stagger">
          <h2 class="animate-text-slide">Investment Calculator</h2>
          <p class="animate-text-slide">Calculate your potential returns with our investment plans</p>
        </div>

        <!-- Calculator Form -->
        <div class="calculator-form animate-text-fade">
          <!-- Investment Amount -->
          <div class="form-group">
            <label for="amount">Investment Amount ($)</label>
            <input 
              type="number" 
              id="amount"
              v-model="investmentAmount" 
              placeholder="Enter amount (e.g., 5000)" 
              min="1000"
              @input="calculateReturns"
            />
          </div>

          <!-- Investment Plan -->
          <div class="form-group">
            <label for="plan">Investment Plan</label>
            <div class="dropdown-menu custom-plan-dropdown">
              <div class="dropdown-selected" @click="togglePlanDropdown">
                {{ selectedPlan || 'Select Investment Plan' }}
                <span class="dropdown-arrow">&#9662;</span>
              </div>
              <ul v-show="planDropdownOpen" class="dropdown-list">
                <li
                  v-for="plan in investmentPlans"
                  :key="plan.name"
                  @click="selectPlan(plan)"
                  :class="{ active: selectedPlan === plan.name }"
                >
                  {{ plan.name }} ({{ plan.roi }}% ROI)
                </li>
              </ul>
            </div>
          </div>

          <!-- Investment Duration -->
          <div class="form-group">
            <label for="duration">Investment Duration</label>
            <div class="duration-input">
              <input 
                type="number" 
                id="duration"
                v-model="investmentDuration" 
                placeholder="Days" 
                min="30"
                max="365"
                @input="calculateReturns"
              />
              <span class="duration-label">days</span>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="showResults" class="results-section animate-text-fade">
          <div class="results-header">
            <h3>Investment Summary</h3>
          </div>
          
          <div class="results-grid">
            <div class="result-card">
              <div class="result-icon">💰</div>
              <div class="result-content">
                <h4>Initial Investment</h4>
                <p class="result-value">${{ formatNumber(investmentAmount) }}</p>
              </div>
            </div>

            <div class="result-card">
              <div class="result-icon">📈</div>
              <div class="result-content">
                <h4>Expected ROI</h4>
                <p class="result-value">{{ selectedPlanData.roi }}%</p>
              </div>
            </div>

            <div class="result-card">
              <div class="result-icon">⏱️</div>
              <div class="result-content">
                <h4>Duration</h4>
                <p class="result-value">{{ investmentDuration }} days</p>
              </div>
            </div>

            <div class="result-card highlight">
              <div class="result-icon">🎯</div>
              <div class="result-content">
                <h4>Expected Return</h4>
                <p class="result-value">${{ formatNumber(expectedReturn) }}</p>
              </div>
            </div>

            <div class="result-card highlight">
              <div class="result-icon">💎</div>
              <div class="result-content">
                <h4>Total Value</h4>
                <p class="result-value">${{ formatNumber(totalValue) }}</p>
              </div>
            </div>

            <div class="result-card">
              <div class="result-icon">📊</div>
              <div class="result-content">
                <h4>Profit</h4>
                <p class="result-value profit">+${{ formatNumber(profit) }}</p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button @click="resetCalculator" class="btn-secondary">Reset Calculator</button>
            <router-link to="/signup" class="btn-primary">Start Investing</router-link>
          </div>
        </div>

        <!-- Calculator Image -->
        <div class="calculator-image animate-text-fade">
          <img src="../assets/calculator.png" alt="Investment Calculator" />
        </div>
      </div>
    </section>

    <!-- Track Section -->
    <Track />
  </div>
</template>

<script>
import Track from './Track.vue'

export default {
  name: 'Calculate',
  components: { Track },
  data() {
    return {
      investmentAmount: '',
      selectedPlan: '',
      investmentDuration: 60,
      planDropdownOpen: false,
      investmentPlans: [
        { name: 'Silver Plan', roi: 10, minInvestment: 5000, maxInvestment: 20000 },
        { name: 'Gold Plan', roi: 15, minInvestment: 10000, maxInvestment: 50000 },
        { name: 'Platinum Plan', roi: 20, minInvestment: 20000, maxInvestment: 999999 }
      ],
      expectedReturn: 0,
      totalValue: 0,
      profit: 0,
      showResults: false
    }
  },
  computed: {
    selectedPlanData() {
      return this.investmentPlans.find(plan => plan.name === this.selectedPlan) || {}
    }
  },
  methods: {
    togglePlanDropdown() {
      this.planDropdownOpen = !this.planDropdownOpen
    },
    selectPlan(plan) {
      this.selectedPlan = plan.name
      this.planDropdownOpen = false
      this.calculateReturns()
    },
    calculateReturns() {
      if (!this.investmentAmount || !this.selectedPlan || !this.investmentDuration) {
        this.showResults = false
        return
      }

      const amount = parseFloat(this.investmentAmount)
      const roi = this.selectedPlanData.roi || 0
      const duration = parseInt(this.investmentDuration)

      // Calculate returns based on duration and ROI
      const dailyROI = roi / 365
      const totalROI = (dailyROI * duration) / 100
      
      this.expectedReturn = amount * totalROI
      this.totalValue = amount + this.expectedReturn
      this.profit = this.expectedReturn
      this.showResults = true
    },
    formatNumber(num) {
      return new Intl.NumberFormat('en-US').format(Math.round(num))
    },
    resetCalculator() {
      this.investmentAmount = ''
      this.selectedPlan = ''
      this.investmentDuration = 60
      this.showResults = false
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-plan-dropdown')) {
        this.planDropdownOpen = false
      }
    })
  }
}
</script>

<style scoped>
.calculate-section {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  padding: 40px 60px 120px;
  display: flex;
  justify-content: space-between;
}

.calculate-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.calculate-header {
  text-align: center;
  margin-bottom: 40px;
}

.calculate-header h2 {
  font-size: 48px;
  color: #fff;
  margin-bottom: 10px;
}

.calculate-header p {
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
}

.calculator-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 18px;
  color: #fff;
  margin-bottom: 10px;
  font-weight: bold;
}

.form-group input {
  padding: 15px 10px;
  background: #202020;
  color: #888;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 18px;
  width: 100%;
}

.duration-input {
  display: flex;
  align-items: center;
  background: #202020;
  border-radius: 12px;
  overflow: hidden;
}

.duration-input input {
  flex: 1;
  padding: 15px 10px;
  background: none;
  border: none;
  outline: none;
  font-size: 18px;
  color: #888;
}

.duration-label {
  padding: 15px 10px;
  background: #eb6709;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 0 12px 12px 0;
  border-left: 1px solid #eb6709;
}

.results-section {
  background: #181818;
  border-radius: 20px;
  padding: 30px;
  margin-top: 40px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.results-header h3 {
  font-size: 28px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.result-card {
  background: #202020;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-card .result-icon {
  font-size: 36px;
  color: #eb6709;
}

.result-card .result-content h4 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 5px;
}

.result-card .result-value {
  font-size: 24px;
  font-weight: bold;
  color: #eb6709;
}

.result-card.highlight {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.result-card.highlight .result-value {
  color: #fff;
}

.result-card.highlight .result-icon {
  color: #fff;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;
}

.btn-secondary,
.btn-primary {
  padding: 12px 25px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary {
  background: #202020;
  color: #888;
  border: 1px solid #888;
}

.btn-secondary:hover {
  background: #333;
  color: #fff;
  border-color: #fff;
}

.btn-primary {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  transform: translateY(-2px);
}

.calculator-image {
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  text-align: center;
}

.calculator-image img {
  width: 60%;
  height: auto;
}

/* .dropdown-menu select {
    background: #181818;
    color: #888;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    transition:
        background 0.3s,
        color 0.3s,
        box-shadow 0.3s;
    cursor: pointer;
} */

/* Style dropdown options with hover effect using ::v-deep for Vue scoped CSS */
:deep(.dropdown-menu select option:hover),
:deep(.dropdown-menu select option:focus) {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.custom-plan-dropdown {
  position: relative;
  min-width: 150px;
}

.dropdown-selected {
  background: #202020;
  color: #888;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  transition:
    background 0.3s,
    color 0.3s;
}

.dropdown-arrow {
  margin-left: 10px;
  font-size: 12px;
}

.dropdown-list {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #181818;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-list li {
  padding: 10px 16px;
  color: #888;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
  font-size: 14px;
}

.dropdown-list li:hover,
.dropdown-list li.active {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

/* Media Responsiveness */
@media (max-width: 768px) {
  .calculate-section {
    padding: 20px 16px;
    flex-direction: column;
    gap: 20px;
  }

  .calculate-container {
    padding: 0 10px;
  }

  .calculate-header h2 {
    font-size: 36px;
  }

  .calculate-header p {
    font-size: 16px;
  }

  .calculator-form {
    grid-template-columns: 1fr;
  }

  .results-section {
    padding: 20px;
  }

  .results-header h3 {
    font-size: 24px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    text-align: center;
  }

  .calculator-image {
    max-width: 300px;
  }
}
</style>
