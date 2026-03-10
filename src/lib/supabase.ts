import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null
let currentUrl = 'https://supabase.widgetjs.cn'
let currentKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY0MDAwMDAwLCJleHAiOjE5MjE3NjY0MDB9.3nGFAW2q2bzxWmx1T-ycnmklITh9OcEvA1kZPXz4dBs'

export function initSupabase(url: string = currentUrl, key: string = currentKey) {
  currentUrl = url
  currentKey = key
  supabaseInstance = createClient(url, key)
  return supabaseInstance
}

export const supabase = new Proxy({} as SupabaseClient, {
  get: (_target, prop) => {
    if (!supabaseInstance) {
      initSupabase()
    }
    return Reflect.get(supabaseInstance!, prop)
  },
})

export function getStorageLink(fullPath: string) {
  return `${currentUrl}/storage/v1/object/public/${fullPath}`
}
