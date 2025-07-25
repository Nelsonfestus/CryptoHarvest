<template>
  <div>
    <div class="chatbox-toggle" @click="toggleChat">
      <span v-if="!open">💬</span>
      <span v-else>✖</span>
    </div>
    <div v-if="open" class="chatbox-container">
      <div class="chatbox-header">CryptoHarvest Chat</div>
      <div class="chatbox-messages">
        <div v-for="(msg, idx) in messages" :key="idx" :class="['chatbox-message', msg.from]">
          <span>{{ msg.text }}</span>
        </div>
      </div>
      <form class="chatbox-input" @submit.prevent="sendMessage">
        <input v-model="input" type="text" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data() {
    return {
      open: false,
      input: '',
      messages: [{ from: 'bot', text: 'Welcome to CryptoHarvest! How can we help you?' }],
    }
  },
  methods: {
    toggleChat() {
      this.open = !this.open
    },
    sendMessage() {
      if (this.input.trim()) {
        this.messages.push({ from: 'user', text: this.input })
        // Simulate bot reply
        setTimeout(() => {
          this.messages.push({
            from: 'bot',
            text: 'Thank you for your message! We will get back to you soon.',
          })
        }, 800)
        this.input = ''
      }
    },
  },
}
</script>

<style scoped>
.chatbox-toggle {
  position: fixed;
  bottom: 90px; /* Move up to avoid scroll-top button */
  right: 32px;
  background: #f63d43;
  color: #fff;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.chatbox-container {
  position: fixed;
  bottom: 158px; /* Move up to avoid scroll-top button */
  right: 32px;
  width: 320px;
  background: #222;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  z-index: 2001;
}
.chatbox-header {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  padding: 12px 16px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
}
.chatbox-messages {
  padding: 12px;
  min-height: 120px;
  max-height: 220px;
  overflow-y: auto;
  background: #181818;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chatbox-message {
  padding: 8px 12px;
  border-radius: 8px;
  max-width: 80%;
  word-break: break-word;
}
.chatbox-message.user {
  align-self: flex-end;
  background: #f63d43;
  color: #fff;
}
.chatbox-message.bot {
  align-self: flex-start;
  background: #333;
  color: #ffa600;
}
.chatbox-input {
  display: flex;
  border-top: 1px solid #333;
}
.chatbox-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom-left-radius: 12px;
  background: #222;
  color: #eb6709;
  font-size: 1rem;
}
.chatbox-input button {
  background: #eb6709;
  color: #fff;
  border: none;
  padding: 0 18px;
  border-bottom-right-radius: 12px;
  cursor: pointer;
  font-weight: bold;
}
@media (max-width: 600px) {
  .chatbox-toggle {
    bottom: 80px;
    right: 16px;
  }
  .chatbox-container {
    bottom: 120px;
    right: 8px;
    width: 98vw;
    max-width: 98vw;
  }
}
</style>
