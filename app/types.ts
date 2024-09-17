export interface Content {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string
  release_date?: string
  first_air_date?: string
  media_type: 'movie' | 'tv'
}

export interface ContentDetails extends Content {
  genres: { id: number; name: string }[]
  vote_average: number
  runtime?: number
  number_of_seasons?: number
  number_of_episodes?: number
}

export interface Genre {
  id: number
  name: string
}

export interface WatchlistItem extends Content {
  addedAt: string
}