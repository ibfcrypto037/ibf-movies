export type DownloadQuality = '480p' | '720p' | '1080p';

export interface DownloadOption {
  url: string;
  size?: string;
}

export type DownloadLinks = {
  [K in DownloadQuality]?: DownloadOption | string;
};

export interface DbMovie {
  id: string;
  title: string;
  poster: string;
  year: number;
  language: string;
  genre: string;
  description: string;
  download_links: DownloadLinks;
  is_active: boolean;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

export interface DbMovieRequest {
  id: string;
  movie_name: string;
  language: string;
  user_id: string | null;
  status: 'pending' | 'fulfilled';
  created_at: string;
}

export interface DbLanguage {
  id: string;
  name: string;
  created_at: string;
}

export interface DbSettings {
  id: string;
  custom_message: string;
  use_custom: boolean;
  admin_password: string;
  updated_at: string;
}

// Grouped request (aggregated by movie_name + language)
export interface GroupedRequest {
  movie_name: string;
  language: string;
  count: number;
}

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: DbMovie;
        Insert: Omit<DbMovie, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<DbMovie, 'id' | 'created_at' | 'updated_at'>>;
      };
      movie_requests: {
        Row: DbMovieRequest;
        Insert: Omit<DbMovieRequest, 'id' | 'created_at'>;
        Update: Partial<Omit<DbMovieRequest, 'id' | 'created_at'>>;
      };
      languages: {
        Row: DbLanguage;
        Insert: Omit<DbLanguage, 'id' | 'created_at'>;
        Update: Partial<Omit<DbLanguage, 'id' | 'created_at'>>;
      };
      settings: {
        Row: DbSettings;
        Insert: Omit<DbSettings, 'updated_at'>;
        Update: Partial<Omit<DbSettings, 'id' | 'updated_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
