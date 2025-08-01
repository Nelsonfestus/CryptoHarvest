export const authMixin = {
  methods: {
    validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email)
    },

    validatePassword(password) {
      return password.length >= 6
    },

    validatePasswordMatch(password, confirmPassword) {
      return password === confirmPassword
    },

    validateRequiredFields(fields) {
      for (const [key, value] of Object.entries(fields)) {
        if (!value || value.trim() === '') {
          return {
            isValid: false,
            field: key,
            message: `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          }
        }
      }
      return { isValid: true }
    },

    async handleLogin(email, password) {
      console.log('handleLogin called with:', { email, password })
      
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('cryptoharvest_user')
      console.log('Stored user data:', storedUser)
      
      if (storedUser) {
        const user = JSON.parse(storedUser)
        console.log('Parsed user:', user)

        // Check if email and password match
        if (user.email === email && user.password === password) {
          console.log('Credentials match! Setting authentication...')
          // Set authentication status
          localStorage.setItem('cryptoharvest_isAuthenticated', 'true')
          return { success: true, user }
        } else {
          console.log('Credentials do not match. Expected:', { email: user.email }, 'Got:', { email, password })
        }
      } else {
        console.log('No stored user found in localStorage')
      }

      return {
        success: false,
        message: 'Invalid email or password. Please check your credentials or sign up.',
      }
    },

    async handleSignup(userData) {
      console.log('handleSignup called with:', userData)
      
      // Check if user already exists
      const existingUser = localStorage.getItem('cryptoharvest_user')
      console.log('Existing user check:', existingUser)
      
      if (existingUser) {
        const user = JSON.parse(existingUser)
        if (user.email === userData.email) {
          console.log('User already exists with this email')
          return { success: false, message: 'User with this email already exists.' }
        }
      }

      // Store new user
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString(),
        investments: [],
        balance: 0,
      }

      console.log('Storing new user:', newUser)
      localStorage.setItem('cryptoharvest_user', JSON.stringify(newUser))
      localStorage.setItem('cryptoharvest_isAuthenticated', 'true')
      
      console.log('User stored successfully. Authentication set to true.')

      return { success: true, user: newUser }
    },

    async handleAdminLogin(email, password) {
      // Simple admin validation (in production, this should be server-side)
      const adminCredentials = {
        email: 'admin@cryptoharvest.com',
        password: 'admin123',
      }

      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('cryptoharvest_admin', 'true')
        localStorage.setItem('cryptoharvest_isAuthenticated', 'true')
        return { success: true }
      }

      return { success: false, message: 'Invalid admin credentials.' }
    },

    logout() {
      localStorage.removeItem('cryptoharvest_isAuthenticated')
      localStorage.removeItem('cryptoharvest_admin')
      this.$router.push('/')
    },

    isAuthenticated() {
      return localStorage.getItem('cryptoharvest_isAuthenticated') === 'true'
    },

    isAdmin() {
      return localStorage.getItem('cryptoharvest_admin') === 'true'
    },

    getCurrentUser() {
      const userData = localStorage.getItem('cryptoharvest_user')
      return userData ? JSON.parse(userData) : null
    },

    updateUser(userData) {
      localStorage.setItem('cryptoharvest_user', JSON.stringify(userData))
    },
  },
}
