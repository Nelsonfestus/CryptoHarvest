<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p>{{ stats.totalUsers }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Investments</h3>
        <p>${{ formatNumber(stats.totalInvestments) }}</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p>${{ formatNumber(stats.totalRevenue) }}</p>
      </div>
    </div>

    <div class="admin-content">
      <div class="tab-nav">
        <button @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }">Users</button>
        <button @click="activeTab = 'investments'" :class="{ active: activeTab === 'investments' }">Investments</button>
        <button @click="activeTab = 'settings'" :class="{ active: activeTab === 'settings' }">Settings</button>
      </div>

      <div v-if="activeTab === 'users'" class="tab-content">
        <h2>User Management</h2>
        <div v-if="users.length === 0" class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>No Users Yet</h3>
          <p>User data will appear here once users start registering on the platform.</p>
        </div>
        <table v-else class="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.status }}</td>
              <td>
                <button @click="toggleUserStatus(user)">{{ user.status === 'active' ? 'Suspend' : 'Activate' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="activeTab === 'investments'" class="tab-content">
        <h2>Investment Plans</h2>
        <div class="investment-cards">
          <div v-for="plan in investments" :key="plan.id" class="investment-card">
            <h3>{{ plan.name }}</h3>
            <p>ROI: {{ plan.roi }}%</p>
            <p>Duration: {{ plan.duration }} days</p>
            <button @click="editPlan(plan)">Edit</button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'settings'" class="tab-content">
        <h2>System Settings</h2>
        <div class="settings">
          <div class="setting">
            <label>Maintenance Mode</label>
            <input type="checkbox" v-model="settings.maintenanceMode" />
          </div>
          <div class="setting">
            <label>Registration Enabled</label>
            <input type="checkbox" v-model="settings.registrationEnabled" />
          </div>
          <button @click="saveSettings">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      activeTab: 'users',
      stats: {
        totalUsers: 0,
        totalInvestments: 0,
        totalRevenue: 0
      },
      users: [],
      investments: [
        { id: 1, name: 'Gold Plan', roi: 5, duration: 30 },
        { id: 2, name: 'Silver Plan', roi: 10, duration: 60 },
        { id: 3, name: 'Platinum Plan', roi: 20, duration: 90 }
      ],
      settings: {
        maintenanceMode: false,
        registrationEnabled: true
      }
    }
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString()
    },
    logout() {
      localStorage.removeItem('cryptoharvest_admin')
      this.$router.push('/admin-login')
    },
    toggleUserStatus(user) {
      user.status = user.status === 'active' ? 'suspended' : 'active'
    },
    editPlan(plan) {
      console.log('Editing plan:', plan)
    },
    saveSettings() {
      console.log('Saving settings:', this.settings)
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  background: #0a0a0a;
  min-height: 100vh;
  color: #fff;
  padding: 20px;
  padding-top: 100px; /* Add top padding to account for fixed navbar */
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  color: #eb6709;
  margin: 0;
}

.logout-btn {
  background: #f63d43;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
  text-align: center;
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #ccc;
}

.stat-card p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #eb6709;
}

.tab-nav {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-nav button {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}

.tab-nav button.active {
  background: #eb6709;
}

.tab-content {
  background: #1a1a1a;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #333;
}

.tab-content h2 {
  color: #eb6709;
  margin-top: 0;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #333;
}

/* Empty State Styles */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #ccc;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.7;
}

.empty-state h3 {
  color: #ffa600;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.empty-state p {
  color: #ccc;
  font-size: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.users-table th {
  background: #0a0a0a;
  color: #eb6709;
}

.investment-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.investment-card {
  background: #0a0a0a;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
}

.investment-card h3 {
  color: #eb6709;
  margin-top: 0;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.setting label {
  color: #ccc;
}

button {
  background: #eb6709;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .admin-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-nav {
    flex-direction: column;
  }
  
  .investment-cards {
    grid-template-columns: 1fr;
  }
}
</style> 