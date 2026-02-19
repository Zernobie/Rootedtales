// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cxvvicjtyhkynedezmag.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dnZpY2p0eWhreW5lZGV6bWFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg3NjY3MiwiZXhwIjoyMDg2NDUyNjcyfQ.6xPhPK4xeVjk8NScIhEWHPUi7bwqqnATItjv3q2CbKg'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
