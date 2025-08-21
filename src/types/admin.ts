// Admin-related type definitions
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_role: string;
  category: string;
  image_url: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  property_type: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  property_type: string;
  message?: string;
  call_type: string;
  status: string;
  calendar_event_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityLog {
  id: string;
  event: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, unknown>;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}