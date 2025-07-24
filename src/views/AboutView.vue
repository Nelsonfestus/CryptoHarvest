<template>
  <div>
    <Community/>
  </div>
  <div>
    <Questions/>
  </div>
  
</template>

<script>
import Community from '@/components/Community.vue';
import Questions from '@/components/Questions.vue';
export default {
  name:'about',
  components: {
    Community,
    Questions,
  }
}
</script>

<style>

</style>
