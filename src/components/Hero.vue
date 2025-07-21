<template>
  <!-- hero-section -->
  <div class="hero-section">
    <!-- background video -->
    <video class="hero-bg-video" autoplay loop muted playsinline>
      <source src="@/assets/bg1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- hero-text -->
    <div class="hero-text animated-fade-slide">
      <h1>Go to the next level investing</h1>
      <p>
        We are dedicated to providing investment management and strategic wealth planning that is
        right for you. simply put, we strive to be our client's trusted advisor.
      </p>
    </div>

    <!-- hero-btn -->
    <div class="hero-btn animated-fade-slide" style="animation-delay: 0.3s">
      <button class="btn">Get Started</button>
      <button class="btn">Know More</button>
    </div>
  </div>
  <Investment />
</template>

<script>
import Investment from './Investment.vue'
export default {
  components: { Investment },
}
</script>

<style scoped>
/* hero-section */
.hero-section {
  background: #151515;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
}

.hero-text,
.hero-btn {
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
}

.hero-text {
  width: 50%;
}

.hero-text h1 {
  text-transform: uppercase;
  line-height: 1.6;
  font-size: 50px;
  margin-bottom: 10px;
}

.hero-text p {
  line-height: 1.4;
  font-size: 18px;
}

.hero-btn {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.hero-btn .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s,
    box-shadow 0.3s,
    transform 0.3s;
}

.hero-btn .btn:first-child {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(246, 61, 67, 0.15);
}

.hero-btn .btn:first-child:hover {
  background: #151515;
  transform: scale(1.07);
  box-shadow: 0 4px 16px rgba(246, 61, 67, 0.25);
}

.hero-btn .btn:last-child {
  background: #151515;
  color: #fff;
}

.hero-btn .btn:last-child:hover {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  transform: scale(1.07);
  box-shadow: 0 4px 16px rgba(246, 61, 67, 0.25);
}

/* Fade-in and slide-up animation */
.animated-fade-slide {
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

/* Responsive styles for max-width 768px */
@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
    padding: 40px 10px 20px 10px;
  }
  .hero-text {
    width: 100%;
    padding: 0 5px;
  }
  .hero-text h1 {
    font-size: 28px;
    line-height: 1.3;
  }
  .hero-text p {
    font-size: 15px;
    line-height: 1.3;
  }
  .hero-btn {
    flex-direction: column;
    gap: 14px;
    width: 100%;
    align-items: center;
  }
  .hero-btn .btn {
    width: 90%;
    font-size: 16px;
    padding: 12px 0;
  }
}
</style>
