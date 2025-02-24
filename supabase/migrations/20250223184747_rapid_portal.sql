/*
  # Initial Schema Setup for Interview AI System

  1. New Tables
    - questions
      - Stores interview questions with domain and tech stack categorization
    - interviews
      - Manages interview sessions and scheduling
    - answers
      - Records candidate responses and AI feedback
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  domain text NOT NULL,
  tech_stack text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage questions"
  ON questions
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "All users can view questions"
  ON questions FOR SELECT
  TO authenticated
  USING (true);

-- Interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_name text NOT NULL,
  candidate_email text NOT NULL,
  domain text NOT NULL,
  tech_stack text NOT NULL,
  scheduled_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their interviews"
  ON interviews
  USING (auth.uid() = created_by);

-- Answers table
CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews(id),
  question_id uuid REFERENCES questions(id),
  answer_text text NOT NULL,
  ai_feedback text,
  score integer CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their answers"
  ON answers
  USING (
    EXISTS (
      SELECT 1 FROM interviews
      WHERE interviews.id = answers.interview_id
      AND interviews.created_by = auth.uid()
    )
  );