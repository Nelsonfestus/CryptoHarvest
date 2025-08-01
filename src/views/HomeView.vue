<template>
  <div>
    <Hero />
    <TopInvestor />
    <Investing />
    <Letter />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import TopInvestor from '../components/TopInvestor.vue'
import Investing from '../components/Investing.vue'
import Letter from '../components/Letter.vue'
export default {
  name: 'HomeView',
  components: { Hero, TopInvestor, Investing, Letter },
}
</script>
