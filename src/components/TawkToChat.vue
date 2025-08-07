<template>
  <div class="tawk-chat-container">
    <!-- Tawk.to widget will be loaded here -->
    <div id="tawkto-container"></div>
  </div>
</template>

<script>
export default {
  name: 'TawkToChat',
  data() {
    return {
      tawkToId: '6893e6bb171f1719311eb0e0', // Your Tawk.to Site ID
      tawkToKey: '1j20rqjdi' // Your Tawk.to Widget Key
    }
  },
  mounted() {
    this.loadTawkTo()
  },
  methods: {
    loadTawkTo() {
      // Create Tawk.to script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://embed.tawk.to/${this.tawkToId}/${this.tawkToKey}`
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      
      // Add script to head
      document.head.appendChild(script)
      
      // Initialize Tawk.to with user data if available
      script.onload = () => {
        if (window.Tawk_API) {
          // Set user data if user is logged in
          const user = JSON.parse(localStorage.getItem('user') || '{}')
          if (user.email) {
            window.Tawk_API.visitor = {
              name: user.user_metadata?.name || user.email,
              email: user.email
            }
          }
        }
      }
    },
    
    // Method to show/hide chat widget
    showChat() {
      if (window.Tawk_API) {
        window.Tawk_API.showWidget()
      }
    },
    
    hideChat() {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget()
      }
    },
    
    // Method to maximize/minimize chat widget
    maximizeChat() {
      if (window.Tawk_API) {
        window.Tawk_API.maximize()
      }
    },
    
    minimizeChat() {
      if (window.Tawk_API) {
        window.Tawk_API.minimize()
      }
    }
  }
}
</script>

<style scoped>
.tawk-chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

#tawkto-container {
  /* Tawk.to will style this automatically */
}
</style> 