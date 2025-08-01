<template>
  <div v-if="isLoading" class="preloader-overlay">
    <div class="preloader-container">
      <div class="preloader-logo">
        <div class="logo-icon">💎</div>
      </div>
      <div class="preloader-text">
        <h2>CryptoHarvest</h2>
        <p>Loading your investment journey...</p>
      </div>
      <div class="preloader-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    this.showPreloader()
  },
  watch: {
    // Watch for route changes
    '$route'() {
      this.showPreloader()
    }
  },
  methods: {
    showPreloader() {
      this.isLoading = true
      // Show preloader for 2 seconds
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.preloader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.preloader-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

.preloader-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-orange) 0%, var(--primary-red) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(235, 103, 9, 0.3);
  animation: logoFloat 2s ease-in-out infinite;
}

.logo-icon {
  font-size: 60px;
  animation: logoSpin 3s linear infinite;
}

.preloader-text h2 {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-sm);
  animation: textGlow 2s ease-in-out infinite;
  letter-spacing: -1px;
}

.preloader-text p {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  font-weight: 500;
}

.preloader-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid var(--primary-orange);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  border-top-color: var(--primary-red);
  animation-delay: 0.2s;
}

.spinner-ring:nth-child(3) {
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  border-top-color: var(--text-gold);
  animation-delay: 0.4s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes logoSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes textGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Fade out animation when preloader is removed */
.preloader-overlay.fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@media (max-width: 768px) {
  .preloader-logo {
    width: 100px;
    height: 100px;
  }
  
  .logo-icon {
    font-size: 50px;
  }
  
  .preloader-text h2 {
    font-size: var(--font-size-3xl);
  }
  
  .preloader-text p {
    font-size: var(--font-size-base);
  }
}
</style> 