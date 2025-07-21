<template>
  <section class="investment-section">
    <h2>Our Investment Plans</h2>
    <p>Choose from a variety of plans tailored to your needs and goals.</p>
    <div class="investment-cards">
      <!-- gold -->
      <div class="investment-card gold">
        <div class="plan-img"><img src="../assets/star.png" alt="Gold" /></div>
        <h3>Gold Plan</h3>
        <!-- plan-features -->
        <ul class="plan-features">
          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Minimum</div>
            <div class="feature price-value">1,500.00 USD</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Maximum</div>
            <div class="feature price-value">5,000.00 USD</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>For</div>
            <div class="feature price-value">30 Days</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>ROI Back</div>
            <div class="feature price-value">5%</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Capital Back</div>
            <div class="feature price-value">Yes</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature">Affiliate Bonus</div>
            <div class="feature price-value"><button class="view-all-btn">View All</button></div>
          </div>
        </ul>
        <button>Learn More</button>
      </div>
      <!-- silver -->
      <div class="investment-card silver">
        <div class="plan-img"><img src="../assets/silver.png" alt="Silver" /></div>
        <h3>Silver Plan</h3>
        <ul class="plan-features">
          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Minimum</div>
            <div class="feature price-value">5,000.00 USD</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Maximum</div>
            <div class="feature price-value">20,000.00 USD</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>For</div>
            <div class="feature price-value">60 Days</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>ROI Back</div>
            <div class="feature price-value">10%</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Capital Back</div>
            <div class="feature price-value">Yes</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature">Affiliate Bonus</div>
            <div class="feature price-value"><button class="view-all-btn">View All</button></div>
          </div>
        </ul>
        <button>Learn More</button>
      </div>
      <!-- platinum -->
      <div class="investment-card platinum">
        <div class="plan-img"><img src="../assets/platinum.png" alt="Platinum" /></div>
        <h3>Platinum Plan</h3>
        <ul class="plan-features">
          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Minimum</div>
            <div class="feature price-value">20,000.00 USD</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Maximum</div>
            <div class="feature price-value">Unlimited</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>For</div>
            <div class="feature price-value">90 Days</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>ROI Back</div>
            <div class="feature price-value">20%</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature"><i class="fas fa-check-circle check-icon"></i>Capital Back</div>
            <div class="feature price-value">Yes</div>
          </div>

          <!-- price -->
          <div class="price">
            <div class="feature">Affiliate Bonus</div>
            <div class="feature price-value"><button class="view-all-btn">View All</button></div>
          </div>
        </ul>
        <button>Learn More</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Investment',
}
</script>

<style scoped>
.investment-section {
  width: 100%;
  margin: 40px auto 0 auto;
  padding: 32px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  text-align: center;
}

.investment-section h2 {
  font-size: 2rem;
  margin-bottom: 12px;
  color: #eb6709;
}

.investment-section p {
  color: #fff;
  font-size: 1.1rem;
}

.investment-cards {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}

.investment-card {
  background: #181818;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 50px 10px;
  width: 30%;
  color: #fff;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.plan-img {
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plan-img img {
  width: 25%;
  object-fit: contain;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  font-size: 1rem;
  color: #fff;
  text-align: left;
}

.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  gap: 12px;
  margin-bottom: 8px;
  width: 100%;
  flex-wrap: nowrap;
}
.feature,
.price-value {
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.price-value {
  font-weight: 700;
  color: #eb6709;
  justify-content: flex-end;
}

.tick-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
}

.check-icon {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-size: 1.1em;
  margin-right: 8px;
  vertical-align: middle;
}

.investment-card.gold h3 {
  color: #ffd700;
}

.investment-card.silver h3 {
  color: #c0c0c0;
}

.investment-card.platinum h3 {
  color: #e5e4e2;
}

.investment-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}

.investment-card h3 {
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.investment-card p {
  font-size: 1rem;
  margin-bottom: 18px;
}

.investment-card button {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  width: 50%;
  margin: auto;
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s,
    box-shadow 0.3s;
}

.investment-card button:hover {
  background: #fff;
  color: #eb6709;
  box-shadow: 0 2px 12px rgba(235, 103, 9, 0.15);
}

.view-all-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-all-btn:hover {
  background: #fff;
  color: #eb6709;
}

@media (max-width: 900px) {
  .investment-cards {
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  .investment-card {
    width: 95%;
    max-width: 350px;
  }
}
</style>
