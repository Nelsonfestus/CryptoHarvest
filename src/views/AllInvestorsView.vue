<template>
  <div class="all-investors-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1>All Investors</h1>
        <p>Discover our community of successful investors and their achievements</p>
      </div>
    </div>

    <!-- Search and Filter Section -->
    <div class="filters-section">
      <div class="container">
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search investors by name..."
            class="search-input"
          />
          <button class="search-btn">🔍</button>
        </div>

        <div class="filter-options">
          <select v-model="selectedPortfolio" class="filter-select">
            <option value="">All Portfolios</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>

          <select v-model="sortBy" class="filter-select">
            <option value="rank">Sort by Rank</option>
            <option value="roi">Sort by ROI</option>
            <option value="invested">Sort by Invested Amount</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Investors Grid -->
    <div class="investors-section">
      <div class="container">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-number">{{ filteredInvestors.length }}</span>
            <span class="stat-label">Total Investors</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${{ formatNumber(totalInvested) }}</span>
            <span class="stat-label">Total Invested</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ averageROI }}%</span>
            <span class="stat-label">Average ROI</span>
          </div>
        </div>

        <div class="investors-grid">
          <div
            v-for="investor in paginatedInvestors"
            :key="investor.id"
            class="investor-card"
            :class="investor.rank <= 3 ? `top-${investor.rank}` : ''"
          >
            <div class="rank-badge">#{{ investor.rank }}</div>

            <div class="investor-avatar">
              <img :src="investor.avatar" :alt="investor.name" />
              <div v-if="investor.rank === 1" class="crown-icon">👑</div>
              <div v-else-if="investor.rank === 2" class="medal-icon">🥈</div>
              <div v-else-if="investor.rank === 3" class="medal-icon">🥉</div>
            </div>

            <div class="investor-info">
              <h3>{{ investor.name }}</h3>
              <p class="investor-title">{{ investor.title }}</p>

              <div class="investment-stats">
                <div class="stat">
                  <span class="stat-label">Total Invested</span>
                  <span class="stat-value">${{ formatNumber(investor.totalInvested) }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">ROI</span>
                  <span class="stat-value profit">+{{ investor.roi }}%</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Portfolio</span>
                  <span class="stat-value">{{ investor.portfolio }}</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Join Date</span>
                  <span class="stat-value">{{ formatDate(investor.joinDate) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1" class="pagination-btn">
            ← Previous
          </button>

          <div class="page-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="['page-btn', { active: page === currentPage }]"
            >
              {{ page }}
            </button>
          </div>

          <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn">
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllInvestorsView',
  data() {
    return {
      searchQuery: '',
      selectedPortfolio: '',
      sortBy: 'rank',
      currentPage: 1,
      itemsPerPage: 12,
      investors: [
        // Top 10 investors with detailed info
        {
          id: 1,
          rank: 1,
          name: 'Alexander Chen',
          title: 'Crypto Pioneer',
          totalInvested: 125000,
          roi: 45.2,
          portfolio: 'Platinum',
          joinDate: '2023-01-15',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 2,
          rank: 2,
          name: 'Kimberly Leathers',
          title: 'Tech Investor',
          totalInvested: 98500,
          roi: 38.7,
          portfolio: 'Gold',
          joinDate: '2023-02-20',
          avatar: '../assets/kimberly.jpg',
        },
        {
          id: 3,
          rank: 3,
          name: 'Michael Rodriguez',
          title: 'Finance Expert',
          totalInvested: 87200,
          roi: 32.1,
          portfolio: 'Silver',
          joinDate: '2023-01-30',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 4,
          rank: 4,
          name: 'Emma Wilson',
          title: 'Startup Founder',
          totalInvested: 76800,
          roi: 28.9,
          portfolio: 'Gold',
          joinDate: '2023-03-10',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 5,
          rank: 5,
          name: 'David Kim',
          title: 'Blockchain Developer',
          totalInvested: 65400,
          roi: 25.6,
          portfolio: 'Silver',
          joinDate: '2023-02-15',
          avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 6,
          rank: 6,
          name: 'Lisa Thompson',
          title: 'Real Estate Investor',
          totalInvested: 58900,
          roi: 22.3,
          portfolio: 'Gold',
          joinDate: '2023-03-05',
          avatar:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 7,
          rank: 7,
          name: 'James Anderson',
          title: 'Venture Capitalist',
          totalInvested: 54200,
          roi: 19.8,
          portfolio: 'Platinum',
          joinDate: '2023-01-25',
          avatar:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 8,
          rank: 8,
          name: 'Sarah Johnson',
          title: 'Tech Entrepreneur',
          totalInvested: 49800,
          roi: 18.5,
          portfolio: 'Gold',
          joinDate: '2023-02-28',
          avatar:
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 9,
          rank: 9,
          name: 'Robert Chen',
          title: 'Investment Analyst',
          totalInvested: 45600,
          roi: 17.2,
          portfolio: 'Silver',
          joinDate: '2023-03-15',
          avatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        },
        {
          id: 10,
          rank: 10,
          name: 'Maria Garcia',
          title: 'Financial Advisor',
          totalInvested: 42300,
          roi: 16.8,
          portfolio: 'Gold',
          joinDate: '2023-02-10',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        },
        // Additional 40 investors with generated data
        ...Array.from({ length: 40 }, (_, i) => ({
          id: i + 11,
          rank: i + 11,
          name: this.generateName(),
          title: this.generateTitle(),
          totalInvested: Math.floor(Math.random() * 40000) + 10000,
          roi: (Math.random() * 20 + 5).toFixed(1),
          portfolio: ['Platinum', 'Gold', 'Silver'][Math.floor(Math.random() * 3)],
          joinDate: this.generateDate(),
          avatar: this.generateAvatar(),
        })),
      ],
    }
  },
  computed: {
    filteredInvestors() {
      let filtered = this.investors

      // Search filter
      if (this.searchQuery) {
        filtered = filtered.filter(
          (investor) =>
            investor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            investor.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
        )
      }

      // Portfolio filter
      if (this.selectedPortfolio) {
        filtered = filtered.filter((investor) => investor.portfolio === this.selectedPortfolio)
      }

      // Sort
      filtered.sort((a, b) => {
        switch (this.sortBy) {
          case 'roi':
            return parseFloat(b.roi) - parseFloat(a.roi)
          case 'invested':
            return b.totalInvested - a.totalInvested
          case 'name':
            return a.name.localeCompare(b.name)
          default:
            return a.rank - b.rank
        }
      })

      return filtered
    },
    paginatedInvestors() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredInvestors.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.filteredInvestors.length / this.itemsPerPage)
    },
    visiblePages() {
      const pages = []
      const maxVisible = 5
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2))
      let end = Math.min(this.totalPages, start + maxVisible - 1)

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1)
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      return pages
    },
    totalInvested() {
      return this.filteredInvestors.reduce((sum, investor) => sum + investor.totalInvested, 0)
    },
    averageROI() {
      const totalROI = this.filteredInvestors.reduce(
        (sum, investor) => sum + parseFloat(investor.roi),
        0,
      )
      return (totalROI / this.filteredInvestors.length).toFixed(1)
    },
  },
  methods: {
    formatNumber(num) {
      return num.toLocaleString()
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      this.currentPage = page
    },
    generateName() {
      const firstNames = [
        'John',
        'Jane',
        'Mike',
        'Sarah',
        'Alex',
        'Emma',
        'David',
        'Lisa',
        'Chris',
        'Anna',
        'Tom',
        'Rachel',
        'Mark',
        'Jessica',
        'Paul',
        'Amanda',
        'Steve',
        'Nicole',
        'Kevin',
        'Michelle',
      ]
      const lastNames = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Garcia',
        'Miller',
        'Davis',
        'Rodriguez',
        'Martinez',
        'Hernandez',
        'Lopez',
        'Gonzalez',
        'Wilson',
        'Anderson',
        'Thomas',
        'Taylor',
        'Moore',
        'Jackson',
        'Martin',
      ]

      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
    },
    generateTitle() {
      const titles = [
        'Crypto Trader',
        'Investment Manager',
        'Financial Analyst',
        'Tech Investor',
        'Portfolio Manager',
        'Wealth Advisor',
        'Trading Specialist',
        'Market Analyst',
        'Investment Strategist',
        'Financial Consultant',
      ]
      return titles[Math.floor(Math.random() * titles.length)]
    },
    generateDate() {
      const start = new Date('2023-01-01')
      const end = new Date('2024-01-01')
      const randomDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      )
      return randomDate.toISOString().split('T')[0]
    },
    generateAvatar() {
      const avatars = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      ]
      return avatars[Math.floor(Math.random() * avatars.length)]
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1
    },
    selectedPortfolio() {
      this.currentPage = 1
    },
  },
}
</script>

