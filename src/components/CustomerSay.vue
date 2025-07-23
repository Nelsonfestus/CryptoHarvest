<template>
    <!-- Customer Section -->
    <section class="customer-section">
        <h1>What Our Customers Say</h1>

        <div class="customer-cards">
            <template v-for="(card, idx) in cards" :key="idx">
                <div class="customer-card">
                    <i class="fa-solid fa-quote-left quote-icon left"></i>

                    <div class="card-text">
                        <p>{{ card.text }}</p>
                    </div>

                    <div class="card-profile">
                        <img :src="card.image" alt="customer photo" />
                        <div class="card-details">
                            <h3>{{ card.name }}</h3>
                            <p class="review">{{ card.review }}</p>
                        </div>
                    </div>

                    <i class="fa-solid fa-quote-right quote-icon right"></i>
                </div>

                <div v-if="idx < cards.length - 1" class="card-divider"></div>
            </template>
        </div>
    </section>
    <NewsLetter />
</template>

<script>
import NewsLetter from './NewsLetter.vue'
export default {
    name: 'CustomerSay',
    components: {
        NewsLetter
    },
    data() {
        const sampleData = [
            {
                name: 'Sarah Johnson',
                review: 'Investor & Entrepreneur',
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                text:
                    'Get started on your investment journey by signing up for an account in just a few simple steps. With our secure and user-friendly platform, you’re just moments away from growing your wealth with confidence.',
            },
            {
                name: 'David Kim',
                review: 'Finance Analyst',
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
                text:
                    'Easily deposit funds using a variety of secure payment methods. Your money is protected with industry-leading security protocols.',
            },
            {
                name: 'Emily Rodriguez',
                review: 'Digital Nomad',
                image: 'https://randomuser.me/api/portraits/women/12.jpg',
                text:
                    'Explore a wide range of investment options tailored to your goals. Track your progress and watch your wealth grow with our intuitive tools.',
            },
        ]

        // Loop 3x by repeating data
        const repeated = [...sampleData, ...sampleData, ...sampleData]

        return {
            cards: repeated,
        }
    },
}
</script>

<style scoped>
.customer-section {
    padding: 50px 20px;
    background-color: #181818;
    text-align: center;
}

.customer-section h1 {
    font-size: 2.2rem;
    margin-bottom: 40px;
    color: #e9e9e9;
}

.customer-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    justify-content: center;
    align-items: stretch;
}

.customer-card {
    background: #202020;
    padding: 25px;
    border-radius: 16px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease;
}

.customer-card:hover {
    transform: translateY(-5px);
}

.quote-icon {
    font-size: 24px;
    color: #cd201f;
    margin: 10px;
}

.left {
    position: absolute;
    top: 15px;
    left: 15px;
}

.right {
    position: absolute;
    bottom: 15px;
    right: 15px;
}

.card-text p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #e9e9e9;
    margin-top: 20px;
}

.card-profile {
    display: flex;
    align-items: center;
    margin-top: 30px;
}

.card-profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
}

.card-details h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    color: #e9e9e9;
}

.card-details .review {
    font-size: 0.85rem;
    color: #777;
    margin-top: 4px;
}

.card-divider {
    height: 2px;
    width: 100%;
    background-color: #eaeaea;
    margin: 20px 0;
    display: none;
}

.customer-card:hover {
    transform: translateY(-8px) scale(1.011);
    box-shadow:
        0 8px 32px rgba(235, 103, 9, 0.12),
        0 2px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive spacing */
@media (max-width: 768px) {
    .customer-section h1 {
        font-size: 1.8rem;
    }

    .customer-cards {
        gap: 20px;
    }
}
</style>