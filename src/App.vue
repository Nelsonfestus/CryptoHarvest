<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import TawkToChat from './components/TawkToChat.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    TawkToChat,
  },
}
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
  <TawkToChat />
</template>

<style src="./assets/main.css"></style>
