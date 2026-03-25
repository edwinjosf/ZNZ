import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ChecklistItem = {
  id: string;
  user_id: string;
  visa_completed: boolean;
  yellow_fever_completed: boolean;
  insurance_completed: boolean;
  readiness_score: number;
  created_at: string;
  updated_at: string;
};

export type Document = {
  id: string;
  user_id: string;
  document_type: 'passport' | 'insurance';
  file_name: string;
  file_size: number;
  uploaded_at: string;
};

export type VerifiedDriver = {
  id: string;
  name: string;
  vehicle_type: string;
  price_range: string;
  whatsapp_number: string;
  rating: number;
  total_trips: number;
  is_active: boolean;
  created_at: string;
};

export type EmergencyContact = {
  id: string;
  category: 'police' | 'hospital' | 'embassy';
  name: string;
  phone_number: string;
  description: string;
  is_active: boolean;
};
