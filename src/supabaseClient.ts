import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zpknkxdzguqlhgkhyomp.supabase.co'   // 👈 reemplazá con tu URL real
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa25reGR6Z3VxbGhna2h5b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjE2ODIsImV4cCI6MjA3ODM5NzY4Mn0.Zzw9DwCtmWYkKAc9ao7ODCVtijtezxzzZz44EhX2vcA'              // 👈 reemplazá con tu anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
