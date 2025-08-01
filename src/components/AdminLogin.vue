<template>
  <BaseAuthForm
    title="Admin Login"
    :form-fields="formFields"
    submit-text="Login as Admin"
    loading-text="Logging in..."
    link-text="Back to"
    link-action="User Login"
    link-route="/login"
    @submit="handleAdminLoginSubmit"
  />
</template>

<script>
import BaseAuthForm from './BaseAuthForm.vue'
import { authMixin } from '../mixins/authMixin.js'

export default {
  name: 'AdminLogin',
  components: {
    BaseAuthForm,
  },
  mixins: [authMixin],
  data() {
    return {
      formFields: [
        {
          name: 'email',
          label: 'Admin Email',
          type: 'email',
          required: true,
          placeholder: 'Enter admin email',
        },
        {
          name: 'password',
          label: 'Admin Password',
          type: 'password',
          required: true,
          placeholder: 'Enter admin password',
        },
      ],
    }
  },
  methods: {
    async handleAdminLoginSubmit(formData) {
      // Validate email
      if (!this.validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address.')
      }

      // Validate password
      if (!formData.password) {
        throw new Error('Password is required.')
      }

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Attempt admin login using mixin method
      const result = await this.handleAdminLogin(formData.email, formData.password)

      if (result.success) {
        // Redirect to admin dashboard
        this.$router.push('/admin')
      } else {
        throw new Error(result.message)
      }
    },
  },
}
</script>

<style scoped>
/* No additional styles needed - all styling is handled by BaseAuthForm */
</style>
