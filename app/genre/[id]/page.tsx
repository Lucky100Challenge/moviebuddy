'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import ContentList from '../../components/ContentList'
import { fetchByGenre, fetchGenres } from '../../utils/api'
import { Content, Genre } from '../../types'
import { useState, useEffect } from 'react'

export default function GenrePage() {
  const { id } = useParams()
  const genreId = Number(id)
  const [watchlist, setWatchlist] = useState<Content[]>([])

  const { data: contents, error: contentsError } = useSWR<Content[]>(
    ['genre', genreId],
    () => fetchByGenre(genreId)
  )

  const { data: genres, error: genresError } = useSWR<Genre[]>('genres', fetchGenres)

  const genreName = genres?.find(genre => genre.id === genreId)?.name || 'Genre'

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  const toggleWatchlist = (item: Content) => {
    const updatedWatchlist = watchlist.some(watchlistItem => watchlistItem.id === item.id)
      ? watchlist.filter(watchlistItem => watchlistItem.id !== item.id)
      : [...watchlist, item]
    
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  if (contentsError || genresError) return <div>Error loading content</div>
  if (!contents || !genres) return <div>Loading...</div>

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{genreName} Movies and TV Shows</h1>
      <ContentList 
        items={contents} 
        title={`${genreName} Content`} 
        onToggleWatchlist={toggleWatchlist}
        watchlist={watchlist}
      />
    </main>
  )
}