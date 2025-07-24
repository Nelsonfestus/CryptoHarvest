<template>
  <section class="blog-section animate-fade-slide">
    <h2 class="blog-title">Latest Blog Posts</h2>
    <div class="blog-list">
      <div class="blog-card animate-fade-slide" v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p class="blog-summary">{{ post.summary }}</p>
        <div class="blog-meta">
          <span class="blog-date"><i class="fas fa-calendar-alt"></i> {{ post.date }}</span>
          <button class="blog-btn">Read More</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlogList',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'How to Start Investing in 2024',
          summary:
            'A beginner-friendly guide to getting started with investing, including tips, strategies, and common mistakes to avoid.',
          date: '2024-06-01',
        },
        {
          id: 2,
          title: 'Top 5 Investment Strategies for Long-Term Growth',
          summary:
            'Explore the best strategies for building wealth over time, from index funds to real estate and more.',
          date: '2024-05-20',
        },
        {
          id: 3,
          title: 'Understanding Risk and Reward in the Stock Market',
          summary:
            'Learn how to balance risk and reward, diversify your portfolio, and make informed investment decisions.',
          date: '2024-05-10',
        },
      ],
    }
  },
}
</script>

<style scoped>
.blog-section {
  background: #202020;
  color: #fff;
  padding: 40px 60px;
  text-align: center;
}
.blog-title {
  margin-top: 80px;
  font-size: 2rem;
  margin-bottom: 24px;
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.blog-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
}
.blog-card {
  background: #181818;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.blog-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow:
    0 8px 32px rgba(235, 103, 9, 0.12),
    0 2px 12px rgba(0, 0, 0, 0.1);
}
.blog-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #eb6709;
  text-align: left;
}
.blog-summary {
  color: #e9e9e9;
  margin-bottom: 18px;
  text-align: left;
}
.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.blog-date {
  color: #ccc;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.blog-btn {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s,
    color 0.3s;
}
.blog-btn:hover {
  background: #fff;
  color: #eb6709;
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
@media (max-width: 1000px) {
  .blog-list {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
@media (max-width: 600px) {
  .blog-section {
    padding: 20px 8px;
  }
  .blog-title {
    font-size: 1.3rem;
  }
  .blog-card {
    padding: 18px 8px;
  }
}
</style>
