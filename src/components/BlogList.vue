<template>
  <section class="blog-section">
    <div class="blog-header animate-text-stagger">
      <h1 class="animate-text-slide">Latest News & Insights</h1>
      <p class="animate-text-slide">
        Stay updated with the latest cryptocurrency trends and investment strategies
      </p>
    </div>

    <div class="blog-grid">
      <div class="blog-card animate-text-fade" v-for="post in posts" :key="post.id">
        <div class="blog-image">
          <img :src="post.image" :alt="post.title" />
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span class="blog-date">{{ post.date }}</span>
            <span class="blog-category">{{ post.category }}</span>
          </div>
          <h3 class="blog-title">{{ post.title }}</h3>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.id}`" class="read-more">Read More</router-link>
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
          title: 'Getting Started with Cryptocurrency Investment',
          excerpt:
            'Learn the basics of cryptocurrency investing and how to build your first digital asset portfolio.',
          date: 'January 15, 2024',
          category: 'Beginners',
          image:
            'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
        },
        {
          id: 2,
          title: 'Top 5 Investment Strategies for Long-Term Growth',
          excerpt:
            'Explore the best strategies for building wealth over time, from index funds to real estate and more.',
          date: 'January 10, 2024',
          category: 'Strategy',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        },
        {
          id: 3,
          title: 'Understanding Risk and Reward in the Stock Market',
          excerpt:
            'Learn how to balance risk and reward, diversify your portfolio, and make informed investment decisions.',
          date: 'January 5, 2024',
          category: 'Education',
          image:
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
        },
        {
          id: 4,
          title: 'Cryptocurrency Investment: Opportunities and Risks',
          excerpt:
            'Navigate the volatile world of cryptocurrency investing with expert insights and risk management strategies.',
          date: 'December 28, 2023',
          category: 'Cryptocurrency',
          image:
            'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
        },
        {
          id: 5,
          title: 'Building a Retirement Portfolio That Lasts',
          excerpt:
            'Create a retirement strategy that provides income security and growth potential throughout your golden years.',
          date: 'December 20, 2023',
          category: 'Retirement',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        },
        {
          id: 6,
          title: 'The Psychology of Successful Investing',
          excerpt:
            'Master the mental aspects of investing to avoid common psychological traps and make better financial decisions.',
          date: 'December 15, 2023',
          category: 'Psychology',
          image:
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
        },
      ],
    }
  },
}
</script>

<style scoped>
.blog-section {
  background: var(--bg-dark);
  color: var(--text-white);
  padding: var(--spacing-xxl) var(--spacing-xl);
  padding-top: calc(var(--spacing-xxl) + 80px); /* Add extra top padding for fixed navbar */
}

.blog-header {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.blog-header h1 {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--spacing-md);
}

.blog-header p {
  font-size: var(--font-size-lg);
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.blog-card {
  background: var(--bg-darker);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.blog-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-content {
  padding: var(--spacing-xl);
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-sm);
}

.blog-date {
  color: var(--text-muted);
}

.blog-category {
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.blog-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--text-white);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
}

.blog-excerpt {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.read-more {
  color: var(--primary-orange);
  text-decoration: none;
  font-weight: 600;
  transition: color var(--transition-normal);
}

.read-more:hover {
  color: var(--text-gold);
}

@media (max-width: 768px) {
  .blog-section {
    padding: var(--spacing-xl) var(--spacing-lg);
  }

  .blog-header h1 {
    font-size: var(--font-size-2xl);
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .blog-content {
    padding: var(--spacing-lg);
  }
}
</style>
