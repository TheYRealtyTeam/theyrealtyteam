
import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// Type definition for blog posts to use throughout the app
export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_role: string;
  category: string;
  image_url: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}
