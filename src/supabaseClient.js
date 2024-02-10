// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from '@supabase/supabase-js';

// eslint-disable-next-line import/prefer-default-export
export const supabase = createClient('https://tyrnnblcanmpattqinqb.supabase.co', import.meta.env.VITE_SUPABASE_ANON_KEY);
