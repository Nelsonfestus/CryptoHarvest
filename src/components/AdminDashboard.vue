<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div class="header-top">
        <h1>Admin Dashboard</h1>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
      <div class="header-stats">
        <div class="stat-card">
          <h3>{{ stats.totalUsers }}</h3>
          <p>Total Users</p>
    </div>
      <div class="stat-card">
          <h3>{{ stats.totalInvestments }}</h3>
          <p>Total Investments</p>
      </div>
      <div class="stat-card">
          <h3>{{ stats.totalBalance }}</h3>
          <p>Total Balance</p>
      </div>
      <div class="stat-card">
          <h3>{{ stats.activeChats }}</h3>
          <p>Active Chats</p>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <!-- Investors Management Section -->
      <div class="section">
        <div class="section-header">
          <h2>Investors Management</h2>
          <button @click="refreshInvestors" class="refresh-btn">Refresh</button>
        </div>
        
        <div class="investors-table">
          <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
                <th>Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="investor in investors" :key="investor.id">
                <td>{{ investor.name }}</td>
                <td>{{ investor.email }}</td>
                <td>
                  <span class="balance">${{ investor.wallet_balance || 0 }}</span>
                  <button @click="editBalance(investor)" class="edit-btn">Edit</button>
                </td>
                <td>
                  <span :class="['status', investor.is_verified ? 'verified' : 'pending']">
                    {{ investor.is_verified ? 'Verified' : 'Pending' }}
                  </span>
                </td>
                <td>
                  <button @click="viewInvestorDetails(investor)" class="view-btn">View</button>
                  <button @click="toggleVerification(investor)" class="verify-btn">
                    {{ investor.is_verified ? 'Unverify' : 'Verify' }}
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

      <!-- Chat Support Section -->
      <div class="section">
        <div class="section-header">
          <h2>Chat Support</h2>
          <button @click="refreshChats" class="refresh-btn">Refresh</button>
      </div>

        <div class="chat-list">
          <div v-for="chat in chats" :key="chat._id" class="chat-item">
            <div class="chat-header">
              <span class="user-name">{{ chat.user?.name || 'Unknown User' }}</span>
              <span :class="['chat-status', chat.status]">{{ chat.status }}</span>
            </div>
            <div class="chat-preview">
              <p>{{ chat.lastMessage || 'No messages yet' }}</p>
            </div>
            <div class="chat-actions">
              <button @click="openChat(chat)" class="chat-btn">Open Chat</button>
              <button @click="assignAgent(chat)" class="assign-btn">Assign Agent</button>
            </div>
          </div>
          </div>
        </div>
      </div>

    <!-- Balance Edit Modal -->
    <div v-if="showBalanceModal" class="modal-overlay" @click="closeBalanceModal">
      <div class="modal" @click.stop>
        <h3>Edit Balance</h3>
        <div class="modal-content">
          <p><strong>User:</strong> {{ selectedInvestor?.name }}</p>
          <p><strong>Current Balance:</strong> ${{ selectedInvestor?.wallet_balance || 0 }}</p>
          <div class="form-group">
            <label>New Balance:</label>
            <input 
              type="number" 
              v-model="newBalance" 
              placeholder="Enter new balance"
              step="0.01"
            />
          </div>
          <div class="modal-actions">
            <button @click="saveBalance" class="save-btn">Save</button>
            <button @click="closeBalanceModal" class="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Modal -->
    <div v-if="showChatModal" class="modal-overlay" @click="closeChatModal">
      <div class="chat-modal" @click.stop>
        <div class="chat-header">
          <h3>Chat with {{ selectedChat?.user?.name }}</h3>
          <button @click="closeChatModal" class="close-btn">×</button>
        </div>
        <div class="chat-messages" ref="chatMessages">
          <div v-for="message in chatMessages" :key="message._id" class="message">
            <div :class="['message-content', message.sender === 'admin' ? 'admin' : 'user']">
              <p>{{ message.content }}</p>
              <span class="message-time">{{ formatTime(message.createdAt) }}</span>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input 
            v-model="newMessage" 
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
          />
          <button @click="sendMessage" class="send-btn">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../lib/supabase'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: {
        totalUsers: 0,
        totalInvestments: 0,
        totalBalance: 0,
        activeChats: 0
      },
      investors: [],
      chats: [],
      showBalanceModal: false,
      showChatModal: false,
      selectedInvestor: null,
      selectedChat: null,
      newBalance: 0,
      newMessage: '',
      chatMessages: [],
      loading: false
    }
  },
  async mounted() {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin')
    if (!isAdmin) {
      this.$router.push('/admin-login')
      return
    }

    await this.loadDashboardData()
  },
  methods: {
    async loadDashboardData() {
      try {
        // Load investors
        await this.loadInvestors()
        
        // Load chats
        await this.loadChats()
        
        // Calculate stats
        await this.calculateStats()
        
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      }
    },

    async loadInvestors() {
      try {
        const { data: users, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error loading users:', error)
          return
        }
        
        this.investors = users || []
      } catch (error) {
        console.error('Error loading investors:', error)
      }
    },

    async loadChats() {
      try {
        const { data: chats, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) {
          console.error('Error loading chats:', error)
          return
        }
        
        this.chats = chats || []
      } catch (error) {
        console.error('Error loading chats:', error)
      }
    },

    async calculateStats() {
      try {
        // Get total users
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
        
        // Get total balance
        const { data: users } = await supabase
          .from('users')
          .select('wallet_balance')
        
        const totalBalance = users?.reduce((sum, user) => sum + (user.wallet_balance || 0), 0) || 0
        
        // Get active chats (messages from last 24 hours)
        const { count: activeChats } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        
        this.stats = {
          totalUsers: totalUsers || 0,
          totalInvestments: 0, // Will be implemented when investments table is ready
          totalBalance: totalBalance,
          activeChats: activeChats || 0
        }
      } catch (error) {
        console.error('Error calculating stats:', error)
      }
    },

    editBalance(investor) {
      this.selectedInvestor = investor
      this.newBalance = investor.wallet_balance || 0
      this.showBalanceModal = true
    },

    async saveBalance() {
      try {
        const { error } = await supabase
          .from('users')
          .update({ wallet_balance: parseFloat(this.newBalance) })
          .eq('id', this.selectedInvestor.id)
        
        if (error) {
          console.error('Error updating balance:', error)
          return
        }
        
        // Update local data
        this.selectedInvestor.wallet_balance = parseFloat(this.newBalance)
        this.closeBalanceModal()
        await this.calculateStats() // Refresh stats
      } catch (error) {
        console.error('Error updating balance:', error)
      }
    },

    closeBalanceModal() {
      this.showBalanceModal = false
      this.selectedInvestor = null
      this.newBalance = 0
    },

    async toggleVerification(investor) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ is_verified: !investor.is_verified })
          .eq('id', investor.id)
        
        if (error) {
          console.error('Error updating verification status:', error)
          return
        }
        
        investor.is_verified = !investor.is_verified
      } catch (error) {
        console.error('Error updating verification status:', error)
      }
    },

    viewInvestorDetails(investor) {
      // Navigate to investor details page or show modal
      console.log('View investor details:', investor)
    },

    async logout() {
      try {
        await supabase.auth.signOut()
        localStorage.removeItem('user')
        localStorage.removeItem('session')
        localStorage.removeItem('isAdmin')
        this.$router.push('/admin-login')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    },

    async openChat(chat) {
      this.selectedChat = chat
      this.showChatModal = true
      await this.loadChatMessages(chat._id)
    },

    async loadChatMessages(chatId) {
      try {
        const token = localStorage.getItem('cryptoharvest_token')
        const response = await fetch(`https://web-production-8d9eb.up.railway.app/api/chat/${chatId}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          this.chatMessages = data.messages || []
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        }
      } catch (error) {
        console.error('Error loading chat messages:', error)
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) return
      
      try {
        const token = localStorage.getItem('cryptoharvest_token')
        const response = await fetch(`https://web-production-8d9eb.up.railway.app/api/chat/${this.selectedChat._id}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.newMessage,
            sender: 'admin'
          })
        })
        
        if (response.ok) {
          this.newMessage = ''
          await this.loadChatMessages(this.selectedChat._id)
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },

    async assignAgent(chat) {
      try {
        const token = localStorage.getItem('cryptoharvest_token')
        const response = await fetch(`https://web-production-8d9eb.up.railway.app/api/admin/chats/${chat._id}/assign`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            agentId: 'admin' // Assign to admin for now
          })
        })
        
        if (response.ok) {
          chat.status = 'in_progress'
          chat.agent = { name: 'Admin' }
        }
      } catch (error) {
        console.error('Error assigning agent:', error)
      }
    },

    closeChatModal() {
      this.showChatModal = false
      this.selectedChat = null
      this.chatMessages = []
      this.newMessage = ''
    },

    scrollToBottom() {
      const chatMessages = this.$refs.chatMessages
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    },

    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    },

    refreshInvestors() {
      this.loadInvestors()
    },

    refreshChats() {
      this.loadChats()
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logout-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c82333;
}

