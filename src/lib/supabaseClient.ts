// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cxvvicjtyhkynedezmag.supabase.co'
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dnZpY2p0eWhreW5lZGV6bWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzY2NzIsImV4cCI6MjA4NjQ1MjY3Mn0.lRPFe1dnSfCfJqAerIndT2fhRDIvXk - ryDJ5NIgtvEg

export const supabase = createClient(supabaseUrl, supabaseAnonKey)