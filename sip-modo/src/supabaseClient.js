import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

//const supabaseUrl = "https://exosygrmuqhntbswdkko.supabase.co";
//const supabaseAnonKey = "sb_publishable_39AdgPEMn-FwHzvgSkwx_g_rdkwCzEF";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);