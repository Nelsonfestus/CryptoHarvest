<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title animate-text-slide">About CryptoHarvest</h1>
        <p class="hero-subtitle animate-text-slide">
          Revolutionizing cryptocurrency investment with innovative strategies and secure, 
          transparent trading solutions for the modern investor.
        </p>
        <div class="hero-stats animate-text-stagger">
          <div class="stat-item">
            <span class="stat-number">$50M+</span>
            <span class="stat-label">Assets Under Management</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10K+</span>
            <span class="stat-label">Active Investors</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">95%</span>
            <span class="stat-label">Success Rate</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2 class="section-title animate-text-slide">Our Story</h2>
            <p class="story-description animate-text-slide">
              Founded in 2020, CryptoHarvest emerged from a vision to democratize cryptocurrency 
              investment opportunities. Our founders recognized the potential of digital assets 
              but saw the barriers that prevented everyday investors from participating.
            </p>
            <p class="story-description animate-text-slide">
              Today, we've built a platform that combines cutting-edge technology with proven 
              investment strategies, making cryptocurrency investment accessible, secure, and 
              profitable for investors worldwide.
            </p>
          </div>
          <div class="story-image">
            <img src="@/assets/About_background.png" alt="CryptoHarvest Story" />
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-card animate-text-fade">
            <div class="mission-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To empower individuals worldwide with secure, profitable cryptocurrency 
              investment opportunities through innovative technology and transparent practices.
            </p>
          </div>
          <div class="mission-card animate-text-fade">
            <div class="mission-icon">🔮</div>
            <h3>Our Vision</h3>
            <p>
              To become the leading platform for cryptocurrency investment, setting industry 
              standards for security, transparency, and investor success.
            </p>
          </div>
          <div class="mission-card animate-text-fade">
            <div class="mission-icon">💎</div>
            <h3>Our Values</h3>
            <p>
              Integrity, transparency, innovation, and client success drive everything we do. 
              We believe in building lasting relationships through trust and results.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <h2 class="section-title animate-text-slide">Meet Our Leadership</h2>
        <div class="team-grid">
          <div class="team-member animate-text-fade">
            <div class="member-image">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" alt="CEO" />
            </div>
            <div class="member-info">
              <h3>Sarah Johnson</h3>
              <p class="member-role">Chief Executive Officer</p>
              <p class="member-bio">
                Former Wall Street executive with 15+ years in financial markets and 
                cryptocurrency trading.
              </p>
            </div>
          </div>
          <div class="team-member animate-text-fade">
            <div class="member-image">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face" alt="CTO" />
            </div>
            <div class="member-info">
              <h3>Michael Chen</h3>
              <p class="member-role">Chief Technology Officer</p>
              <p class="member-bio">
                Blockchain expert and software architect with experience at major tech companies.
              </p>
            </div>
          </div>
          <div class="team-member animate-text-fade">
            <div class="member-image">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face" alt="CFO" />
            </div>
            <div class="member-info">
              <h3>Emma Wilson</h3>
              <p class="member-role">Chief Financial Officer</p>
              <p class="member-bio">
                Certified financial analyst specializing in digital asset management and risk assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-section">
      <div class="container">
        <h2 class="section-title animate-text-slide">Why Choose CryptoHarvest?</h2>
        <div class="features-grid">
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">🔒</div>
            <h3>Bank-Level Security</h3>
            <p>Multi-layered security protocols protect your investments with military-grade encryption.</p>
          </div>
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">📊</div>
            <h3>Proven Strategies</h3>
            <p>Our investment strategies are backed by years of market analysis and successful implementation.</p>
          </div>
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">💡</div>
            <h3>Expert Guidance</h3>
            <p>Access to professional market analysts and investment advisors to guide your decisions.</p>
          </div>
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">⚡</div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support to assist you with any questions or concerns.</p>
          </div>
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">🌍</div>
            <h3>Global Access</h3>
            <p>Trade from anywhere in the world with our mobile-optimized platform.</p>
          </div>
          <div class="feature-item animate-text-fade">
            <div class="feature-icon">📈</div>
            <h3>Transparent Fees</h3>
            <p>Clear, competitive fee structure with no hidden charges or surprise costs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title animate-text-slide">Ready to Start Your Investment Journey?</h2>
          <p class="cta-description animate-text-slide">
            Join thousands of successful investors who trust CryptoHarvest with their financial future.
          </p>
          <div class="cta-buttons animate-text-fade">
            <router-link to="/signup" class="btn-primary">Get Started Today</router-link>
            <router-link to="/investment-plans" class="btn-secondary">View Investment Plans</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <Questions />
  </div>
</template>

<script>
import Questions from '@/components/Questions.vue'

export default {
  name: 'AboutView',
  components: {
    Questions
  }
}
</script>

<style scoped>
.about-page {
  background: var(--bg-dark);
  color: var(--text-white);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-darker) 100%);
  padding: calc(var(--spacing-xxl) + 80px) var(--spacing-xl) var(--spacing-xxl);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/About_background_upper.png') center/cover;
  opacity: 0.1;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-xxl);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xxl);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-gold);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-base);
  color: var(--text-muted);
}

/* Story Section */
.story-section {
  padding: var(--spacing-xxl) var(--spacing-xl);
  background: var(--bg-darker);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xxl);
  align-items: center;
}

.story-text {
  padding-right: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: var(--spacing-lg);
}

.story-description {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.story-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Mission Section */
.mission-section {
  padding: var(--spacing-xxl) var(--spacing-xl);
  background: var(--bg-dark);
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.mission-card {
  background: var(--bg-darker);
  padding: var(--spacing-xxl);
  border-radius: var(--radius-xl);
  text-align: center;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.mission-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
}

.mission-card h3 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
}

.mission-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Team Section */
.team-section {
  padding: var(--spacing-xxl) var(--spacing-xl);
  background: var(--bg-darker);
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xxl);
}

.team-member {
  background: var(--bg-dark);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.team-member:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.member-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info {
  padding: var(--spacing-xl);
}

.member-info h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: var(--spacing-xs);
}

.member-role {
  color: var(--primary-orange);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.member-bio {
  color: var(--text-muted);
  line-height: 1.6;
}

/* Why Choose Us Section */
.why-choose-section {
  padding: var(--spacing-xxl) var(--spacing-xl);
  background: var(--bg-dark);
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-top: var(--spacing-xxl);
}

.feature-item {
  background: var(--bg-darker);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-lg);
}

.feature-item h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-gold);
  margin-bottom: var(--spacing-md);
}

.feature-item p {
  color: var(--text-muted);
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  padding: var(--spacing-xxl) var(--spacing-xl);
  background: var(--primary-gradient);
  text-align: center;
}

.cta-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--text-white);
  margin-bottom: var(--spacing-lg);
}

.cta-description {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--spacing-xxl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
}

.btn-secondary {
  background: transparent;
  color: var(--text-white);
  border: 2px solid var(--text-white);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
}

.btn-secondary:hover {
  background: var(--text-white);
  color: var(--primary-orange);
}

/* Fix for router-link buttons to remove underline */
.cta-buttons a {
  text-decoration: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .story-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .story-text {
    padding-right: 0;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .mission-grid,
  .team-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
