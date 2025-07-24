<template>
  <div>
    <Hero />
    <Letter />
  </div>
</template>

<script>
import Hero from '../components/Hero.vue'
import Letter from '../components/Letter.vue'
export default {
  name: 'HomeView',
  components: { Hero, Letter },
}
</script>
