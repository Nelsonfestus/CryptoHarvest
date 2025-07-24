<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>

<style src="./assets/main.css"></style>
