import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

let supabase: SupabaseClient | null = null;
let supabaseAdmin: SupabaseClient | null = null;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
  console.warn(
    "⚠️ Supabase desativado: SUPABASE_URL ou SUPABASE_SERVICE_ROLE não definidos. Endpoints que dependem do Supabase podem não funcionar."
  );
} else {
  // Cliente admin (service role)
  supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
  // Se quiser um cliente “normal”, pode reusar o mesmo
  supabase = supabaseAdmin;
}

export { supabase, supabaseAdmin };
