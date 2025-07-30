<template>
  <section class="top-investor-section">
    <div class="container">
      <h2>Top Investors</h2>
      <p>Meet our most successful investors and learn from their strategies</p>
      
      <div class="investors-grid">
        <!-- Top Investor 1 -->
        <div class="investor-card top-1">
          <div class="rank-badge">#1</div>
          <div class="investor-avatar">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Top Investor" />
            <div class="crown-icon">👑</div>
          </div>
          <div class="investor-info">
            <h3>Alexander Chen</h3>
            <p class="investor-title">Crypto Pioneer</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$125,000</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+45.2%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Platinum</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Investor 2 -->
        <div class="investor-card top-2">
          <div class="rank-badge">#2</div>
          <div class="investor-avatar">
            <img src="../assets/kimberly.jpg" alt="Kimberly Leathers" />
            <div class="medal-icon">🥈</div>
          </div>
          <div class="investor-info">
            <h3>Kimberly Leathers</h3>
            <p class="investor-title">Tech Investor</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$98,500</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+38.7%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Gold</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Investor 3 -->
        <div class="investor-card top-3">
          <div class="rank-badge">#3</div>
          <div class="investor-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Top Investor" />
            <div class="medal-icon">🥉</div>
          </div>
          <div class="investor-info">
            <h3>Michael Rodriguez</h3>
            <p class="investor-title">Finance Expert</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$87,200</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+32.1%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Silver</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Investor 4 -->
        <div class="investor-card">
          <div class="rank-badge">#4</div>
          <div class="investor-avatar">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" alt="Top Investor" />
          </div>
          <div class="investor-info">
            <h3>Emma Wilson</h3>
            <p class="investor-title">Startup Founder</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$76,800</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+28.9%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Gold</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Investor 5 -->
        <div class="investor-card">
          <div class="rank-badge">#5</div>
          <div class="investor-avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" alt="Top Investor" />
          </div>
          <div class="investor-info">
            <h3>David Kim</h3>
            <p class="investor-title">Blockchain Developer</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$65,400</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+25.6%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Silver</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Investor 6 -->
        <div class="investor-card">
          <div class="rank-badge">#6</div>
          <div class="investor-avatar">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" alt="Top Investor" />
          </div>
          <div class="investor-info">
            <h3>Lisa Thompson</h3>
            <p class="investor-title">Real Estate Investor</p>
            <div class="investment-stats">
              <div class="stat">
                <span class="stat-label">Total Invested</span>
                <span class="stat-value">$58,900</span>
              </div>
              <div class="stat">
                <span class="stat-label">ROI</span>
                <span class="stat-value profit">+22.3%</span>
              </div>
              <div class="stat">
                <span class="stat-label">Portfolio</span>
                <span class="stat-value">Gold</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="view-all-container">
        <button class="view-all-btn" @click="goToAllInvestors">View All Investors</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopInvestor',
  methods: {
    goToAllInvestors() {
      this.$router.push('/all-investors')
    }
  }
}
</script>

<style scoped>
.top-investor-section {
  background: #151515;
  padding: 80px 0;
  color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.top-investor-section h2 {
  text-align: center;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.top-investor-section p {
  text-align: center;
  color: #ffa600;
  font-size: 1.1rem;
  margin-bottom: 50px;
  line-height: 1.6;
}

.investors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.investor-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 20px;
  padding: 30px;
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
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(235, 103, 9, 0.15);
  border-color: #eb6709;
}

.rank-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
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
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
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
  top: -5px;
  right: -5px;
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.investor-info {
  text-align: center;
}

.investor-info h3 {
  color: #fff;
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-weight: 600;
}

.investor-title {
  color: #ffa600;
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.investment-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #333;
}

.stat:last-child {
  border-bottom: none;
}

.stat-label {
  color: #ccc;
  font-size: 0.9rem;
}

.stat-value {
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
}

.stat-value.profit {
  color: #4ade80;
}

.view-all-container {
  text-align: center;
}

.view-all-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.view-all-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(235, 103, 9, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .top-investor-section {
    padding: 60px 0;
  }

  .top-investor-section h2 {
    font-size: 2rem;
  }

  .investors-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .investor-card {
    padding: 25px;
  }

  .investor-avatar {
    width: 70px;
    height: 70px;
  }

  .investor-info h3 {
    font-size: 1.2rem;
  }

  .stat {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .investor-card {
    padding: 20px;
  }

  .rank-badge {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style> 