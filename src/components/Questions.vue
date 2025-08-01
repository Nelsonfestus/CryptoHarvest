<template>
  <div class="container">
    <div class="questions-header animate-text-stagger">
      <h2 class="animate-text-slide">Frequently Asked Questions</h2>
      <p class="animate-text-slide">
        Get answers to common questions about our investment platform
      </p>
    </div>

    <Accordion />
  </div>
</template>

<script>
import Accordion from '@/components/Accordion.vue'

export default {
  name: 'Questions',
  components: {
    Accordion,
  },
}
</script>

<style scoped>
.container {
  background: var(--bg-dark);
  color: var(--text-white);
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-top: calc(var(--spacing-xxl) + 80px); /* Add extra top padding for fixed navbar */
  text-align: center;
}

.questions-header {
  text-align: center;
  margin-bottom: 30px;
}

.questions-header h2 {
  font-size: 50px;
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.questions-header p {
  font-size: 18px;
  color: var(--text-muted);
  line-height: 1.6;
}

@media screen and (max-width: 1200px) {
  .container {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .questions-header h2 {
    font-size: clamp(20px, 4vh, 25px);
  }

  .questions-header p {
    font-size: clamp(14px, 3vh, 16px);
  }
}
</style>
