
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tlgrpirsqcbfnvysjxwx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZ3JwaXJzcWNiZm52eXNqeHd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyNjEzOTMsImV4cCI6MjAxMTgzNzM5M30.8Y_VDi4E9hNNJxfQ8qf22873R9rztfe2SAadLWRZo5o"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;