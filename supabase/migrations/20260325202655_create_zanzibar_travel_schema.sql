/*
  # Zanzibar Travel OS Database Schema

  1. New Tables
    - `user_checklists`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `visa_completed` (boolean, default false)
      - `yellow_fever_completed` (boolean, default false)
      - `insurance_completed` (boolean, default false)
      - `readiness_score` (integer, calculated field)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `document_type` (text - 'passport' or 'insurance')
      - `file_name` (text)
      - `file_size` (bigint)
      - `uploaded_at` (timestamptz)
    
    - `verified_drivers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `vehicle_type` (text)
      - `price_range` (text)
      - `whatsapp_number` (text)
      - `rating` (decimal)
      - `total_trips` (integer)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
    
    - `emergency_contacts`
      - `id` (uuid, primary key)
      - `category` (text - 'police', 'hospital', 'embassy')
      - `name` (text)
      - `phone_number` (text)
      - `description` (text)
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for verified_drivers and emergency_contacts
*/

CREATE TABLE IF NOT EXISTS user_checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  visa_completed boolean DEFAULT false,
  yellow_fever_completed boolean DEFAULT false,
  insurance_completed boolean DEFAULT false,
  readiness_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN ('passport', 'insurance')),
  file_name text NOT NULL,
  file_size bigint,
  uploaded_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verified_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  vehicle_type text NOT NULL,
  price_range text NOT NULL,
  whatsapp_number text NOT NULL,
  rating decimal(2,1) DEFAULT 5.0,
  total_trips integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL CHECK (category IN ('police', 'hospital', 'embassy')),
  name text NOT NULL,
  phone_number text NOT NULL,
  description text,
  is_active boolean DEFAULT true
);

ALTER TABLE user_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checklist"
  ON user_checklists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checklist"
  ON user_checklists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist"
  ON user_checklists FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active verified drivers"
  ON verified_drivers FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Anyone can view active emergency contacts"
  ON emergency_contacts FOR SELECT
  TO public
  USING (is_active = true);

INSERT INTO verified_drivers (name, vehicle_type, price_range, whatsapp_number, rating, total_trips) VALUES
  ('Ali Hassan', 'Sedan (AC)', '$25-30 to Stone Town', '+255774123456', 4.9, 1247),
  ('Fatuma Mohamed', 'SUV (7-seater)', '$35-40 to Stone Town', '+255773234567', 5.0, 892),
  ('Juma Khamis', 'Minivan', '$45-50 to Stone Town', '+255775345678', 4.8, 2103),
  ('Amina Said', 'Sedan (AC)', '$25-30 to Stone Town', '+255776456789', 4.9, 1567),
  ('Rashid Omar', 'Luxury SUV', '$50-60 to Stone Town', '+255777567890', 5.0, 634);

INSERT INTO emergency_contacts (category, name, phone_number, description) VALUES
  ('police', 'Zanzibar Police Emergency', '112', '24/7 emergency police services'),
  ('police', 'Tourist Police', '+255242231071', 'Dedicated tourist assistance'),
  ('hospital', 'Mnazi Mmoja Hospital', '+255242230071', 'Main public hospital in Stone Town'),
  ('hospital', 'Zanzibar Medical Group', '+255773770077', 'Private medical facility'),
  ('embassy', 'US Embassy (Dar es Salaam)', '+255222290000', 'Consular services for US citizens'),
  ('embassy', 'UK High Commission', '+255222290000', 'British consular services'),
  ('embassy', 'Emergency Medical Evacuation', '+255784770077', 'AMREF Flying Doctors');