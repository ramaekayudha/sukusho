// js/supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://dlxhkhipjfxlmjpuvefj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRseGhraGlwamZ4bG1qcHV2ZWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NjUyNDUsImV4cCI6MjEwMTQ0MTI0NX0.Bi5c1d1w1LBNuBffT3__n6D9uW35EsOnFmQbrhYlexQ'; // Ganti dengan Anon Key Anda dari Dashboard Supabase

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);