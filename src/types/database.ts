export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string | null;
          image_url: string | null;
          project_url: string | null;
          github_url: string | null;
          tags: string[];
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          content?: string | null;
          image_url?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          content?: string | null;
          image_url?: string | null;
          project_url?: string | null;
          github_url?: string | null;
          tags?: string[];
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      experience: {
        Row: {
          id: string;
          role: string;
          company: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          description: string;
          technologies: string[];
          is_current: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          role: string;
          company: string;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          description: string;
          technologies?: string[];
          is_current?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: string;
          company?: string;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          description?: string;
          technologies?: string[];
          is_current?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      certificates: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string;
          credential_url: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          issue_date: string;
          credential_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          issue_date?: string;
          credential_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];

export type Experience = Database['public']['Tables']['experience']['Row'];
export type ExperienceInsert = Database['public']['Tables']['experience']['Insert'];
export type ExperienceUpdate = Database['public']['Tables']['experience']['Update'];

export type Certificate = Database['public']['Tables']['certificates']['Row'];
export type CertificateInsert = Database['public']['Tables']['certificates']['Insert'];
export type CertificateUpdate = Database['public']['Tables']['certificates']['Update'];
