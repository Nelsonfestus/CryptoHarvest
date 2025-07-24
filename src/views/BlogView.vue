<template>
  <BlogList />
</template>

<script>
import BlogList from '../components/BlogList.vue'
export default {
  name: 'BlogView',
  components: { BlogList },
}
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2rem;
}
</style>
