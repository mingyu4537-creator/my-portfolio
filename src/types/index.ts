export interface Project {
  id: string;
  title: string;
  description: string | null;
  detail: string | null;
  category: string | null;
  tech_stack: string[];
  thumbnail_url: string | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  files?: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_url: string;
  file_type: 'image' | 'code' | 'document' | 'video';
  file_size: number | null;
  sort_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string | null;
  highlights: string[];
  sort_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  level: number;
  icon_name: string | null;
  sort_order: number;
}

export interface SiteConfig {
  key: string;
  value: string;
  updated_at: string;
}
