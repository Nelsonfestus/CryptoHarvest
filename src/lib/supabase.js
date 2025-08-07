import { createClient } from '@supabase/supabase-js'

// Temporary hardcoded values to fix the immediate issue
const supabaseUrl = 'https://ivjbrnhgrlgmqvtygkkl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2amJybmhncmxnbXF2dHlna2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ1MTk0MDUsImV4cCI6MjA3MDA5NTQwNX0.xYDVAwkBxpwOFk93O0VNhDc-bsykn9co_groVmkhVCU'

console.log('🔧 Supabase Configuration:')
console.log('URL:', supabaseUrl)
console.log('Key:', '***' + supabaseAnonKey.slice(-4))

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  // Sign up
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: window.location.origin + '/dashboard'
      }
    })
    return { data, error }
  },

  // Sign in
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Resend confirmation email
  async resendConfirmation(email) {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })
    return { error }
  }
}

// Database helpers
export const db = {
  // Users
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
    return { data, error }
  },

  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
    return { data, error }
  },

  // Investments
  async createInvestment(investmentData) {
    const { data, error } = await supabase
      .from('investments')
      .insert([investmentData])
      .select()
    return { data, error }
  },

  async getUserInvestments(userId) {
    const { data, error } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async updateInvestment(investmentId, updates) {
    const { data, error } = await supabase
      .from('investments')
      .update(updates)
      .eq('id', investmentId)
      .select()
    return { data, error }
  },

  // Chat messages
  async createChatMessage(messageData) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([messageData])
      .select()
    return { data, error }
  },

  async getChatMessages(userId) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
    return { data, error }
  },

  // Admin functions
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getAllInvestments() {
    const { data, error } = await supabase
      .from('investments')
      .select(`
        *,
        users (
          id,
          name,
          email
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getDashboardStats() {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id')
    
    const { data: investments, error: investmentsError } = await supabase
      .from('investments')
      .select('amount, status')
    
    if (usersError || investmentsError) {
      return { error: usersError || investmentsError }
    }

    const totalUsers = users?.length || 0
    const totalInvestments = investments?.length || 0
    const totalAmount = investments?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0
    const activeInvestments = investments?.filter(inv => inv.status === 'active').length || 0

    return {
      data: {
        totalUsers,
        totalInvestments,
        totalAmount,
        activeInvestments
      }
    }
  }
}

// Real-time subscriptions
export const realtime = {
  subscribeToChat(userId, callback) {
    return supabase
      .channel(`chat:${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe()
  },

  subscribeToInvestments(userId, callback) {
    return supabase
      .channel(`investments:${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'investments',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe()
  }
} 