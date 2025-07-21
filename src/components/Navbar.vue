<template>
  <!-- navbar-container -->
  <header>
    <!-- overlay for mobile menu -->
    <div v-if="menuOpen && !isDesktop" class="menu-overlay" @click="toggleMenu"></div>
    <!-- navbar -->
    <nav :class="['navbar', { open: menuOpen && !isDesktop }]">
      <div class="navbar-header-row">
        <!-- logo -->
        <div class="logo">
          <img src="../assets/logo-1.png" alt="" />
        </div>
        <!-- menu toggle button -->
        <button class="menu-toggle" :class="{ toggled: menuOpen }" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
      <!-- navbar-links -->
      <ul class="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Investment Plans</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Blog</a></li>
      </ul>
      <!-- dropdown-menu -->
      <div class="dropdown-menu custom-country-dropdown">
        <div class="dropdown-selected" @click="toggleCountryDropdown">
          {{ selectedCountry || 'Select Country' }}
          <span class="dropdown-arrow">&#9662;</span>
        </div>
        <ul v-show="countryDropdownOpen" class="dropdown-list">
          <li
            v-for="country in countries"
            :key="country"
            @click="selectCountry(country)"
            :class="{ active: selectedCountry === country }"
          >
            {{ country }}
          </li>
        </ul>
      </div>
      <!-- button section -->
      <div class="btn">
        <!-- sign up -->
        <a href="#" class="btn1">
          <button>Login</button>
        </a>
        <!-- login -->
        <a href="#" class="btn2">
          <button>Sign Up</button>
        </a>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      isDesktop: window.innerWidth > 768,
      countryDropdownOpen: false,
      selectedCountry: '',
      countries: ['USA', 'UK', 'Canada'],
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    handleResize() {
      this.isDesktop = window.innerWidth > 768
      if (this.isDesktop) this.menuOpen = false
    },
    toggleCountryDropdown() {
      this.countryDropdownOpen = !this.countryDropdownOpen
    },
    selectCountry(country) {
      this.selectedCountry = country
      this.countryDropdownOpen = false
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style scoped>
header {
  background: #151515;
  padding: 10px 40px;
}

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 15px;
}

.logo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo img {
  width: 70px;
  height: 70px;
}

.menu-toggle {
  order: 2;
  margin-left: auto;
  display: none;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 1001;
}
.menu-toggle .bar {
  display: block;
  width: 28px;
  height: 3px;
  margin: 6px auto;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}
.menu-toggle.toggled .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.menu-toggle.toggled .bar:nth-child(2) {
  opacity: 0;
}
.menu-toggle.toggled .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.navbar-links {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.navbar-links li a {
  text-align: center;
  text-decoration: none;
  color: #e9e9e9;
  transition:
    background 0.3s,
    color 0.3s;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
}

.navbar-links li a:hover {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(246, 61, 67, 0.15);
}

.btn {
  display: flex;
  gap: 20px;
}

.btn button {
  background: #222;
  color: #fff;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    background 0.3s,
    color 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

.btn button:hover {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(246, 61, 67, 0.15);
}

.dropdown-menu select {
  background: #181818;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  transition:
    background 0.3s,
    color 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

/* Style dropdown options with hover effect using ::v-deep for Vue scoped CSS */
::v-deep .dropdown-menu select option:hover,
::v-deep .dropdown-menu select option:focus {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
}

.custom-country-dropdown {
  position: relative;
  min-width: 150px;
}
.dropdown-selected {
  background: #181818;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
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
  color: #fff;
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

.menu-overlay {
  position: fixed;
  top: 50%;
  left: 0;
  /* width: 100vw; */
  height: 100vh;
  background: #333;
  z-index: 999;
  transition: opacity 0.3s;
}

@media (max-width: 834px) {
  header {
    padding: 10px;
  }

  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar-header-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    flex: none;
    justify-content: flex-start;
  }

  .menu-toggle {
    display: block;
    margin-left: auto;
  }

  .navbar-links,
  .dropdown-menu,
  .btn {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    /* width: 100vw; */
    background: transparent;
    box-shadow: none;
  }

  .navbar.open .navbar-links,
  .navbar.open .dropdown-menu,
  .navbar.open .btn {
    display: flex !important;
  }

  .navbar-links li a {
    background: transparent;
    width: 100%;
    text-align: left;
  }

  .custom-country-dropdown {
    width: 100%;
    margin: 10px 0 0 0;
  }
}
</style>
