<template>
  <div class="chat-support-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="header-info">
        <h2>💬 Live Support</h2>
        <span class="status" :class="isOnline ? 'online' : 'offline'">
          {{ isOnline ? 'Online' : 'Offline' }}
        </span>
      </div>
      <div class="header-actions">
        <button class="minimize-btn" @click="toggleChat">
          {{ isMinimized ? '🔽' : '🔼' }}
        </button>
        <button class="close-btn" @click="closeChat">✕</button>
      </div>
    </div>

    <!-- Chat Body -->
    <div v-if="!isMinimized" class="chat-body">
      <!-- Messages Area -->
      <div class="messages-container" ref="messagesContainer">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          class="message"
          :class="message.sender"
        >
          <div class="message-avatar">
            <img 
              :src="message.sender === 'user' ? userAvatar : supportAvatar" 
              :alt="message.sender === 'user' ? 'You' : 'Support'"
            />
          </div>
          <div class="message-content">
            <div class="message-header">
              <span class="sender-name">
                {{ message.sender === 'user' ? 'You' : 'Support Team' }}
              </span>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
            <div class="message-text" v-html="formatMessage(message.text)"></div>
            <div v-if="message.attachments && message.attachments.length" class="attachments">
              <div 
                v-for="attachment in message.attachments" 
                :key="attachment.id"
                class="attachment"
              >
                <span class="attachment-icon">📎</span>
                <span class="attachment-name">{{ attachment.name }}</span>
                <button class="download-btn" @click="downloadAttachment(attachment)">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="message support typing">
          <div class="message-avatar">
            <img :src="supportAvatar" alt="Support" />
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <button 
          v-for="action in quickActions" 
          :key="action.id"
          class="quick-action-btn"
          @click="sendQuickMessage(action.message)"
        >
          {{ action.text }}
        </button>
      </div>

      <!-- Message Input -->
      <div class="message-input-container">
        <div class="input-actions">
          <button class="action-btn" @click="toggleFileUpload">
            📎
          </button>
          <button class="action-btn" @click="toggleEmojiPicker">
            😊
          </button>
        </div>
        
        <div class="input-wrapper">
          <textarea
            v-model="newMessage"
            @keydown.enter.prevent="sendMessage"
            placeholder="Type your message..."
            class="message-input"
            rows="1"
            ref="messageInput"
          ></textarea>
          
          <button 
            class="send-btn" 
            @click="sendMessage"
            :disabled="!newMessage.trim()"
          >
            ➤
          </button>
        </div>

        <!-- File Upload -->
        <input
          ref="fileInput"
          type="file"
          multiple
          @change="handleFileUpload"
          style="display: none"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />

        <!-- Emoji Picker -->
        <div v-if="showEmojiPicker" class="emoji-picker">
          <div class="emoji-grid">
            <button 
              v-for="emoji in emojis" 
              :key="emoji"
              class="emoji-btn"
              @click="addEmoji(emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Support Ticket Modal -->
    <div v-if="showTicketModal" class="modal-overlay" @click="showTicketModal = false">
      <div class="modal" @click.stop>
        <h3>Create Support Ticket</h3>
        <div class="ticket-form">
          <div class="form-group">
            <label>Subject:</label>
            <input 
              v-model="ticketSubject" 
              type="text" 
              placeholder="Brief description of your issue"
            />
          </div>
          <div class="form-group">
            <label>Category:</label>
            <select v-model="ticketCategory">
              <option value="">Select category</option>
              <option value="investment">Investment Issues</option>
              <option value="payment">Payment Problems</option>
              <option value="technical">Technical Support</option>
              <option value="account">Account Issues</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Priority:</label>
            <select v-model="ticketPriority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div class="form-group">
            <label>Description:</label>
            <textarea 
              v-model="ticketDescription" 
              placeholder="Please provide detailed information about your issue..."
              rows="4"
            ></textarea>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="showTicketModal = false">Cancel</button>
          <button @click="createTicket" :disabled="!ticketSubject || !ticketCategory">
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSupport',
  data() {
    return {
      isMinimized: false,
      isOnline: true,
      isTyping: false,
      newMessage: '',
      showEmojiPicker: false,
      showTicketModal: false,
      ticketSubject: '',
      ticketCategory: '',
      ticketPriority: 'medium',
      ticketDescription: '',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      supportAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      messages: [
        {
          id: 1,
          sender: 'support',
          text: 'Hello! Welcome to CryptoHarvest support. How can I help you today?',
          timestamp: new Date(Date.now() - 60000),
          attachments: []
        }
      ],
      quickActions: [
        {
          id: 1,
          text: 'Investment Help',
          message: 'I need help with my investment'
        },
        {
          id: 2,
          text: 'Payment Issue',
          message: 'I have a payment problem'
        },
        {
          id: 3,
          text: 'Account Access',
          message: 'I can\'t access my account'
        },
        {
          id: 4,
          text: 'Create Ticket',
          message: 'I want to create a support ticket'
        }
      ],
      emojis: ['😊', '👍', '👎', '❤️', '🔥', '💯', '🎉', '😎', '🤔', '😢', '😡', '🤝', '💪', '🚀', '💰', '📈', '🎯', '✅', '❌', '⚠️']
    }
  },
  methods: {
    toggleChat() {
      this.isMinimized = !this.isMinimized
    },
    closeChat() {
      this.$emit('close-chat')
    },
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    formatMessage(text) {
      // Convert URLs to clickable links
      return text.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" style="color: #eb6709;">$1</a>'
      )
    },
    sendMessage() {
      if (!this.newMessage.trim()) return

      const message = {
        id: Date.now(),
        sender: 'user',
        text: this.newMessage,
        timestamp: new Date(),
        attachments: []
      }

      this.messages.push(message)
      this.newMessage = ''
      this.scrollToBottom()

      // Simulate support response
      this.simulateTyping()
    },
    sendQuickMessage(message) {
      if (message === 'I want to create a support ticket') {
        this.showTicketModal = true
        return
      }

      this.newMessage = message
      this.sendMessage()
    },
    simulateTyping() {
      this.isTyping = true
      
      setTimeout(() => {
        this.isTyping = false
        
        const responses = [
          'I understand your concern. Let me help you with that.',
          'Thank you for reaching out. I\'ll look into this for you.',
          'I can see the issue. Let me provide you with a solution.',
          'This is a common question. Here\'s what you need to know...',
          'I\'ll escalate this to our technical team for further assistance.'
        ]
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        const supportMessage = {
          id: Date.now() + 1,
          sender: 'support',
          text: randomResponse,
          timestamp: new Date(),
          attachments: []
        }
        
        this.messages.push(supportMessage)
        this.scrollToBottom()
      }, 2000)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    toggleFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileUpload(event) {
      const files = event.target.files
      for (let file of files) {
        const attachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        }
        
        const message = {
          id: Date.now(),
          sender: 'user',
          text: `Sent file: ${file.name}`,
          timestamp: new Date(),
          attachments: [attachment]
        }
        
        this.messages.push(message)
      }
      
      this.scrollToBottom()
      event.target.value = ''
    },
    downloadAttachment(attachment) {
      // Simulate file download
      console.log('Downloading:', attachment.name)
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker
    },
    addEmoji(emoji) {
      this.newMessage += emoji
      this.showEmojiPicker = false
      this.$refs.messageInput.focus()
    },
    createTicket() {
      const ticket = {
        subject: this.ticketSubject,
        category: this.ticketCategory,
        priority: this.ticketPriority,
        description: this.ticketDescription,
        timestamp: new Date()
      }
      
      console.log('Creating ticket:', ticket)
      
      // Add ticket message to chat
      const message = {
        id: Date.now(),
        sender: 'support',
        text: `Support ticket created successfully! Ticket ID: #${Math.floor(Math.random() * 10000)}. We'll get back to you within 24 hours.`,
        timestamp: new Date(),
        attachments: []
      }
      
      this.messages.push(message)
      this.showTicketModal = false
      this.ticketSubject = ''
      this.ticketCategory = ''
      this.ticketPriority = 'medium'
      this.ticketDescription = ''
      this.scrollToBottom()
    }
  },
  mounted() {
    this.scrollToBottom()
  }
}
</script>

