<template>
  <section class="plans-section">
    <div class="plans-header animate-text-stagger">
      <h1 class="animate-text-slide">Investment Plans</h1>
      <p class="animate-text-slide">Choose the perfect plan to grow your wealth</p>
    </div>

    <div class="plans-grid">
      <div class="plan-card gold animate-text-fade" v-for="plan in plans" :key="plan.title">
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
          title: 'Starter Plan',
          price: '99',
          features: [
            'Minimum Investment: $1,000',
            'Maximum Investment: $5,000',
            'Duration: 30 Days',
            'ROI: 5%',
            'Capital Back: Yes',
          ],
          link: '/signup',
        },
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
  padding-top: calc(var(--spacing-xxl) + 80px); /* Add extra top padding for fixed navbar */
  text-align: center;
}

.plans-header {
  margin-bottom: var(--spacing-xxl);
}

.plans-header h1 {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
}

.plans-header p {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.plan-card {
  background: var(--bg-darker);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}

.plan-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary-orange);
  box-shadow: var(--shadow-xl);
}

.plan-card.gold {
  border-color: #ffd700;
  position: relative;
}

.plan-card.gold::before {
  content: '★ Most Popular';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: var(--spacing-xs) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.plan-header {
  margin-bottom: var(--spacing-xl);
}

.plan-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: var(--spacing-lg);
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--spacing-xs);
}

.currency {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
}

.amount {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-white);
}

.period {
  font-size: var(--font-size-base);
  color: var(--text-muted);
}

.plan-features {
  margin-bottom: var(--spacing-xl);
}

.feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  text-align: left;
}

.feature-icon {
  color: var(--primary-orange);
  font-weight: bold;
  font-size: var(--font-size-lg);
}

.feature-text {
  color: var(--text-white);
  font-size: var(--font-size-base);
}

.plan-cta {
  margin-top: auto;
}

@media (max-width: 768px) {
  .plans-section {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .plans-header h1 {
    font-size: var(--font-size-2xl);
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .plan-card {
    padding: var(--spacing-xl);
  }
}
</style>
