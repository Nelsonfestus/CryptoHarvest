<template>
  <section class="plans-section">
    <div class="plans-header animate-text-stagger">
      <h1 class="animate-text-slide">Our Investment Plans</h1>
      <p class="animate-text-slide">Choose from a variety of plans tailored to your needs and goals.</p>
    </div>

    <div class="plans-grid">
      <div 
        class="plan-card animate-text-fade" 
        :class="{ 'gold': plan.title === 'Gold Plan' }"
        v-for="plan in plans" 
        :key="plan.title"
      >
        <div class="plan-header">
          <h3 class="plan-title">{{ plan.title }}</h3>
          <div class="plan-price">
            <span class="currency">$</span>
            <span class="amount">{{ plan.price }}</span>
            <span class="period">/month</span>
          </div>
        </div>

        <div class="plan-features">
          <div class="feature" v-for="feature in plan.features" :key="feature">
            <span class="feature-icon">✓</span>
            <span class="feature-text">{{ feature }}</span>
          </div>
        </div>

        <div class="plan-cta">
          <router-link :to="plan.link" class="btn-primary">Get Started</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Plans',
  data() {
    return {
      plans: [
        {
          title: 'Silver Plan',
          price: '199',
          features: [
            'Minimum Investment: $5,000',
            'Maximum Investment: $20,000',
            'Duration: 60 Days',
            'ROI: 10%',
            'Capital Back: Yes',
          ],
          link: '/signup',
        },
        {
          title: 'Gold Plan',
          price: '299',
          features: [
            'Minimum Investment: $10,000',
            'Maximum Investment: $50,000',
            'Duration: 75 Days',
            'ROI: 15%',
            'Capital Back: Yes',
          ],
          link: '/signup',
        },
        {
          title: 'Platinum Plan',
          price: '399',
          features: [
            'Minimum Investment: $20,000',
            'Maximum Investment: Unlimited',
            'Duration: 90 Days',
            'ROI: 20%',
            'Capital Back: Yes',
          ],
          link: '/signup',
        },
      ],
    }
  },
}
</script>

<style scoped>
.plans-section {
  background: var(--bg-dark);
  color: var(--text-white);
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-top: calc(var(--spacing-xxl) + 80px);
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.plans-header {
  margin-bottom: var(--spacing-xxl);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.plans-header h1 {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
  letter-spacing: -1px;
}

.plans-header p {
  font-size: var(--font-size-xl);
  color: var(--text-muted);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xxl);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  align-items: stretch;
}

.plan-card {
  background: var(--bg-darker);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xxl);
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 550px;
  overflow: hidden;
}

.plan-card::before {
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

.plan-card:hover {
  transform: translateY(-15px);
  border-color: var(--primary-orange);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.plan-card:hover::before {
  transform: scaleX(1);
}

.plan-card.gold {
  border-color: #ffd700;
  transform: scale(1.05);
  box-shadow: 0 30px 60px rgba(255, 215, 0, 0.2);
  background: linear-gradient(135deg, var(--bg-darker) 0%, rgba(255, 215, 0, 0.05) 100%);
}

.plan-card.gold:hover {
  transform: scale(1.05) translateY(-15px);
  box-shadow: 0 40px 80px rgba(255, 215, 0, 0.3);
}

.plan-card.gold::before {
  background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
}

.plan-card.gold::after {
  content: '★ Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-xl);
  font-size: var(--font-size-sm);
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-lg);
  z-index: 10;
}

.plan-header {
  margin-bottom: var(--spacing-xxl);
  text-align: center;
  position: relative;
  z-index: 1;
}

.plan-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: var(--spacing-xl);
  letter-spacing: 0.5px;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
}

.currency {
  font-size: var(--font-size-xl);
  color: var(--text-muted);
  font-weight: 500;
}

.amount {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  color: var(--text-white);
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.period {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  font-weight: 500;
}

.plan-features {
  margin-bottom: var(--spacing-xxl);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-align: left;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all var(--transition-normal);
}

.feature:hover {
  background: rgba(235, 103, 9, 0.1);
  border-color: rgba(235, 103, 9, 0.2);
  transform: translateX(5px);
}

.feature-icon {
  color: var(--primary-orange);
  font-weight: bold;
  font-size: var(--font-size-lg);
  min-width: 24px;
  text-align: center;
  background: rgba(235, 103, 9, 0.1);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-text {
  color: var(--text-white);
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
}

.plan-cta {
  margin-top: auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.plan-cta .btn-primary {
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-xxl);
  font-size: var(--font-size-lg);
  font-weight: 600;
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  text-decoration: none;
  background: var(--primary-gradient);
  border: none;
  position: relative;
  overflow: hidden;
}

.plan-cta .btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.plan-cta .btn-primary:hover::before {
  left: 100%;
}

.plan-cta .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(235, 103, 9, 0.4);
  text-decoration: none;
}

@media (max-width: 1200px) {
  .plans-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: var(--spacing-xl);
  }
  
  .plan-card.gold {
    transform: scale(1.02);
  }
  
  .plan-card.gold:hover {
    transform: scale(1.02) translateY(-15px);
  }
}

@media (max-width: 900px) {
  .plans-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .plans-section {
    padding: var(--spacing-xl) var(--spacing-lg);
    padding-top: calc(var(--spacing-xl) + 80px);
  }

  .plans-header h1 {
    font-size: var(--font-size-3xl);
  }
  
  .plans-header p {
    font-size: var(--font-size-lg);
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    max-width: 400px;
  }

  .plan-card {
    padding: var(--spacing-xl);
    min-height: 500px;
  }
  
  .plan-card.gold {
    transform: none;
  }
  
  .plan-card.gold:hover {
    transform: translateY(-15px);
  }
  
  .amount {
    font-size: var(--font-size-4xl);
  }
  
  .feature {
    padding: var(--spacing-sm);
  }
}
</style>
