import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  name: string
  description?: string
  owner_id: string
  created_at: string
  updated_at: string
}

export interface CanvasData {
  id: string
  project_id: string
  room_id: string
  data: any
  created_at: string
  updated_at: string
}

export interface ProjectCollaborator {
  id: string
  project_id: string
  user_id: string
  role: 'owner' | 'editor' | 'viewer'
  created_at: string
}

export interface StudySession {
  id: string
  user_id: string
  subject: string
  emoji: string
  duration: number
  note?: string
  session_date: string
  created_at: string
  updated_at: string
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  user_id: string
  order_index: number
  created_at: string
  updated_at: string
}