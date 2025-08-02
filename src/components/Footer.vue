<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <h2>CryptoHarvest</h2>
          <p>Building smarter digital solutions with passion and purpose.</p>
        </div>
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/investment-plans">Investment Plan</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><i class="fas fa-envelope"></i> Info.CryptoHarvest@yahoo.com</li>
            <li><i class="fas fa-phone"></i> +1 369 218 0966</li>
            <li><i class="fas fa-map-marker-alt"></i> 85 Madison Avenue, A, Chula Vista, CA 91910</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <hr />
        <p class="footer-tagline">
          CryptoHarvest Investment Trading — Experience the power of smart, safe, and profitable
          trading.
        </p>
        <p>&copy; {{ new Date().getFullYear() }} CryptoHarvest. All rights reserved.</p>
      </div>
      <button
        class="scroll-top"
        v-show="showButton"
        @click="scrollToTop"
        aria-label="Scroll to top"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      showButton: false,
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleScroll() {
      this.showButton = window.scrollY > 200
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.footer {
  background: #202020;
  color: #fff;
  padding: 0;
  position: relative;
}

.footer-container {
  max-width: 1200px;
  margin: auto;
  padding: 0 16px;
}

.footer-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
  padding: 40px 60px 24px 60px;
}

.footer-brand h2 {
  color: #ff6600;
  margin-bottom: 10px;
  font-size: 2rem;
}

.footer-brand p {
  max-width: 320px;
  color: #ccc;
  font-size: 1rem;
}

.footer-links h4,
.footer-contact h4 {
  margin-bottom: 15px;
  color: #ff6600;
  font-size: 1.1rem;
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li,
.footer-contact li {
  margin-bottom: 10px;
  color: #ccc;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}

.footer-links a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  background-color: #ff6600;
  transition: width 0.3s ease;
}

.footer-links a:hover::after {
  width: 100%;
}

.footer-links a:hover {
  color: #fff;
}

.footer-contact i {
  color: #ff6600;
  font-size: 1.1rem;
}

.footer-bottom {
  text-align: center;
  font-size: 0.95rem;
  color: #aaa;
  border-top: 1px solid #333;
  padding: 18px 0 8px 0;
  margin-top: 0;
}

.footer-bottom hr {
  display: none;
}

.scroll-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(90deg, #eb6709, #f63d43);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: transform 0.2s ease;
}

.scroll-top:hover {
  transform: scale(1.1);
}

.footer-tagline {
  margin-top: 8px;
  color: #ffa600;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 900px) {
  .footer-main {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding: 20px 16px 16px 16px;
  }

  .footer-container {
    padding: 0 4px;
  }
}

@media (max-width: 600px) {
  .footer-main {
    padding: 32px 16px 16px 16px;
  }

  .footer-brand h2 {
    font-size: 1.3rem;
  }

  .footer-brand p {
    font-size: 0.95rem;
  }

  .footer-links h4,
  .footer-contact h4 {
    font-size: 1rem;
  }

  .footer-links a,
  .footer-contact li {
    font-size: 0.95rem;
  }
}
</style>
