<template>
  <div>
    <Hero />
    <TopInvestor />
    <Letter />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import TopInvestor from '../components/TopInvestor.vue'
import Letter from '../components/Letter.vue'
export default {
  name: 'HomeView',
  components: { Hero, TopInvestor, Letter },
}
</script>
