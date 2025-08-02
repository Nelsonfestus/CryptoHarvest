<template>
  <section class="blog-section animate-fade-slide">
    <h2 class="blog-title">Latest Blog Posts</h2>
    <div class="blog-list">
      <div class="blog-card animate-fade-slide" v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p class="blog-summary">{{ post.summary }}</p>
        <div class="blog-meta">
          <button class="blog-btn" @click="showBlogDetails(post)">Read More</button>
        </div>
      </div>
    </div>

    <!-- Blog Details Modal -->
    <div v-if="selectedBlog" class="modal-overlay" @click="closeBlogDetails">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedBlog.title }}</h3>
          <button class="close-btn" @click="closeBlogDetails">✕</button>
        </div>
        <div class="modal-content">
          <div class="blog-author">
            <span class="author-name">By {{ selectedBlog.author }}</span>
            <span class="publish-date">{{ selectedBlog.date }}</span>
          </div>
          <div class="blog-content">
            <p v-for="(paragraph, index) in selectedBlog.content" :key="index">
              {{ paragraph }}
            </p>
          </div>
          <div class="blog-tags">
            <span v-for="tag in selectedBlog.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="share-btn">Share Article</button>
          <button class="bookmark-btn">Bookmark</button>
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
      selectedBlog: null,
      posts: [
        {
          id: 1,
          title: 'How to Start Investing in 2024',
          summary: 'A beginner-friendly guide to getting started with investing, including tips, strategies, and common mistakes to avoid.',
          author: 'Sarah Johnson',
          date: 'December 15, 2024',
          tags: ['Investing', 'Beginners', '2024'],
          content: [
            'Investing can seem overwhelming for beginners, but with the right approach, anyone can start building wealth. The key is to start early and stay consistent with your investment strategy.',
            'Before you begin investing, it\'s crucial to understand your financial goals. Are you saving for retirement, a down payment on a house, or building an emergency fund? Your goals will determine your investment timeline and risk tolerance.',
            'Diversification is one of the most important principles in investing. Don\'t put all your eggs in one basket. Spread your investments across different asset classes like stocks, bonds, and real estate to reduce risk.',
            'Start with index funds or ETFs, which provide instant diversification and are perfect for beginners. These funds track market indices and typically have lower fees than actively managed funds.',
            'Remember, investing is a long-term game. Don\'t get discouraged by short-term market fluctuations. Focus on your long-term goals and stay the course.'
          ]
        },
        {
          id: 2,
          title: 'Top 5 Investment Strategies for Long-Term Growth',
          summary: 'Explore the best strategies for building wealth over time, from index funds to real estate and more.',
          author: 'Michael Chen',
          date: 'December 10, 2024',
          tags: ['Strategy', 'Long-term', 'Growth'],
          content: [
            'Building long-term wealth requires a strategic approach that balances risk and reward. Here are five proven strategies that have helped investors achieve significant returns over time.',
            'Dollar-cost averaging involves investing a fixed amount regularly, regardless of market conditions. This strategy helps reduce the impact of market volatility and can lead to better average purchase prices over time.',
            'Index fund investing is one of the most effective ways to achieve market returns with minimal effort. These funds track major market indices and provide broad diversification at low costs.',
            'Dividend investing focuses on companies that regularly pay dividends to shareholders. This strategy provides regular income and can be particularly effective during market downturns.',
            'Real estate investment offers both income and appreciation potential. Whether through REITs or direct property ownership, real estate can provide diversification and inflation protection.',
            'Growth investing targets companies with above-average growth potential. While riskier, this strategy can deliver substantial returns for investors with higher risk tolerance.'
          ]
        },
        {
          id: 3,
          title: 'Understanding Risk and Reward in the Stock Market',
          summary: 'Learn how to balance risk and reward, diversify your portfolio, and make informed investment decisions.',
          author: 'Emma Wilson',
          date: 'December 5, 2024',
          tags: ['Risk Management', 'Stock Market', 'Education'],
          content: [
            'Understanding the relationship between risk and reward is fundamental to successful investing. Higher potential returns typically come with higher risk, but smart investors know how to manage this trade-off.',
            'Risk tolerance varies from person to person and depends on factors like age, financial situation, and investment goals. Younger investors can typically afford to take more risk, while those nearing retirement should be more conservative.',
            'Diversification is your best defense against risk. By spreading investments across different asset classes, sectors, and geographic regions, you can reduce the impact of any single investment\'s poor performance.',
            'Asset allocation is the process of dividing your portfolio among different asset classes. A common rule of thumb is to subtract your age from 100 to determine the percentage to invest in stocks.',
            'Regular portfolio rebalancing ensures your asset allocation stays aligned with your goals and risk tolerance. This involves selling some investments and buying others to maintain your target allocation.',
            'Remember that market volatility is normal and temporary. Successful investors stay focused on their long-term goals and avoid making emotional decisions based on short-term market movements.'
          ]
        },
        {
          id: 4,
          title: 'Cryptocurrency Investment: Opportunities and Risks',
          summary: 'Navigate the volatile world of cryptocurrency investing with expert insights and risk management strategies.',
          author: 'David Kim',
          date: 'November 28, 2024',
          tags: ['Cryptocurrency', 'Digital Assets', 'Risk'],
          content: [
            'Cryptocurrency has emerged as a new asset class that offers both significant opportunities and substantial risks. Understanding both sides is crucial for any investor considering digital assets.',
            'Bitcoin and Ethereum remain the most established cryptocurrencies, but thousands of other digital assets exist. Each has different use cases, technology, and risk profiles.',
            'Cryptocurrency markets are highly volatile and can experience dramatic price swings. This volatility can create opportunities for significant gains but also substantial losses.',
            'Blockchain technology, the foundation of cryptocurrency, has applications beyond digital currency. Understanding the underlying technology can help you make more informed investment decisions.',
            'Regulation of cryptocurrency varies by country and is still evolving. Changes in regulation can significantly impact cryptocurrency prices and availability.',
            'Due to the high risk nature of cryptocurrency, it should typically represent only a small portion of a well-diversified portfolio. Never invest more than you can afford to lose.'
          ]
        },
        {
          id: 5,
          title: 'Building a Retirement Portfolio That Lasts',
          summary: 'Create a retirement strategy that provides income security and growth potential throughout your golden years.',
          author: 'Lisa Thompson',
          date: 'November 20, 2024',
          tags: ['Retirement', 'Portfolio', 'Planning'],
          content: [
            'Building a retirement portfolio requires careful planning and consideration of multiple factors, including your retirement age, expected lifespan, and desired lifestyle.',
            'The 4% rule suggests withdrawing 4% of your portfolio value in the first year of retirement, then adjusting for inflation in subsequent years. This strategy aims to make your savings last 30 years.',
            'Social Security benefits should be factored into your retirement planning. Understanding when to claim benefits can significantly impact your retirement income.',
            'Healthcare costs are a major concern for retirees. Medicare doesn\'t cover all expenses, so planning for additional healthcare costs is essential.',
            'Consider working with a financial advisor to create a comprehensive retirement plan that addresses your specific needs and goals.',
            'Regular review and adjustment of your retirement portfolio is important as you age and your needs change.'
          ]
        },
        {
          id: 6,
          title: 'The Psychology of Successful Investing',
          summary: 'Master the mental aspects of investing to avoid common psychological traps and make better financial decisions.',
          author: 'Robert Anderson',
          date: 'November 15, 2024',
          tags: ['Psychology', 'Behavioral Finance', 'Mindset'],
          content: [
            'Successful investing is as much about psychology as it is about numbers. Understanding your own biases and emotional triggers can help you make better investment decisions.',
            'Fear and greed are the two primary emotions that drive market behavior. Learning to recognize and manage these emotions is crucial for long-term investment success.',
            'Confirmation bias leads investors to seek information that confirms their existing beliefs while ignoring contradictory evidence. This can result in poor investment decisions.',
            'Loss aversion causes people to feel the pain of losses more strongly than the pleasure of gains. This can lead to selling investments too early or avoiding necessary risks.',
            'The herd mentality can cause investors to follow the crowd, often buying at market peaks and selling at market bottoms. Independent thinking is essential for successful investing.',
            'Developing a written investment plan and sticking to it can help overcome emotional decision-making. Regular review and adjustment of your plan should be based on changes in your goals, not market movements.'
          ]
        },
        {
          id: 7,
          title: 'Sustainable and ESG Investing: The Future of Finance',
          summary: 'Discover how environmental, social, and governance factors are reshaping investment strategies and creating new opportunities.',
          author: 'Maria Garcia',
          date: 'November 10, 2024',
          tags: ['ESG', 'Sustainable', 'Impact Investing'],
          content: [
            'ESG investing considers environmental, social, and governance factors alongside traditional financial metrics. This approach is gaining popularity as investors seek to align their values with their investment choices.',
            'Environmental factors include climate change, pollution, and resource depletion. Companies that address these issues may be better positioned for long-term success.',
            'Social factors encompass labor practices, community relations, and product safety. Companies with strong social practices often have better employee retention and customer loyalty.',
            'Governance factors include board diversity, executive compensation, and shareholder rights. Strong governance can reduce risk and improve long-term performance.',
            'ESG investing doesn\'t necessarily mean sacrificing returns. Many ESG funds have performed competitively with traditional funds while providing additional benefits.',
            'As ESG investing grows, more data and tools are becoming available to help investors make informed decisions about sustainable investments.'
          ]
        },
        {
          id: 8,
          title: 'Tax-Efficient Investing Strategies',
          summary: 'Maximize your after-tax returns with smart tax planning and investment strategies that minimize your tax burden.',
          author: 'James Wilson',
          date: 'November 5, 2024',
          tags: ['Tax Planning', 'Efficiency', 'Strategy'],
          content: [
            'Tax efficiency can significantly impact your investment returns over time. Understanding how different investments are taxed can help you make better decisions.',
            'Tax-advantaged accounts like 401(k)s, IRAs, and 529 plans offer significant tax benefits. Maximizing contributions to these accounts should be a priority.',
            'Asset location involves placing investments in the most tax-efficient accounts. Generally, bonds and other income-producing investments should go in tax-advantaged accounts.',
            'Tax-loss harvesting involves selling investments at a loss to offset gains and reduce taxes. This strategy can be particularly valuable in taxable accounts.',
            'Understanding the difference between short-term and long-term capital gains is important, as they are taxed at different rates.',
            'Working with a tax professional can help you develop a comprehensive tax-efficient investment strategy tailored to your specific situation.'
          ]
        }
      ]
    }
  },
  methods: {
    showBlogDetails(blog) {
      this.selectedBlog = blog
    },
    closeBlogDetails() {
      this.selectedBlog = null
    }
  }
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #1a1a1a;
  border-radius: 15px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #333;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #333;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 15px 15px 0 0;
}

.modal-header h3 {
  color: #eb6709;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #eb6709;
  background: rgba(235, 103, 9, 0.1);
}

.modal-content {
  padding: 30px;
}

.blog-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
}

.author-name {
  color: #ffa600;
  font-weight: 600;
  font-size: 1rem;
}

.publish-date {
  color: #ccc;
  font-size: 0.9rem;
}

.blog-content {
  margin-bottom: 25px;
}

.blog-content p {
  color: #e9e9e9;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.tag {
  background: linear-gradient(90deg, #eb6709 0%, #f63d43 100%);
  color: #fff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-footer {
  display: flex;
  gap: 15px;
  padding: 20px 30px;
  border-top: 1px solid #333;
  background: #2a2a2a;
  border-radius: 0 0 15px 15px;
}

.share-btn,
.bookmark-btn {
  background: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;
}

.share-btn:hover,
.bookmark-btn:hover {
  background: #eb6709;
  transform: translateY(-2px);
}

/* Responsive Modal */
@media (max-width: 768px) {
  .modal {
    max-width: 95%;
    margin: 10px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-header h3 {
    font-size: 1.2rem;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .blog-author {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .modal-footer {
    flex-direction: column;
    padding: 15px 20px;
  }
}
</style>
