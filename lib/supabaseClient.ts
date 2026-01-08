
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jepgumrmxlcjldhucueh.supabase.co';
// Hatalı olduğu bildirilen önceki JWT anahtarı, kullanıcının ilk sağladığı
// değerle değiştirildi. Bu, "Invalid API key" hatasını çözme denemesidir.
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcGd1bXJteGxjamxkaHVjdWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzMDQ5NjgsImV4cCI6MjA4MTg4MDk2OH0.hMlfU_yiBhOjiOhjsxlaVvmgbzFGvEGm0rnVeuDv85w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
