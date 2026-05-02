export type DownloadQuality = '480p' | '720p' | '1080p'

export interface DownloadOption {
  url: string
  size?: string
}

export type DownloadLinks = {
  [K in DownloadQuality]?: DownloadOption | string
}

export interface Movie {
  id: string
  title: string
  poster: string
  year: number
  language: string
  genre: string
  description: string
  download_links: DownloadLinks
  is_active: boolean
  uploaded_at: string
}

export interface MovieRequest {
  id: string
  movie_name: string
  language: string
  count: number
  status: 'pending' | 'fulfilled'
}

export interface Language {
  id: string
  name: string
}

export interface Settings {
  [key: string]: any
}

export interface MovieFormData {
  title: string
  poster: string
  year: number
  language: string
  genre: string
  description: string
  is_active: boolean
  links: {
    '480p'?: DownloadOption | string
    '720p'?: DownloadOption | string
    '1080p'?: DownloadOption | string
  }
}
