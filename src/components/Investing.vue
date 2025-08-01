<template>
  <div class="investing-container">
    <!-- investing-section -->
    <div class="investing-section">
      <div class="investing-header animate-text-stagger">
        <h1 class="animate-text-slide">Start Investing with CryptoHarvest</h1>
        <p class="animate-text-slide">
          Your journey to financial growth starts here. Follow these simple steps to begin your investment adventure.
        </p>
        <div class="header-decoration animate-text-fade">
          <div class="decoration-line"></div>
          <div class="decoration-icon">🚀</div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- investing-cards-->
      <div class="investing-cards">
        <div v-for="(card, idx) in cards" :key="idx" class="investing-card animate-text-fade">
          <div class="card-number">
            <span>{{ idx + 1 }}</span>
            <div class="number-glow"></div>
          </div>
          <!-- card-text -->
          <div class="card-text">
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
          <div class="card-icon">
            {{ card.icon }}
          </div>
          <div v-if="idx < cards.length - 1" class="card-divider">
            <div class="divider-line"></div>
            <div class="divider-arrow">→</div>
            <div class="divider-line"></div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section animate-text-fade">
        <div class="cta-content">
          <h2>Ready to Begin Your Investment Journey?</h2>
          <p>Join thousands of investors who are already growing their wealth with CryptoHarvest</p>
          <div class="cta-buttons">
            <router-link to="/signup" class="btn-primary">Get Started Now</router-link>
            <router-link to="/investment-plans" class="btn-secondary">View Plans</router-link>
          </div>
        </div>
      </div>
    </div>
    <Questions />
    <Customer />
  </div>
</template>

<script>
import Customer from './Customer.vue'
import Questions from './Questions.vue'

export default {
  name: 'Investing',
  components: {
    Customer,
    Questions,
  },
  data() {
    return {
      cards: [
        {
          title: 'Create an Account',
          text: `Get started on your investment journey by signing up for an account in just a few simple steps. Provide your details, verify your identity, and unlock access to a world of investment opportunities.`,
          icon: '👤'
        },
        {
          title: 'Fund Your Account',
          text: `Easily deposit funds using a variety of secure payment methods. Your money is protected with industry-leading security protocols, ensuring a safe and seamless funding experience.`,
          icon: '💰'
        },
        {
          title: 'Start Investing',
          text: `Explore a wide range of investment options tailored to your goals. Track your progress, manage your portfolio, and watch your wealth grow with our intuitive tools and expert support.`,
          icon: '📈'
        },
      ],
    }
  },
}
</script>

<style scoped>
.investing-container {
  width: 100%;
}

.investing-section {
  background: var(--bg-dark);
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-top: calc(var(--spacing-xxl) + 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.investing-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
  max-width: 900px;
}

.investing-header h1 {
  color: var(--text-white);
  font-size: var(--font-size-5xl);
  font-weight: 800;
  margin-bottom: var(--spacing-lg);
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.investing-header p {
  color: var(--text-muted);
  font-size: var(--font-size-xl);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 400;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-xl);
  position: relative;
}

.decoration-line {
  height: 3px;
  width: 120px;
  background: var(--primary-gradient);
  border-radius: 2px;
  box-shadow: 0 4px 12px rgba(235, 103, 9, 0.4);
}

.decoration-icon {
  font-size: var(--font-size-3xl);
  color: var(--primary-orange);
  margin: 0 var(--spacing-lg);
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.investing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: var(--spacing-xxl);
  max-width: 1400px;
  width: 100%;
  position: relative;
  margin-bottom: var(--spacing-xxl);
}

.investing-card {
  background: var(--bg-darker);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  padding: var(--spacing-xxl) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  position: relative;
  min-height: 400px;
  overflow: hidden;
}

.investing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-gradient);
  transform: scaleX(0);
  transition: transform var(--transition-normal);
}

.investing-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  border-color: var(--primary-orange);
}

.investing-card:hover::before {
  transform: scaleX(1);
}

.card-number {
  background: var(--primary-gradient);
  color: var(--text-white);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-3xl);
  font-weight: 800;
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 1;
}

.number-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--primary-orange);
  opacity: 0.3;
  filter: blur(8px);
  z-index: -1;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.card-text h3 {
  color: var(--text-gold);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  letter-spacing: 0.5px;
}

.card-text p {
  color: var(--text-white);
  font-size: var(--font-size-lg);
  line-height: 1.7;
  font-weight: 400;
}

.card-icon {
  font-size: var(--font-size-4xl);
  color: var(--primary-orange);
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.card-divider {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-top: var(--spacing-xl);
  position: relative;
}

.divider-line {
  height: 3px;
  width: 100px;
  background: var(--primary-gradient);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(235, 103, 9, 0.3);
}

.divider-arrow {
  font-size: var(--font-size-2xl);
  color: var(--primary-orange);
  font-weight: 800;
  z-index: 1;
  animation: slide 2s ease-in-out infinite;
}

@keyframes slide {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

/* Call to Action Section */
.cta-section {
  background: var(--bg-darker);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xxl);
  margin-top: var(--spacing-xxl);
  width: 100%;
  max-width: 1000px;
  text-align: center;
  border: 2px solid transparent;
  background: linear-gradient(135deg, var(--bg-darker) 0%, rgba(235, 103, 9, 0.1) 100%);
  box-shadow: var(--shadow-xl);
}

.cta-content h2 {
  color: var(--text-white);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-content p {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: var(--spacing-lg) var(--spacing-xxl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-normal);
  display: inline-block;
  min-width: 180px;
}

.btn-primary {
  background: var(--primary-gradient);
  color: var(--text-white);
  border: none;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(235, 103, 9, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-white);
  border: 2px solid var(--primary-orange);
}

.btn-secondary:hover {
  background: var(--primary-orange);
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(235, 103, 9, 0.3);
}

@media (max-width: 1200px) {
  .investing-cards {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
  }
  
  .divider-line {
    width: 80px;
  }
}

@media (max-width: 900px) {
  .investing-cards {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    max-width: 500px;
  }

  .card-divider {
    display: none;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 600px) {
  .investing-section {
    padding: var(--spacing-xl) var(--spacing-lg);
    padding-top: calc(var(--spacing-xl) + 80px);
  }

  .investing-header h1 {
    font-size: var(--font-size-3xl);
  }

  .investing-header p {
    font-size: var(--font-size-base);
  }
  
  .decoration-line {
    width: 80px;
  }

  .investing-card {
    padding: var(--spacing-xl) var(--spacing-lg);
    min-height: 350px;
  }

  .card-number {
    width: 60px;
    height: 60px;
    font-size: var(--font-size-2xl);
  }

  .card-text h3 {
    font-size: var(--font-size-xl);
  }

  .card-text p {
    font-size: var(--font-size-base);
  }
  
  .card-icon {
    font-size: var(--font-size-3xl);
  }
  
  .cta-section {
    padding: var(--spacing-xl);
  }
  
  .cta-content h2 {
    font-size: var(--font-size-2xl);
  }
  
  .cta-content p {
    font-size: var(--font-size-base);
  }
}
</style>
