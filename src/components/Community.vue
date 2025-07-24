<template>
  <div class="Community_section animate-fade-slide">
    <!-- container -->
    <div class="container">
      <!-- Community_image -->
      <div class="Community_image">
        <img src="../assets/About_background_upper.png" alt="img" />
      </div>

      <!-- Community_text -->
      <div class="Community_text">
        <div class="Community_text_header">
          <h1>
            Unlock the Potential of Your Investments with Our Secure Cryptocurrency Trading Platform
          </h1>
        </div>

        <!-- community intro -->
        <div class="Community_intro">
          <p>
            In today’s dynamic financial landscape, cryptocurrency has emerged as one of the most
            promising investment opportunities. We are excited to introduce you to our exclusive
            platform, designed to maximize your returns through secure and reliable trading
            strategies.
          </p>
          <p>
            By investing with us, you can earn a guaranteed profit of $5 for every rise in Bitcoin’s
            value. What’s more, we offer a unique opportunity to multiply your initial investment up
            to 4 times through our proven investment strategy—all while ensuring the highest levels
            of security and safety for your funds.
          </p>
        </div>

        <!-- community cta -->
        <div class="Community_cta">
          <p>
            Take advantage of this incredible opportunity to grow your wealth in the fast-paced
            world of cryptocurrency.
          </p>
          <p>
            Ready to invest now? Join us today and experience the power of smart, safe, and
            profitable trading.
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Benefits cards container below -->
  <!-- Community Benefits Section: visually distinct cards below main community section -->
  <div class="Community_benefits_outer animate-fade-slide">
    <!-- Cards Container: holds all benefit cards -->
    <div class="Community_benefits">
      <div class="benefit-card">
        <span class="benefit-icon benefit-secure"><i class="bi bi-shield-lock"></i></span>
        <div class="benefit-content">
          <div class="benefit-title">Secure and Reliable</div>
          <div class="benefit-desc">
            Our platform employs advanced security protocols, ensuring your investment is protected
            at all times.
          </div>
        </div>
      </div>
      <div class="benefit-card">
        <span class="benefit-icon benefit-profit"><i class="bi bi-cash-coin"></i></span>
        <div class="benefit-content">
          <div class="benefit-title">Guaranteed Profit</div>
          <div class="benefit-desc">
            With every rise in Bitcoin’s value, you’ll earn a consistent profit, starting at $5 per
            increase.
          </div>
        </div>
      </div>
      <div class="benefit-card">
        <span class="benefit-icon benefit-returns"><i class="bi bi-graph-up-arrow"></i></span>
        <div class="benefit-content">
          <div class="benefit-title">High Returns</div>
          <div class="benefit-desc">
            Our unique program allows you to multiply your initial investment up to 4 times.
          </div>
        </div>
      </div>
      <div class="benefit-card">
        <span class="benefit-icon benefit-easy"><i class="bi bi-lightning-charge"></i></span>
        <div class="benefit-content">
          <div class="benefit-title">Simple and Easy</div>
          <div class="benefit-desc">
            Join our platform, make your investment, and watch your profits grow—all with minimal
            effort.
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
.container {
  background:
    linear-gradient(rgba(0, 0, 0, 0.895), rgba(0, 0, 0, 0.895)),
    url('../assets/About_background.png');
  background-size: cover;
  background-position: center;
  padding: 70px 60px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  color: rgb(255, 255, 255);
}

.Community_image,
.Community_text {
  width: 50%;
  margin-top: 0;
}

.Community_image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.Community_text h1 {
  font-weight: 700;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  background: linear-gradient(45deg, #f83201, #ffa600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.Community_text p {
  font-size: clamp(1rem, 2vw, 1.08rem);
  line-height: 1.5;
  letter-spacing: normal;
  color: #e9e9e9;
}

.Community_intro {
  margin-bottom: 18px;
}

.Community_benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 18px;
  margin-top: 18px;
  max-width: 1200px;
  width: 95%;
  justify-content: center;
}

.benefit-card {
  background: #181818;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(235, 103, 9, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px 24px 28px 24px;
  min-width: 260px;
  flex: 1 1 260px;
  max-width: 340px;
  transition:
    transform 0.18s,
    box-shadow 0.18s;
  position: relative;
}
.benefit-card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 32px rgba(246, 61, 67, 0.16);
}
.benefit-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  font-size: 2.2rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(235, 103, 9, 0.13);
  margin-bottom: 10px;
}
.benefit-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.benefit-title {
  font-size: 1.18rem;
  font-weight: 700;
  color: #ffa600;
  margin-bottom: 7px;
  letter-spacing: 0.5px;
}
.benefit-desc {
  color: #e9e9e9;
  font-size: 1.04rem;
  font-weight: 400;
  line-height: 1.5;
}
.Community_cta {
  margin-top: 18px;
  font-weight: 600;
  color: #fff;
}

.Community_benefits_outer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #202020;
  margin-top: 0;
  padding: 0;
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

@media (max-width: 1000px) {
  .container {
    flex-direction: column;
    padding: 40px 16px;
    gap: 24px;
  }
  .Community_image,
  .Community_text {
    width: 100%;
    margin-top: 0;
  }
  .Community_image {
    margin-top: 15%;
  }
  .Community_benefits {
    gap: 18px;
  }
  .benefit-card {
    min-width: 0;
    width: 100%;
    max-width: 100%;
    padding: 24px 12px 18px 12px;
  }
}

@media (max-width: 600px) {
  .container {
    padding: 40px 20px;
    gap: 16px;
  }
  .Community_benefits_outer {
    padding: 0 0 0 0;
  }
  .Community_benefits {
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .benefit-card {
    padding: 18px 6px 14px 6px;
    border-radius: 12px;
  }
  .Community_image img {
    border-radius: 8px;
  }
  .Community_text h1 {
    font-size: 1.1rem;
  }
}
</style>
