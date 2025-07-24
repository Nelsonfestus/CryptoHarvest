<template>
  <div class="accordion animate-fade-slide" role="tablist">
    <div class="accordion-item" v-for="(item, idx) in items" :key="idx">
      <input
        type="radio"
        :id="`section${idx}`"
        name="accordion"
        :checked="activeIndex === idx"
        @change="toggleAccordion(idx)"
        :aria-expanded="activeIndex === idx ? 'true' : 'false'"
        :aria-controls="`content${idx}`"
        tabindex="0"
      />
      <label
        :for="`section${idx}`"
        class="accordion-header"
        :tabindex="0"
        @click.prevent="toggleAccordion(idx)"
        @keydown.enter.prevent="toggleAccordion(idx)"
        @keydown.space.prevent="toggleAccordion(idx)"
      >
        <span class="accordion-title">{{ item.title }}</span>
        <div class="accordion-icon">
          <i class="bi bi-plus plus-icon"></i>
          <i class="bi bi-dash minus-icon"></i>
        </div>
      </label>
      <div class="content" :id="`content${idx}`" :aria-hidden="activeIndex !== idx">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordion',
  data() {
    return {
      activeIndex: null,
      items: [
        {
          title: 'How secure is my investment?',
          content:
            'Our platform employs advanced security protocols, ensuring your investment is protected at all times. We prioritize the safety and privacy of your funds and personal information.',
        },
        {
          title: 'How does the guaranteed profit work?',
          content:
            'With every rise in Bitcoin’s value, you’ll earn a consistent profit, starting at $5 per increase. Our system is designed to provide you with reliable returns as the market moves.',
        },
        {
          title: 'Can I really multiply my investment up to 4 times?',
          content:
            'Yes! Our unique program allows you to multiply your initial investment up to 4 times through our proven investment strategy. Join us and take advantage of high-return opportunities.',
        },
        {
          title: 'Is it easy to get started?',
          content:
            'Absolutely. Simply join our platform, make your investment, and watch your profits grow—all with minimal effort. Our user-friendly interface makes investing simple and accessible.',
        },
        {
          title: 'Does this software generate online money?',
          content:
            'Our platform is not a money-generating tool but a secure investment platform designed to help you grow your wealth through strategic financial plans. By choosing a plan and investing, you can earn profits based on your chosen strategy and the performance of your investments. Success depends on smart decisions and the opportunities we provide for your financial growth.',
        },
        {
          title: 'Is there any signup Bonus system?',
          content:
            "Yes, we offer a signup bonus as a warm welcome to our new users! Once you create an account and meet the eligibility criteria, the bonus will be credited to your account. It's our way of helping you kickstart your investment journey with extra value. Terms and conditions apply—check out our promotions page for more details.",
        },
        {
          title: 'How Do I Check My Account Balance?',
          content:
            'Log in to Your Account: Use your registered email and password to access your dashboard. Go to the Balance Section: Navigate to the "Account Balance" or "Dashboard" section. View Real-Time Updates: Your current balance, transaction history, and earnings are displayed in real time for your convenience.',
        },
        {
          title: 'How Many Payment Gateways Are Used in this site?',
          content: 'We offer multiple secure payment gateways for your convenience and security.',
        },
      ],
    }
  },
  methods: {
    toggleAccordion(idx) {
      this.activeIndex = this.activeIndex === idx ? null : idx
    },
  },
}
</script>

<style scoped>
.accordion {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background: #202020;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 40px 60px;
}

.accordion-item {
  margin-bottom: 12px;
  border-radius: 10px;
  background: #232323;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.accordion-item:last-child {
  margin-bottom: 0;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background: none;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  outline: none;
  border: none;
  transition: background 0.2s;
}

.accordion-header:focus {
  background: #181818;
}

.accordion-title {
  font-size: 1.1rem;
  line-height: 1.4;
  font-weight: 600;
}

.accordion-icon {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1.3rem;
}

.plus-icon {
  display: block;
}

.minus-icon {
  display: none;
}

input[type='radio']:checked + .accordion-header .plus-icon {
  display: none;
}

input[type='radio']:checked + .accordion-header .minus-icon {
  display: block;
}

input[type='radio'] {
  display: none;
}

.content {
  height: 0;
  padding: 0 1.2rem;
  background: #232323;
  color: #e9e9e9;
  overflow: hidden;
  transition:
    height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.4s;
  font-size: 1rem;
}

input[type='radio']:checked + .accordion-header + .content {
  height: auto;
  padding: 1rem 1.2rem 1.2rem 1.2rem;
}

.content p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
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

@media (max-width: 600px) {
  .accordion {
    padding: 20px 16px;
  }

  .accordion-header {
    font-size: 1rem;
    padding: 0.8rem 0.7rem;
  }

  .content {
    font-size: 0.95rem;
    padding: 0 0.7rem;
  }

  input[type='radio']:checked + .accordion-header + .content {
    padding: 0.7rem 0.7rem 1rem 0.7rem;
  }
}
</style>
