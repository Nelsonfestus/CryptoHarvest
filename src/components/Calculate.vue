<template>
  <!-- calculate-section -->
  <section class="calculate-section">
    <!-- amount -->
    <div class="amount">
      <label for="amount">Amount</label>
      <input type="text" placeholder="Enter Amount" />
    </div>

    <!-- amount -->
    <div class="amount">
      <label for="plan">Investment Plan</label>
      <!-- dropdown-menu -->
      <div class="dropdown-menu custom-plan-dropdown">
        <div class="dropdown-selected" @click="toggleplanDropdown">
          {{ investmentPlan || 'Investment Plan' }}
          <span class="dropdown-arrow">&#9662;</span>
        </div>
        <ul v-show="planDropdownOpen" class="dropdown-list">
          <li
            v-for="plan in plans"
            :key="plan"
            @click="selectplan(plan)"
            :class="{ active: investmentPlan === plan }"
          >
            {{ plan }}
          </li>
        </ul>
      </div>
    </div>

    <!-- calculator -->
    <div class="calculator">
      <img src="../assets/calculator.png" alt="calculator" />
    </div>
  </section>

  <!-- Track Section -->
  <Track />
</template>

<script>
import Track from './Track.vue'
export default {
  name: 'Calculate',
  components: { Track },
  data() {
    return {
      menuOpen: false,
      isDesktop: window.innerWidth > 768,
      planDropdownOpen: false,
      investmentPlan: '',
      plans: ['Gold', 'Silver', 'Platinum'],
      isNavbarHidden: false,
      isNavbarAnimated: false,
      lastScrollY: 0,
      scrollTimeout: null,
      isGlass: false,
    }
  },
  methods: {
    toggleplanDropdown() {
      this.planDropdownOpen = !this.planDropdownOpen
    },
    selectplan(plan) {
      this.investmentPlan = plan
      this.planDropdownOpen = false
    },
  },
}
</script>

<style scoped>
.calculate-section {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  padding: 40px 40px 120px;
  display: flex;
  justify-content: space-between;
}

.amount,
.calculator {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
}

label {
  margin-bottom: 10px;
}

input {
  padding: 12px 10px;
  background: #202020;
  color: #888;
  border-radius: 12px;
  border: none;
  outline: none;
}

.calculator {
  align-items: center;
}

.calculator img {
  width: 25%;
}

/* .dropdown-menu select {
    background: #181818;
    color: #888;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    transition:
        background 0.3s,
        color 0.3s,
        box-shadow 0.3s;
    cursor: pointer;
} */

/* Style dropdown options with hover effect using ::v-deep for Vue scoped CSS */
::v-deep .dropdown-menu select option:hover,
::v-deep .dropdown-menu select option:focus {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.custom-plan-dropdown {
  position: relative;
  min-width: 150px;
}

.dropdown-selected {
  background: #202020;
  color: #888;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  transition:
    background 0.3s,
    color 0.3s;
}

.dropdown-arrow {
  margin-left: 10px;
  font-size: 12px;
}

.dropdown-list {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #181818;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-list li {
  padding: 10px 16px;
  color: #888;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
  font-size: 14px;
}

.dropdown-list li:hover,
.dropdown-list li.active {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

/* Media Responsiveness */
@media (max-width: 768px) {
  .calculate-section {
    padding: 30px 15px;
    flex-direction: column;
    gap: 20px;
  }

  .amount,
  .calculator {
    width: 100%;
  }

  .calculator img {
    width: 65%;
  }
}
</style>
