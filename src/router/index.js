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
import UserDashboard from '@/components/UserDashboard.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import CryptoWallet from '@/components/CryptoWallet.vue'

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
    { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: UserDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/crypto-wallet',
      name: 'CryptoWallet',
      component: CryptoWallet,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAdmin: true },
    },
    {
      path: '/all-investors',
      name: 'all-investors',
      component: AllInvestorsView,
    },
  ],
})

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  console.log('Router navigation:', { to: to.name, from: from.name })
  
  const isAuthenticated = localStorage.getItem('cryptoharvest_isAuthenticated') === 'true'
  const isAdmin = localStorage.getItem('cryptoharvest_admin') === 'true'
  
  console.log('Authentication status:', { isAuthenticated, isAdmin })

  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Route requires auth but user not authenticated, redirecting to login')
    next('/login')
  }
  // If route requires admin and user is not admin
  else if (to.meta.requiresAdmin && !isAdmin) {
    console.log('Route requires admin but user not admin, redirecting to admin login')
    next('/admin-login')
  }
  // If user is authenticated and trying to access login/signup, redirect to dashboard
  else if (isAuthenticated && (to.name === 'Login' || to.name === 'Signup')) {
    console.log('User authenticated, redirecting from login/signup to dashboard')
    next('/dashboard')
  }
  // If admin is authenticated and trying to access admin login, redirect to admin dashboard
  else if (isAdmin && to.name === 'AdminLogin') {
    console.log('Admin authenticated, redirecting to admin dashboard')
    next('/admin')
  } else {
    console.log('Navigation allowed')
    next()
  }
})

export default router
