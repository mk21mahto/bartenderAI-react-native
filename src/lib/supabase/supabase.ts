import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jzptpmnrffbialcbfyvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6cHRwbW5yZmZiaWFsY2JmeXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwOTE1NTEsImV4cCI6MjAyODY2NzU1MX0.IPVIt6L7ZU1D4SLwZMaDuH7To80u71ESPVdTRQPDHD8'; // Replace with your Supabase anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);