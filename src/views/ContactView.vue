<template>
  <div class="contact-container">
    <!-- Hero Section -->
    <div class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title animated-fade-slide">Get In Touch</h1>
        <p class="hero-subtitle animated-fade-slide" style="animation-delay: 0.2s">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>
    </div>

    <!-- Contact Content -->
    <div class="contact-content">
      <!-- Contact Information -->
      <div class="contact-info-section animated-fade-slide" style="animation-delay: 0.3s">
        <h2>Contact Information</h2>
        <div class="contact-cards">
          <div class="contact-card">
            <div class="card-icon">📧</div>
            <h3>Email</h3>
            <p>Info.CryptoHarvest@yahoo.com</p>
            <a href="mailto:Info.CryptoHarvest@yahoo.com" class="contact-link">Send Email</a>
          </div>
          
          <div class="contact-card">
            <div class="card-icon">📞</div>
            <h3>Phone</h3>
            <p>+1 369 218 0966</p>
            <a href="tel:+13692180966" class="contact-link">Call Now</a>
          </div>
          
          <div class="contact-card">
            <div class="card-icon">📍</div>
            <h3>Address</h3>
            <p>85 Madison Avenue, A, Chula Vista, CA 91910</p>
            <a href="https://maps.google.com" target="_blank" class="contact-link">View on Map</a>
          </div>
          
          <div class="contact-card">
            <div class="card-icon">⏰</div>
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <span class="contact-link">24/7 Support Available</span>
          </div>
        </div>
      </div>

      <!-- Contact Form Section -->
      <div class="contact-form-section animated-fade-slide" style="animation-delay: 0.4s">
        <div class="form-container">
          <h2>Send us a Message</h2>
          <p class="form-subtitle">Fill out the form below and we'll get back to you as soon as possible.</p>
          
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="formData.firstName" 
                  required 
                  placeholder="Enter your first name"
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="formData.lastName" 
                  required 
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  required 
                  placeholder="Enter your email address"
                />
              </div>
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone" 
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="subject">Subject *</label>
              <select id="subject" v-model="formData.subject" required>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="investment">Investment Questions</option>
                <option value="technical">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                required 
                rows="6"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="formData.newsletter" 
                  class="checkbox-input"
                />
                <span class="checkmark"></span>
                Subscribe to our newsletter for updates and investment opportunities
              </label>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">Send Message</span>
              <span v-else class="loading-text">
                <span class="spinner"></span>
                Sending...
              </span>
            </button>
          </form>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section animated-fade-slide" style="animation-delay: 0.5s">
        <h2>Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <span class="faq-icon" :class="{ 'rotated': faq.open }">+</span>
            </div>
            <div class="faq-answer" :class="{ 'open': faq.open }">
              <p>{{ faq.answer }}</p>
            </div>
    </div>
  </div>
  </div>

      <!-- Support Section -->
      <div class="support-section animated-fade-slide" style="animation-delay: 0.6s">
        <h2>24/7 Support & Resources</h2>
        <p>We're here to help you succeed with your investment journey.</p>
        <div class="support-grid">
          <div class="support-card">
            <div class="support-icon">💬</div>
            <h3>Live Chat Support</h3>
            <p>Get instant help from our expert support team available 24/7</p>
            <button class="support-btn" @click="openLiveChat">Start Chat</button>
          </div>
          
          <div class="support-card">
            <div class="support-icon">📚</div>
            <h3>Investment Guide</h3>
            <p>Learn about crypto investments, strategies, and best practices</p>
            <button class="support-btn" @click="openInvestmentGuide">Read Guide</button>
          </div>
          
          <div class="support-card">
            <div class="support-icon">🔒</div>
            <h3>Security Center</h3>
            <p>Learn about our security measures and how to protect your account</p>
            <button class="support-btn" @click="openSecurityCenter">Learn More</button>
          </div>
          
          <div class="support-card">
            <div class="support-icon">📞</div>
            <h3>Priority Support</h3>
            <p>Premium members get dedicated support line and faster response times</p>
            <button class="support-btn" @click="upgradeToPremium">Upgrade Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      loading: false,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      faqs: [
        {
          question: 'How do I start investing with CryptoHarvest?',
          answer: 'To start investing, simply create an account, complete the verification process, and choose from our investment plans. You can start with as little as $1,500.',
          open: false
        },
        {
          question: 'What are the minimum investment amounts?',
          answer: 'Our Gold Plan starts at $1,500, Silver Plan at $5,000, and Platinum Plan at $20,000. Each plan offers different ROI rates and durations.',
          open: false
        },
        {
          question: 'How secure is my investment?',
          answer: 'We implement bank-level security measures, including SSL encryption, two-factor authentication, and secure wallet integration to protect your investments.',
          open: false
        },
        {
          question: 'What is the withdrawal process?',
          answer: 'Withdrawals can be processed through bank transfer or crypto wallet. Processing times are typically 24-48 hours for bank transfers and 1-2 hours for crypto.',
          open: false
        },
        {
          question: 'Do you offer customer support?',
          answer: 'Yes, we provide 24/7 customer support through live chat, email, and phone. Our support team is always ready to help with any questions or concerns.',
          open: false
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No hidden fees. All fees are clearly disclosed upfront. We only charge a small percentage on successful investments, with no fees for deposits or withdrawals.',
          open: false
        }
      ]
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Reset form
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      }
      
      this.loading = false
      alert('Thank you for your message! We will get back to you within 24 hours.')
    },
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open
    },
    openLiveChat() {
      alert('Opening live chat support...')
      // In a real app, this would open a chat widget
    },
    openInvestmentGuide() {
      alert('Opening investment guide...')
      // In a real app, this would navigate to the guide page
    },
    openSecurityCenter() {
      alert('Opening security center...')
      // In a real app, this would navigate to the security page
    },
    upgradeToPremium() {
      alert('Redirecting to premium upgrade...')
      // In a real app, this would navigate to the upgrade page
    }
  }
}
</script>

