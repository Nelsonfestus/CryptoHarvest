<template>
  <div class="container animate-fade-slide">
    <div class="Questions_header_section">
      <div class="Question_title">
        <h1>Frequently Asked Questions</h1>
      </div>
    </div>
    <Accordion />
  </div>
</template>

<script>
import Accordion from '@/components/Accordion.vue'

export default {
  name: 'Questions',
  components: {
    Accordion,
  },
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.container {
  background-color: #151515;
  padding: 40px 60px;
}

.Questions_header_section {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 30px;
}

.Question_title h1 {
  width: 99%;
  font-weight: 800;
  font-size: 50px;
  background: linear-gradient(45deg, #f83201, #ffa600);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.animate-fade-slide {
  opacity: 0;
  transform: translateY(40px);
  animation: fadeSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
}
@keyframes fadeSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media screen and (max-width: 1200px) {
  * {
    padding: 0;
    margin: 0;
  }

  .container {
    padding: 20px 16px;
  }

  .Question_title h1 {
    font-size: clamp(20px, 4vh, 25px);
    line-height: 31.2px;
    font-weight: 600;
    width: 100%;
  }

  .Questions_header_section {
    display: flex;
    justify-content: center;
    padding-top: 2cm;
    padding-bottom: 1cm;
  }
}
</style>
