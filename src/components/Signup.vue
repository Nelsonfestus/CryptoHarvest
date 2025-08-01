<template>
  <BaseAuthForm
    title="Create Your Account"
    :form-fields="formFields"
    submit-text="Sign Up"
    loading-text="Signing up..."
    link-text="Already have an account?"
    link-action="Login"
    link-route="/login"
    :show-wallet-info="true"
    @submit="handleSignupSubmit"
  />
</template>

<script>
import BaseAuthForm from './BaseAuthForm.vue'
import { authMixin } from '../mixins/authMixin.js'

export default {
  name: 'Signup',
  components: {
    BaseAuthForm,
  },
  mixins: [authMixin],
  data() {
    return {
      formFields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your name',
        },
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
          placeholder: 'Create a password',
        },
        {
          name: 'confirm',
          label: 'Confirm Password',
          type: 'password',
          required: true,
          placeholder: 'Confirm your password',
        },
      ],
    }
  },
  methods: {
    async handleSignupSubmit(formData) {
      // Validate required fields
      const validation = this.validateRequiredFields(formData)
      if (!validation.isValid) {
        throw new Error(validation.message)
      }

      // Validate email format
      if (!this.validateEmail(formData.email)) {
        throw new Error('Please enter a valid email address.')
      }

      // Validate password length
      if (!this.validatePassword(formData.password)) {
        throw new Error('Password must be at least 6 characters long.')
      }

      // Validate password match
      if (!this.validatePasswordMatch(formData.password, formData.confirm)) {
        throw new Error('Passwords do not match.')
      }

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Attempt signup using mixin method
      const result = await this.handleSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

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
