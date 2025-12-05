import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "dotenv/config";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;

// Cliente falso para evitar erro de null quando não configurado
const fakeClient: SupabaseClient = {
  from: () => ({
    upload: async () => ({ error: "SupabaseDisabled" }),
    download: async () => ({ error: "SupabaseDisabled" }),
    select: async () => ({ error: "SupabaseDisabled" }),
    insert: async () => ({ error: "SupabaseDisabled" }),
    update: async () => ({ error: "SupabaseDisabled" }),
    delete: async () => ({ error: "SupabaseDisabled" }),
    // mais métodos podem ser adicionados se necessário
  }),
} as any;

// Se as variáveis existirem → usa o supabase de verdade
// Se NÃO existirem → usa fakeClient (evita erro TS)
export const supabaseAdmin: SupabaseClient =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)
    : fakeClient;

export const supabase = supabaseAdmin; // se quiser usar ambos
