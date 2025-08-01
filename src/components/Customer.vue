<template>
  <!-- Customer Section -->
  <section class="customer-section animate-fade-slide">
    <h1>What Our Customers Say</h1>

    <div class="customer-cards">
      <div v-for="(card, idx) in cards" :key="idx" class="customer-card animate-fade-slide">
        <i class="fa-solid fa-quote-left quote-icon left"></i>

        <div class="card-text">
          <p>{{ card.text }}</p>
        </div>

        <div class="card-profile">
          <img :src="card.image" alt="customer photo" />
          <div class="card-details">
            <h3>{{ card.name }}</h3>
            <p class="review">{{ card.review }}</p>
          </div>
        </div>

        <i class="fa-solid fa-quote-right quote-icon right"></i>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomerSay',
  data() {
    const sampleData = [
      {
        name: 'Sarah Johnson',
        review: 'Investor & Entrepreneur',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: "CryptoHarvest transformed my investment journey! The platform is incredibly user-friendly, and I've seen consistent returns on my investments. The customer support team is always helpful and responsive.",
      },
      {
        name: 'David Kim',
        review: 'Finance Analyst',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: "As a finance professional, I'm impressed by the transparency and security measures. The investment plans are well-structured, and the ROI tracking is excellent. This is exactly what I was looking for.",
      },
      {
        name: 'Emily Rodriguez',
        review: 'Digital Nomad',
        image: 'https://randomuser.me/api/portraits/women/12.jpg',
        text: 'Being a digital nomad, I needed a platform I could trust from anywhere in the world. CryptoHarvest delivers exactly that - secure, reliable, and profitable investments that work globally.',
      },
      {
        name: 'Michael Chen',
        review: 'Tech Startup Founder',
        image: 'https://randomuser.me/api/portraits/men/45.jpg',
        text: 'I was skeptical about crypto investments initially, but CryptoHarvest proved me wrong. The platform is professional, the returns are real, and the community is supportive. Highly recommended!',
      },
      {
        name: 'Lisa Thompson',
        review: 'Retirement Planner',
        image: 'https://randomuser.me/api/portraits/women/28.jpg',
        text: "I've been using CryptoHarvest for my retirement planning and the results are outstanding. The diversified investment options and consistent returns give me confidence in my financial future.",
      },
      {
        name: 'Robert Anderson',
        review: 'Real Estate Investor',
        image: 'https://randomuser.me/api/portraits/men/67.jpg',
        text: 'CryptoHarvest complements my real estate portfolio perfectly. The crypto investments provide excellent diversification and the returns have exceeded my expectations. Great platform!',
      },
      {
        name: 'Maria Garcia',
        review: 'Small Business Owner',
        image: 'https://randomuser.me/api/portraits/women/33.jpg',
        text: 'Running a small business, I needed a reliable way to grow my savings. CryptoHarvest offers exactly what I need - secure investments with great returns and minimal time commitment.',
      },
      {
        name: 'James Wilson',
        review: 'Freelance Consultant',
        image: 'https://randomuser.me/api/portraits/men/89.jpg',
        text: 'The flexibility of CryptoHarvest is perfect for my freelance lifestyle. I can invest what I can afford, track my progress easily, and the returns help supplement my income beautifully.',
      },
      {
        name: 'Jennifer Lee',
        review: 'Marketing Executive',
        image: 'https://randomuser.me/api/portraits/women/56.jpg',
        text: 'I love how CryptoHarvest makes investing accessible to everyone. The educational resources are excellent, and the platform is so intuitive. My investment portfolio has grown significantly!',
      },
      {
        name: 'Thomas Brown',
        review: 'Healthcare Professional',
        image: 'https://randomuser.me/api/portraits/men/23.jpg',
        text: 'As a healthcare worker with irregular hours, I needed a passive investment solution. CryptoHarvest delivers exactly that - I can invest and forget, knowing my money is working for me.',
      },
      {
        name: 'Amanda Davis',
        review: 'Teacher',
        image: 'https://randomuser.me/api/portraits/women/78.jpg',
        text: 'CryptoHarvest has been a game-changer for my financial planning. The low minimum investment allowed me to start small, and the consistent returns have helped me build a solid nest egg.',
      },
      {
        name: 'Christopher Martinez',
        review: 'Software Engineer',
        image: 'https://randomuser.me/api/portraits/men/91.jpg',
        text: 'The technical security and transparency of CryptoHarvest impressed me from day one. The platform is robust, the returns are transparent, and the user experience is excellent.',
      },
    ]

    return {
      cards: sampleData,
    }
  },
}
</script>

<style scoped>
.customer-section {
  padding: 40px 60px;
  background-color: #181818;
  text-align: center;
}

.customer-section h1 {
  font-size: 2.2rem;
  margin-bottom: 40px;
  color: #e9e9e9;
}

.customer-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  justify-content: center;
  align-items: stretch;
}

.customer-card {
  background: #202020;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
}

.customer-card:hover {
  transform: translateY(-5px);
}

.quote-icon {
  font-size: 24px;
  color: #cd201f;
  margin: 10px;
}

.left {
  position: absolute;
  top: 15px;
  left: 15px;
}

.right {
  position: absolute;
  bottom: 15px;
  right: 15px;
}

.card-text p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e9e9e9;
  margin-top: 20px;
}

.card-profile {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.card-profile img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.card-details h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #e9e9e9;
}

.card-details .review {
  font-size: 0.85rem;
  color: #777;
  margin-top: 4px;
}

.card-divider {
  height: 2px;
  width: 100%;
  background-color: #eaeaea;
  margin: 20px 0;
  display: none;
}

.customer-card:hover {
  transform: translateY(-8px) scale(1.011);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive spacing */
@media (max-width: 768px) {
  .customer-section {
    padding: 20px 16px;
  }

  .customer-section h1 {
    font-size: 1.8rem;
  }

  .customer-cards {
    gap: 20px;
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
