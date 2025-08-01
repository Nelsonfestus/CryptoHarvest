<template>
  <div class="Community_section">
    <div class="container">
      <div class="Community_image">
        <img src="@/assets/kimberly.jpg" alt="Community" />
      </div>
      <div class="Community_text animate-text-stagger">
        <h1 class="animate-text-slide">Join Our Thriving Community</h1>
        <p class="animate-text-slide">
          Connect with like-minded investors, share strategies, and grow together in our supportive
          community. Get access to exclusive insights, expert advice, and real-time market analysis.
        </p>
        <div class="Community_cta animate-text-fade">
          <router-link to="/signup" class="btn-primary">Join Community</router-link>
        </div>
      </div>
    </div>

    <div class="Community_benefits_outer">
      <div class="Community_benefits">
        <div class="benefit-card animate-text-fade">
          <div class="benefit-icon">📈</div>
          <div class="benefit-content">
            <h3 class="benefit-title">Expert Insights</h3>
            <p class="benefit-desc">
              Access professional market analysis and investment strategies from industry experts.
            </p>
          </div>
        </div>

        <div class="benefit-card animate-text-fade">
          <div class="benefit-icon">🤝</div>
          <div class="benefit-content">
            <h3 class="benefit-title">Peer Support</h3>
            <p class="benefit-desc">
              Connect with fellow investors, share experiences, and learn from each other's success
              stories.
            </p>
          </div>
        </div>

        <div class="benefit-card animate-text-fade">
          <div class="benefit-icon">📊</div>
          <div class="benefit-content">
            <h3 class="benefit-title">Real-time Updates</h3>
            <p class="benefit-desc">
              Stay informed with live market updates, portfolio tracking, and performance analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.Community_section {
  background: var(--bg-dark);
  color: var(--text-white);
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-top: calc(var(--spacing-xxl) + 80px); /* Add extra top padding for fixed navbar */
}

.container {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxl);
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xxl) 0;
}

.Community_image {
  flex: 1;
  max-width: 500px;
}

.Community_image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.Community_text {
  flex: 1;
  max-width: 600px;
}

.Community_text h1 {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-lg);
  line-height: 1.2;
}

.Community_text p {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-xl);
}

.Community_cta {
  margin-top: var(--spacing-lg);
}

.Community_benefits_outer {
  background: var(--bg-darker);
  padding: var(--spacing-xxl) var(--spacing-xl);
}

.Community_benefits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.benefit-card {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.benefit-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
}

.benefit-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.benefit-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
  letter-spacing: 0.5px;
}

.benefit-desc {
  color: var(--text-muted);
  font-size: var(--font-size-base);
  font-weight: 400;
  line-height: 1.5;
}

@media (max-width: 1000px) {
  .container {
    flex-direction: column;
    padding: var(--spacing-xl) var(--spacing-lg);
    gap: var(--spacing-xl);
  }

  .Community_image,
  .Community_text {
    width: 100%;
    max-width: 100%;
  }

  .Community_benefits {
    gap: var(--spacing-lg);
  }

  .benefit-card {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 600px) {
  .Community_section {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .Community_benefits_outer {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .Community_benefits {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .Community_text h1 {
    font-size: var(--font-size-2xl);
  }
}
</style>
