<template>
    <!-- Footer Section -->
    <footer class="footer">
        <div class="container">
            <!-- Footer Main Content -->
            <div class="footer-content">
                <!-- Brand Info -->
                <div class="footer-brand">
                    <h2>EWProgram</h2>
                    <p>Building smarter digital solutions with passion and purpose.</p>
                </div>

                <!-- Navigation Links -->
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

                <!-- Social Media -->
                <div class="footer-social">
                    <h4>Follow Us</h4>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>&copy; {{ new Date().getFullYear() }} EWProgram. All rights reserved.</p>
            </div>
        </div>

        <!-- Scroll to Top Button -->
        <button class="scroll-top" v-show="showButton" @click="scrollToTop">
            <i class="fas fa-arrow-up"></i>
        </button>
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
    background: inherit !important;
    color: #fff;
    padding: 60px 20px 30px;
    position: relative;
}

.container {
    max-width: 1200px;
    margin: auto;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
}

.footer-brand h2 {
    color: #ff6600;
    margin-bottom: 10px;
}

.footer-brand p {
    max-width: 300px;
    color: #ccc;
    font-size: 0.95rem;
}

.footer-links h4,
.footer-social h4 {
    margin-bottom: 15px;
    color: #ff6600;
}

.footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links li {
    margin-bottom: 10px;
}

.footer-links ul li {
  position: relative;
  margin-bottom: 10px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  font-size: 0.95rem;
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

.footer-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: #fff;
}

.footer-social .social-icons {
    display: flex;
    gap: 15px;
}

.footer-social i {
    color: #ccc;
    font-size: 1.2rem;
    transition: color 0.3s;
}

.footer-social a:hover i {
    color: #ff6600;
}

.footer-bottom {
    text-align: center;
    margin-top: 40px;
    font-size: 0.9rem;
    color: #aaa;
    border-top: 1px solid #333;
    padding-top: 20px;
}

/* Scroll to Top Button */
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

/* Responsive */
@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
    }

    .footer-brand,
    .footer-links,
    .footer-social {
        width: 100%;
    }
}
</style>