import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const auth = {
  // Sign up
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
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