<style scoped>
.chat-support-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  background: #1a1a1a;
  border-radius: 15px;
  border: 1px solid #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-info h2 {
  margin: 0;
  font-size: 1.1rem;
}

.status {
  font-size: 0.8rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.status.online {
  background: #4ade80;
  color: #000;
}

.status.offline {
  background: #ef4444;
  color: #fff;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.minimize-btn,
.close-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.minimize-btn:hover,
.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.chat-body {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  display: flex;
  gap: 10px;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message.support {
  align-self: flex-start;
}

.message-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  background: #2a2a2a;
  padding: 10px 15px;
  border-radius: 15px;
  border: 1px solid #333;
}

.message.user .message-content {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 0.8rem;
}

.sender-name {
  font-weight: 600;
  color: #ffa600;
}

.message.user .sender-name {
  color: #fff;
}

.message-time {
  color: #ccc;
  font-size: 0.7rem;
}

.message-text {
  line-height: 1.4;
  word-wrap: break-word;
}

.message-text a {
  color: #eb6709;
  text-decoration: none;
}

.message.user .message-text a {
  color: #fff;
  text-decoration: underline;
}

.attachments {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.attachment {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.8rem;
}

.attachment-icon {
  font-size: 1rem;
}

.attachment-name {
  flex: 1;
  color: #ccc;
}

.download-btn {
  background: #eb6709;
  color: #fff;
  border: none;
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 0.7rem;
  cursor: pointer;
}

.typing-indicator {
  display: flex;
  gap: 3px;
  padding: 10px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #ccc;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.quick-actions {
  padding: 10px 15px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  border-top: 1px solid #333;
}

.quick-action-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  background: #eb6709;
  border-color: #eb6709;
}

.message-input-container {
  padding: 15px;
  border-top: 1px solid #333;
  position: relative;
}

.input-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.action-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: color 0.3s ease;
}

.action-btn:hover {
  color: #eb6709;
}

.input-wrapper {
  display: flex;
  gap: 10px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 10px 15px;
  color: #fff;
  font-size: 0.9rem;
  resize: none;
  outline: none;
  font-family: inherit;
}

.message-input:focus {
  border-color: #eb6709;
}

.send-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.emoji-picker {
  position: absolute;
  bottom: 100%;
  left: 15px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  max-width: 200px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
}

.emoji-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.emoji-btn:hover {
  background: #333;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: #1a1a1a;
  border-radius: 15px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  border: 1px solid #333;
}

.modal h3 {
  margin-bottom: 20px;
  color: #ffa600;
  text-align: center;
}

.ticket-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #ccc;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.9rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #eb6709;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
}

.modal-actions button {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.modal-actions button:first-child {
  background: #333;
  color: #fff;
}

.modal-actions button:last-child {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.modal-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 480px) {
  .chat-support-container {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
  
  .message {
    max-width: 90%;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-action-btn {
    text-align: center;
  }
}
</style> 