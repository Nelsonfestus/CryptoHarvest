<template>
  <BaseAuthForm
    title="Login to Your Account"
    :form-fields="formFields"
    submit-text="Login"
    loading-text="Logging in..."
    link-text="Don't have an account?"
    link-action="Sign Up"
    link-route="/signup"
    @submit="handleLoginSubmit"
  />
</template>

<script>
import BaseAuthForm from './BaseAuthForm.vue'
import { authMixin } from '../mixins/authMixin.js'

export default {
  name: 'Login',
  components: {
    BaseAuthForm,
  },
  mixins: [authMixin],
  data() {
    return {
      formFields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Enter your email',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          required: true,
          placeholder: 'Enter your password',
        },
      ],
    }
  },
  methods: {
    async handleLoginSubmit(formData) {
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

      // Attempt login using mixin method
      const result = await this.handleLogin(formData.email, formData.password)

      if (result.success) {
        // Redirect to dashboard
        this.$router.push('/dashboard')
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