.dashboard-header {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.dashboard-header h1 {
  margin: 0 0 20px 0;
  color: #333;
}

.header-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.stat-card h3 {
  font-size: 2rem;
  margin: 0 0 10px 0;
}

.stat-card p {
  margin: 0;
  opacity: 0.9;
}

.dashboard-content {
  display: grid;
  gap: 20px;
}

.section {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  color: #333;
}

.refresh-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #0056b3;
}

/* Investors Table */
.investors-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background: #f8f9fa;
  font-weight: 600;
}

.balance {
  font-weight: 600;
  color: #28a745;
}

.edit-btn, .view-btn, .verify-btn {
  margin: 2px;
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background: #ffc107;
  color: #212529;
}

.view-btn {
  background: #17a2b8;
  color: white;
}

.verify-btn {
  background: #28a745;
  color: white;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status.verified {
  background: #d4edda;
  color: #155724;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

/* Chat List */
.chat-list {
  display: grid;
  gap: 15px;
}

.chat-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #f8f9fa;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.chat-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.chat-status.open {
  background: #d1ecf1;
  color: #0c5460;
}

.chat-status.in_progress {
  background: #fff3cd;
  color: #856404;
}

.chat-status.resolved {
  background: #d4edda;
  color: #155724;
}

.chat-preview {
  margin-bottom: 10px;
}

.chat-preview p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.chat-actions {
  display: flex;
  gap: 10px;
}

.chat-btn, .assign-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.chat-btn {
  background: #007bff;
  color: white;
}

.assign-btn {
  background: #6c757d;
  color: white;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal, .chat-modal {
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.chat-modal {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.modal-content {
  margin-bottom: 20px;
}

.form-group {
  margin: 15px 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.save-btn, .cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn {
  background: #28a745;
  color: white;
}

.cancel-btn {
  background: #6c757d;
  color: white;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 15px;
}

.message {
  margin-bottom: 10px;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 8px;
  position: relative;
}

.message-content.admin {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.message-content.user {
  background: #e9ecef;
  color: #333;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 5px;
  display: block;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.send-btn {
  padding: 10px 20px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-btn:hover {
  background: #218838;
}
</style> 