<style scoped>
.all-investors-page {
  background: #151515;
  min-height: 100vh;
  color: #fff;
}

.page-header {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 60px 0;
  text-align: center;
  border-bottom: 1px solid #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header h1 {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 3%;
  font-size: 3rem;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.page-header p {
  color: #ffa600;
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.filters-section {
  background: #1a1a1a;
  padding: 30px 0;
  border-bottom: 1px solid #333;
}

.search-bar {
  display: flex;
  max-width: 400px;
  margin: 0 auto 20px;
}

.search-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #333;
  border-radius: 8px 0 0 8px;
  background: #2a2a2a;
  color: #fff;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #eb6709;
}

.search-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 12px 15px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  font-size: 1rem;
}

.filter-options {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 10px 15px;
  border: 1px solid #333;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.9rem;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #eb6709;
}

.investors-section {
  padding: 40px 0;
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  border: 1px solid #333;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #eb6709;
  margin-bottom: 5px;
}

.stat-label {
  color: #ccc;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.investors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.investor-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px;
  padding: 25px;
  position: relative;
  border: 1px solid #333;
  transition: all 0.3s ease;
  overflow: hidden;
}

.investor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.investor-card:hover::before {
  opacity: 1;
}

.investor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(235, 103, 9, 0.15);
  border-color: #eb6709;
}

