import axios from 'axios'
import { Content, ContentDetails, Genre } from '../types'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchSearchResults(query: string): Promise<Content[]> {
  const response = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
    },
  })
  return response.data.results.filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
}

export async function fetchContentDetails(id: string, mediaType: 'movie' | 'tv'): Promise<ContentDetails> {
  const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
    params: {
      api_key: API_KEY,
    },
  })
  return {
    ...response.data,
    media_type: mediaType,
  }
}

export async function fetchRecommendations(id: string, mediaType: 'movie' | 'tv'): Promise<Content[]> {
  const response = await axios.get(`${BASE_URL}/${mediaType}/${id}/recommendations`, {
    params: {
      api_key: API_KEY,
    },
  })
  return response.data.results
}

export async function fetchTrending(): Promise<Content[]> {
  const response = await axios.get(`${BASE_URL}/trending/all/week`, {
    params: { api_key: API_KEY },
  })
  return response.data.results
}

export async function fetchGenres(): Promise<Genre[]> {
  const movieGenres = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  })
  const tvGenres = await axios.get(`${BASE_URL}/genre/tv/list`, {
    params: { api_key: API_KEY },
  })
  return [...movieGenres.data.genres, ...tvGenres.data.genres]
}

export async function fetchByGenre(genreId: number): Promise<Content[]> {
  const movieResponse = await axios.get(`${BASE_URL}/discover/movie`, {
    params: { api_key: API_KEY, with_genres: genreId },
  })
  const tvResponse = await axios.get(`${BASE_URL}/discover/tv`, {
    params: { api_key: API_KEY, with_genres: genreId },
  })
  return [...movieResponse.data.results, ...tvResponse.data.results]
}