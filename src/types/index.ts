export interface Question {
  id: string;
  content: string;
  domain: string;
  techStack: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface Interview {
  id: string;
  candidate_name: string;
  candidate_email: string;
  domain: string;
  tech_stack: string;
  scheduled_at: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Answer {
  id: string;
  interview_id: string;
  question_id: string;
  answer_text: string;
  ai_feedback: string;
  score: number;
  created_at: string;
}