.rank-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.top-1 .rank-badge {
  background: linear-gradient(90deg, #ffd700 0%, #ffed4e 100%);
  color: #000;
}

.top-2 .rank-badge {
  background: linear-gradient(90deg, #c0c0c0 0%, #e5e5e5 100%);
  color: #000;
}

.top-3 .rank-badge {
  background: linear-gradient(90deg, #cd7f32 0%, #daa520 100%);
  color: #fff;
}

.investor-avatar {
  position: relative;
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
}

.investor-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #eb6709;
}

.crown-icon,
.medal-icon {
  position: absolute;
  top: -3px;
  right: -3px;
  font-size: 1.2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.investor-info {
  text-align: center;
}

.investor-info h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
}

.investor-title {
  color: #ffa600;
  font-size: 0.8rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.investment-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #333;
  font-size: 0.85rem;
}

.stat:last-child {
  border-bottom: none;
}

.stat-label {
  color: #ccc;
}

.stat-value {
  color: #fff;
  font-weight: 600;
}

.stat-value.profit {
  color: #4ade80;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.pagination-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.pagination-btn:hover:not(:disabled) {
  background: #eb6709;
  border-color: #eb6709;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.page-btn:hover {
  background: #eb6709;
  border-color: #eb6709;
}

.page-btn.active {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  border-color: #eb6709;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2rem;
  }

  .stats-bar {
    flex-direction: column;
    gap: 20px;
  }

  .investors-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .filter-options {
    flex-direction: column;
    align-items: center;
  }

  .pagination {
    flex-direction: column;
    gap: 10px;
  }

  .page-numbers {
    order: -1;
  }
}
</style>
