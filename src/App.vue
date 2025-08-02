<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ChatBox from './components/ChatBox.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ChatBox,
  },
}
</script>

<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
  <ChatBox />
</template>

<style src="./assets/main.css"></style>
