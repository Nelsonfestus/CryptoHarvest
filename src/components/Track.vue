<template>
  <!-- track-section -->
  <section class="track-section">
    <h1>Everything you need to fast track your investment</h1>

    <!-- track-cards -->
    <div class="track-cards">
      <template v-for="(card, idx) in cards" :key="idx">
        <div class="card-wrapper">
          <div class="card">
            <router-link :to="card.link" class="card-link">
              <div class="card-text">
                <h3>{{ card.title }}</h3>
                <p>{{ card.text }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="idx < cards.length - 1" class="card-divider"></div>
      </template>
    </div>
  </section>
  <Investing />
</template>

<script>
import Investing from './Investing.vue'
export default {
  name: 'Track',
  components: { Investing },
  data() {
    return {
      cards: [
        {
          title: 'Retirement planning',
          text: 'Long before retirement even hits our radars, we’re planning what type of education, skills training and professional designations we’ll acquire. we also spend a lot of time planning which industries are the best place to work in, and which employers to work for. once employed, we carefully..',
          link: '/about',
        },
        {
          title: 'Financial planning',
          text: 'Many individuals confuse financial planning with general savings and investing advice. while how to save (and how much!), and where and when to invest those savings, is every bit important, prudent financial planning goes much beyond the realm of just saving and investing. the sooner you understand....',
          link: '/plans',
        },
        {
          title: 'Succession planning for business owners',
          text: 'Introduction when entrepreneurs start a business, the last thing on their minds is succession planning. most business owners spend a lot of time – as they should – on operations plans, marketing plans, capital-spending plans, maintenance planning, staffing plans…and more. but what about succession...',
          link: '/contact',
        },
      ],
    }
  },
}
</script>

<style scoped>
.track-section {
  background: #202020;
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.track-section h1 {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  font-size: 30px;
  width: 50%;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.track-cards {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.card-wrapper {
  border: 2px solid;
  border-image: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  border-image-slice: 1;
  border-radius: 16px !important;
  padding: 4px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card {
  background: #151515;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 20px 40px;
}

.card-link {
  text-decoration: none !important;
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-divider {
  width: 2px;
  height: 60px;
  background: #ccc;
  align-self: center;
  margin: 0 12px;
  border-radius: 2px;
}

.card-text h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #eb6709;
  font-size: 20px;
}

.card-text p {
  line-height: 1.6;
  color: #e9e9e9;
}

.card-wrapper:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 834px) {
  .track-section {
    padding: 24px 20px;
  }

  .track-section h1 {
    width: 100%;
    font-size: 18px;
  }

  .track-cards {
    flex-direction: column;
  }

  .card-wrapper {
    width: 100%;
  }

  .card-divider {
    width: 60px;
    height: 2px;
    margin: 12px 0;
    align-self: center;
  }
}

@media (max-width: 900px) {
  .track-cards {
    flex-direction: column;
    align-items: center;
    overflow-x: unset;
  }

  .card-wrapper {
    width: 100%;
    min-width: unset;
    max-width: unset;
  }

  .card-divider {
    width: 60px;
    height: 2px;
    margin: 12px 0;
    align-self: center;
  }
}

@media (max-width: 600px) {
  .track-section {
    padding: 12px 2vw;
  }

  .track-section h1 {
    font-size: 1.1rem;
    margin-bottom: 12px;
  }

  .card {
    padding: 10px 2px;
    min-width: 0;
    font-size: 0.95rem;
  }

  .card-text h3 {
    font-size: 1rem;
    margin-bottom: 6px;
    width: 100%;
  }

  .card p {
    font-size: 0.92rem;
  }

  .card-divider {
    width: 40px;
    height: 2px;
    margin: 8px 0;
  }
}
</style>
