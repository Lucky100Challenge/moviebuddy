'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ContentList from '../components/ContentList'
import { Content } from '../types'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Content[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    }
  }, [])

  const toggleWatchlist = (item: Content) => {
    const updatedWatchlist = watchlist.filter(watchlistItem => watchlistItem.id !== item.id)
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/')}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Movies
      </button>
      
      <h1 className="text-4xl font-bold mb-8">Your Watchlist</h1>
      {watchlist.length > 0 ? (
        <ContentList 
          items={watchlist} 
          onToggleWatchlist={toggleWatchlist}
          watchlist={watchlist}
        />
      ) : (
        <p>Your watchlist is empty. Add some movies or TV shows!</p>
      )}
    </main>
  )
}