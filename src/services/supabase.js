
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://uieagywfhpfwwttvnzda.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZWFneXdmaHBmd3d0dHZuemRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzODkxODMsImV4cCI6MjA0Nzk2NTE4M30.hrIJWoABO8raPWQu_si8mLW6WEaCztD4ETz9MAXBk5U'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase