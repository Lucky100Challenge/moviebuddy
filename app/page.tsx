'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'
import SearchBar from './components/SearchBar'
import ContentList from './components/ContentList'
import { Content } from './types'
import { fetchSearchResults, fetchTrending } from './utils/api'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [watchlist, setWatchlist] = useState<Content[]>([])

  const { data: searchResults, error: searchError } = useSWR(
    searchTerm ? ['search', searchTerm] : null,
    () => fetchSearchResults(searchTerm)
  )

  const { data: trendingContent, error: trendingError } = useSWR('trending', fetchTrending)

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

  return (
    <div className="container mx-auto px-4 py-8 fade-in">
      <h1 className="text-5xl font-bold mb-8 text-center gradient-text">
        Movie & TV Recommender
      </h1>
      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar onSearch={setSearchTerm} />
      </div>
      {searchError && <p className="text-center mt-4 text-red-500">Error: {searchError.message}</p>}
      {searchResults && (
        <ContentList 
          items={searchResults} 
          title="Search Results" 
          onToggleWatchlist={toggleWatchlist}
          watchlist={watchlist}
        />
      )}
      
      {!searchTerm && (
        <>
          {trendingError && <p className="text-center mt-4 text-red-500">Error loading trending content</p>}
          {trendingContent && (
            <ContentList 
              items={trendingContent} 
              title="Trending This Week" 
              onToggleWatchlist={toggleWatchlist}
              watchlist={watchlist}
            />
          )}
        </>
      )}
    </div>
  )
}