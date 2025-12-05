import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

let supabase: SupabaseClient | null = null;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.warn("⚠️ Supabase desativado: variáveis não definidas.");
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
}

export { supabase };
