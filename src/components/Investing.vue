<template>
  <div class="investing-container">
    <!-- investing-section -->
    <div class="investing-section animate-fade-slide">
      <h1>Start investing with CryptoHarvest investment</h1>

      <!-- investing-cards-->
      <div class="investing-cards">
        <div v-for="(card, idx) in cards" :key="idx" class="investing-card animate-fade-slide">
          <h2>{{ idx + 1 }}</h2>
          <!-- card-text -->
          <div class="card-text">
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
          <div v-if="idx < cards.length - 1" class="card-divider"></div>
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
          title: 'Create an account',
          text: `Get started on your investment journey by signing up for an account in just a few simple steps. Provide your details, verify your identity, and unlock access to a world of investment opportunities. With our secure and user-friendly platform, you're just moments away from growing your wealth with confidence.`,
        },
        {
          title: 'Fund your account',
          text: `Easily deposit funds using a variety of secure payment methods. Your money is protected with industry-leading security protocols, ensuring a safe and seamless funding experience.`,
        },
        {
          title: 'Start investing',
          text: `Explore a wide range of investment options tailored to your goals. Track your progress, manage your portfolio, and watch your wealth grow with our intuitive tools and expert support.`,
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.investing-section h1 {
  color: var(--primary-orange);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.5px;
}

.investing-cards {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xl);
  justify-content: center;
  padding: var(--spacing-xl) var(--spacing-xxl);
  align-items: stretch;
  flex-wrap: wrap;
}

.investing-card {
  background: var(--bg-darker);
  border-radius: var(--radius-xl);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.12),
    0 1.5px 6px rgba(235, 103, 9, 0.08);
  padding: var(--spacing-xl) var(--spacing-lg);
  min-width: 280px;
  max-width: 340px;
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast);
  position: relative;
}

.investing-card h2 {
  background: var(--primary-gradient);
  color: var(--text-white);
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-3xl);
  font-weight: 800;
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 8px rgba(235, 103, 9, 0.12);
}

.card-text h3 {
  color: var(--primary-orange);
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.card-text p {
  color: var(--text-white);
  font-size: var(--font-size-base);
  line-height: 1.6;
  text-align: center;
}

.card-divider {
  width: 2px;
  height: 80px;
  background: var(--text-muted);
  align-self: center;
  margin: 0 var(--spacing-lg);
  border-radius: 2px;
}

.investing-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}

.animate-fade-slide {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}

@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .investing-cards {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    width: 100%;
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .card-divider {
    width: 80px;
    height: 2px;
    margin: var(--spacing-lg) 0;
  }
}

@media (max-width: 600px) {
  .investing-section {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .investing-section h1 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-lg);
  }

  .investing-card {
    padding: var(--spacing-lg) var(--spacing-sm);
    min-width: 0;
    max-width: 100%;
  }

  .investing-card h2 {
    width: 38px;
    height: 38px;
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
  }

  .card-text h3 {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-xs);
  }

  .card-text p {
    font-size: var(--font-size-sm);
  }

  .card-divider {
    width: 40px;
    height: 2px;
    margin: var(--spacing-sm) 0;
  }
}
</style>
