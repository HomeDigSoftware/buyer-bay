
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL_NEW_DB

// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY_NEW_DB
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;