<style scoped>
.contact-container {
  background: #151515;
  min-height: 100vh;
  color: #fff;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 120px 20px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(235, 103, 9, 0.1) 0%, rgba(246, 61, 67, 0.1) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Content */
.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

/* Contact Information Section */
.contact-info-section {
  margin-bottom: 80px;
}

.contact-info-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #ffa600;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.contact-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  border: 1px solid #333;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(235, 103, 9, 0.1), transparent);
  transition: left 0.5s ease;
}

.contact-card:hover::before {
  left: 100%;
}

.contact-card:hover {
  transform: translateY(-10px);
  border-color: #eb6709;
  box-shadow: 0 20px 40px rgba(235, 103, 9, 0.2);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.contact-card h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #ffa600;
}

.contact-card p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-link {
  color: #eb6709;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #f63d43;
}

/* Contact Form Section */
.contact-form-section {
  margin-bottom: 80px;
}

.form-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  padding: 50px;
  border: 1px solid #333;
  max-width: 800px;
  margin: 0 auto;
}

.form-container h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #ffa600;
}

.form-subtitle {
  text-align: center;
  color: #ccc;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #ffa600;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 15px;
  border: 1px solid #333;
  border-radius: 10px;
  background: #181818;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #eb6709;
  box-shadow: 0 0 0 3px rgba(235, 103, 9, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  color: #ccc;
  font-weight: normal;
}

.checkbox-input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-input:checked + .checkmark {
  background: #eb6709;
  border-color: #eb6709;
}

.checkbox-input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.submit-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: white;
  border: none;
  padding: 18px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(235, 103, 9, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* FAQ Section */
.faq-section {
  margin-bottom: 80px;
}

.faq-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #ffa600;
}

.faq-grid {
  display: grid;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  border: 1px solid #333;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #eb6709;
  transform: translateY(-2px);
}

.faq-question {
  padding: 25px 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: rgba(235, 103, 9, 0.1);
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #fff;
}

.faq-icon {
  font-size: 1.5rem;
  color: #eb6709;
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(45deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.open {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 30px 25px;
  color: #ccc;
  line-height: 1.6;
  margin: 0;
}

/* Support Section */
.support-section {
  text-align: center;
}

.support-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffa600;
}

.support-section p {
  color: #ccc;
  margin-bottom: 40px;
  font-size: 1.1rem;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.support-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid #333;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.support-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(235, 103, 9, 0.1), transparent);
  transition: left 0.5s ease;
}

.support-card:hover::before {
  left: 100%;
}

.support-card:hover {
  transform: translateY(-10px);
  border-color: #eb6709;
  box-shadow: 0 20px 40px rgba(235, 103, 9, 0.2);
}

.support-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.support-card h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #ffa600;
}

.support-card p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 25px;
  font-size: 0.95rem;
}

.support-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
}

.support-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(235, 103, 9, 0.3);
}

/* Animations */
.animated-fade-slide {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeSlideUp 0.8s ease forwards;
}

@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .contact-content {
    padding: 40px 15px;
  }
  
  .form-container {
    padding: 30px 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-cards {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    gap: 20px;
  }
  
  .social-link {
    min-width: 100px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .contact-hero {
    padding: 100px 15px 60px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .form-container {
    padding: 20px 15px;
  }
  
  .contact-card {
    padding: 20px;
  }
  
  .faq-question {
    padding: 20px;
  }
  
  .faq-answer p {
    padding: 0 20px 20px;
  }
}
</style>