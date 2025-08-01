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
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <Footer />
    <ChatBox />
  </div>
</template>

<style src="./assets/main.css"></style>
