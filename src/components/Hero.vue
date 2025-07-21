<template>
  <!-- hero-section -->
  <div class="hero-section">
    <!-- background video -->
    <video class="hero-bg-video" autoplay loop muted playsinline>
      <source src="@/assets/bg1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- hero-text -->
    <div class="hero-text">
      <h1>Go to the next level investing</h1>
      <p>
        We are dedicated to providing investment management and strategic wealth planning that is
        right for you. simply put, we strive to be our client's trusted advisor.
      </p>
    </div>

    <!-- hero-btn -->
    <div class="hero-btn">
      <button class="btn">Get Started</button>
      <button class="btn">Know More</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* hero-section */
.hero-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 80vh;
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

.hero-text {
    width: 50%;
    border: 2px solid;
}

.hero-text h1 {
    text-transform: uppercase;
    line-height: 1.6;
    font-size: 50px;
}

.hero-text p {
    line-height: 1.4;
    font-size: 18px;
}

.hero-text,
.hero-btn {
  position: relative;
  z-index: 1;
  color: #fff;
  text-align: center;
}
</style>
