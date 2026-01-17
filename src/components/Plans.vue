<template>
  <section class="plans-section animate-fade-slide">
    <video class="plans-bg-video" autoplay loop muted playsinline>
      <source src="@/assets/bg1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <!-- Fallback background in case video doesn't load -->
    <div class="plans-bg-fallback"></div>
    <h2 class="plans-title">Our Investment Plans</h2>
    <p class="plans-desc">Choose from a variety of plans tailored to your needs and goals.</p>
    <div class="plans-cards">
      <div class="plan-card gold animate-fade-slide" v-for="plan in plans" :key="plan.title">
        <div class="plan-icon"><i :class="plan.icon"></i></div>
        <h3>{{ plan.title }}</h3>
        <ul class="plan-features">
          <li v-for="feature in plan.features" :key="feature.label">
            <i class="fas fa-check-circle"></i> {{ feature.label }}: <span>{{ feature.value }}</span>
          </li>
        </ul>
        <button class="plan-btn" @click="goToSignup">Invest Now</button>
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
          title: 'Gold Plan',
          icon: 'fas fa-crown',
          features: [
            { label: 'Minimum', value: '$1,500' },
            { label: 'Maximum', value: '$5,000' },
            { label: 'Duration', value: '24 Hours' },
            { label: 'ROI', value: '100%' },
            { label: 'Capital Back', value: 'Yes' },
          ],
        },
        {
          title: 'Silver Plan',
          icon: 'fas fa-medal',
          features: [
            { label: 'Minimum', value: '$5,000' },
            { label: 'Maximum', value: '$20,000' },
            { label: 'Duration', value: '48 Hours' },
            { label: 'ROI', value: '100%' },
            { label: 'Capital Back', value: 'Yes' },
          ],
        },
        {
          title: 'Platinum Plan',
          icon: 'fas fa-gem',
          features: [
            { label: 'Minimum', value: '$20,000' },
            { label: 'Maximum', value: 'Unlimited' },
            { label: 'Duration', value: '7 Days' },
            { label: 'ROI', value: '100%' },
            { label: 'Capital Back', value: 'Yes' },
          ],
        },
      ],
    }
  },
  methods: {
    goToSignup() {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.plans-section {
  background: #202020;
  color: #fff;
  padding: 80px 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.plans-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

.plans-bg-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  z-index: 0;
  pointer-events: none;
}
.plans-title,
.plans-desc,
.plans-cards {
  margin-top: 40px;
  position: relative;
  z-index: 1;
}
.plans-title {
  font-size: 2.2rem;
  text-transform: uppercase;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  color: #eb6709; /* Fallback for browsers that don't support background-clip */
}
.plans-desc {
  color: #ccc;
  margin-bottom: 32px;
  font-size: 1.1rem;
}
.plans-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  justify-content: center;
  align-items: stretch;
  max-width: 1100px;
  margin: 0 auto;
}
.plan-card {
  background: #181818;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.plan-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}
.plan-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.plan-card.gold .plan-icon {
  color: #ffd700;
}
.plan-card.silver .plan-icon {
  color: #c0c0c0;
}
.plan-card.platinum .plan-icon {
  color: #e5e4e2;
}
.plan-card h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  color: #eb6709;
}
.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
  text-align: left;
}
.plan-features li {
  margin-bottom: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: #e9e9e9;
}
.plan-features i {
  color: #eb6709;
  margin-right: 8px;
}
.plan-features span {
  color: #ffd700;
  font-weight: 600;
  margin-left: 4px;
}
.plan-card.silver .plan-features span {
  color: #c0c0c0;
}
.plan-card.platinum .plan-features span {
  color: #e5e4e2;
}
.plan-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
}
.plan-btn:hover {
  background: #fff;
  color: #eb6709;
}
@media (max-width: 1000px) {
  .plans-cards {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
@media (max-width: 600px) {
  .plans-section {
    padding: 20px 8px;
  }
  .plans-title {
    font-size: 1.3rem;
  }
  .plan-card {
    padding: 18px 8px;
  }
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
</style>
