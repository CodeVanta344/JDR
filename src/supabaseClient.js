import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okanuafsmkuzyuyqibpu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rYW51YWZzbWt1enl1eXFpYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODQyMjgsImV4cCI6MjA4NjA2MDIyOH0.w93viTCCxc48GNw2n_HFKGq2yQRUvwZSt6lq-FqJb9E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
