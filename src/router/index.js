import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InvestmentPlansView from '../views/InvestmentPlansView.vue'
import ContactView from '../views/ContactView.vue'
import BlogView from '../views/BlogView.vue'
import AllInvestorsView from '../views/AllInvestorsView.vue'
import Community from '@/components/Community.vue'
import Questions from '@/components/Questions.vue'
import Accordion from '@/components/Accordion.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/investment-plans',
      name: 'investment-plans',
      component: InvestmentPlansView,
    },
    {
      path: '/plans',
      name: 'plans',
      component: InvestmentPlansView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/community',
      name: 'community',
      component: Community,
    },
    {
      path: '/Questions',
      name: 'Questions',
      component: Questions,
    },
    {
      path: '/Accordion',
      name: 'Accordion',
      component: Accordion,
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/signup', name: 'Signup', component: Signup },
    {
      path: '/all-investors',
      name: 'all-investors',
      component: AllInvestorsView,
    },
  ],
})

export default router
