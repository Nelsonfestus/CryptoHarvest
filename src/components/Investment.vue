<template>
  <div>
    <section class="investment-section">
      <div class="investment-header">
        <h2>Our Investment Plans</h2>
        <p>Choose from a variety of plans tailored to your needs and goals.</p>
      </div>
      
      <div class="investment-cards">
        <!-- Silver Plan -->
        <div class="investment-card silver">
          <div class="plan-header">
            <div class="plan-icon">🥈</div>
            <h3>Silver Plan</h3>
            <div class="plan-price">
              <span class="currency">$</span>
              <span class="amount">199</span>
              <span class="period">/month</span>
            </div>
          </div>
          
          <div class="plan-features">
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Minimum Investment: $5,000</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Maximum Investment: $20,000</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Duration: 60 Days</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">ROI: 10%</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Capital Back: Yes</span>
            </div>
          </div>
          
          <div class="plan-actions">
            <button @click="goToSignup" class="btn-primary">Invest Now</button>
            <button @click="goToCryptoWallet" class="btn-secondary">Crypto Wallet</button>
          </div>
        </div>

        <!-- Gold Plan -->
        <div class="investment-card gold">
          <div class="popular-badge">★ Most Popular</div>
          <div class="plan-header">
            <div class="plan-icon">🥇</div>
            <h3>Gold Plan</h3>
            <div class="plan-price">
              <span class="currency">$</span>
              <span class="amount">299</span>
              <span class="period">/month</span>
            </div>
          </div>
          
          <div class="plan-features">
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Minimum Investment: $10,000</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Maximum Investment: $50,000</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Duration: 75 Days</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">ROI: 15%</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Capital Back: Yes</span>
            </div>
          </div>
          
          <div class="plan-actions">
            <button @click="goToSignup" class="btn-primary">Invest Now</button>
            <button @click="goToCryptoWallet" class="btn-secondary">Crypto Wallet</button>
          </div>
        </div>

        <!-- Platinum Plan -->
        <div class="investment-card platinum">
          <div class="plan-header">
            <div class="plan-icon">💎</div>
            <h3>Platinum Plan</h3>
            <div class="plan-price">
              <span class="currency">$</span>
              <span class="amount">399</span>
              <span class="period">/month</span>
            </div>
          </div>
          
          <div class="plan-features">
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Minimum Investment: $20,000</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Maximum Investment: Unlimited</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Duration: 90 Days</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">ROI: 20%</span>
            </div>
            <div class="feature">
              <span class="feature-icon">✓</span>
              <span class="feature-text">Capital Back: Yes</span>
            </div>
          </div>
          
          <div class="plan-actions">
            <button @click="goToSignup" class="btn-primary">Invest Now</button>
            <button @click="goToCryptoWallet" class="btn-secondary">Crypto Wallet</button>
          </div>
        </div>
      </div>
    </section>
    <Calculate />
  </div>
</template>

<script>
import Calculate from './Calculate.vue'
export default {
  name: 'Investment',
  components: {
    Calculate,
  },
  methods: {
    goToSignup() {
      this.$router.push('/signup')
    },
    goToCryptoWallet() {
      this.$router.push('/crypto-wallet')
    },
  },
}
</script>

<style scoped>
.investment-section {
  width: 100%;
  padding: 60px 40px;
  background: var(--bg-dark);
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.investment-header {
  margin-bottom: 50px;
}

.investment-header h2 {
  font-size: 3rem;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  letter-spacing: -1px;
}

.investment-header p {
  color: var(--text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.investment-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  align-items: stretch;
}

.investment-card {
  background: var(--bg-darker);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: var(--text-white);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  min-height: 500px;
  overflow: hidden;
}

.investment-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.investment-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-orange);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.investment-card:hover::before {
  transform: scaleX(1);
}

.investment-card.gold {
  border-color: #ffd700;
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(255, 215, 0, 0.2);
  background: linear-gradient(135deg, var(--bg-darker) 0%, rgba(255, 215, 0, 0.05) 100%);
}

.investment-card.gold:hover {
  transform: scale(1.05) translateY(-10px);
  box-shadow: 0 25px 50px rgba(255, 215, 0, 0.3);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 5px 15px rgba(235, 103, 9, 0.3);
  z-index: 10;
}

.plan-header {
  margin-bottom: 30px;
  text-align: center;
}

.plan-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  display: block;
}

.plan-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: 15px;
  letter-spacing: 0.5px;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 5px;
}

.currency {
  font-size: 1.2rem;
  color: var(--text-muted);
  font-weight: 500;
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-white);
  line-height: 1;
}

.period {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.plan-features {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.feature:hover {
  background: rgba(235, 103, 9, 0.1);
  border-color: rgba(235, 103, 9, 0.2);
  transform: translateX(5px);
}

.feature-icon {
  color: var(--primary-orange);
  font-weight: bold;
  font-size: 1.1rem;
  background: rgba(235, 103, 9, 0.1);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-text {
  color: var(--text-white);
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  flex: 1;
}

.plan-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary {
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(235, 103, 9, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--text-white);
  border: 2px solid var(--primary-orange);
  border-radius: 12px;
  padding: 13px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-secondary:hover {
  background: var(--primary-orange);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(235, 103, 9, 0.3);
}

@media (max-width: 1200px) {
  .investment-cards {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
  }
  
  .investment-card.gold {
    transform: scale(1.02);
  }
  
  .investment-card.gold:hover {
    transform: scale(1.02) translateY(-10px);
  }
}

@media (max-width: 900px) {
  .investment-cards {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .investment-section {
    padding: 40px 20px;
  }

  .investment-header h2 {
    font-size: 2.5rem;
  }
  
  .investment-header p {
    font-size: 1.1rem;
  }

  .investment-cards {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .investment-card {
    padding: 30px 25px;
    min-height: 450px;
  }
  
  .investment-card.gold {
    transform: none;
  }
  
  .investment-card.gold:hover {
    transform: translateY(-10px);
  }
  
  .amount {
    font-size: 2rem;
  }
  
  .plan-icon {
    font-size: 2.5rem;
  }
}
</style>
