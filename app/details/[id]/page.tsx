'use client'

import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import Image from 'next/image'
import { fetchContentDetails, fetchRecommendations } from '../../utils/api'
import ContentList from '../../components/ContentList'
import { ContentDetails, Content } from '../../types'
import { useState, useEffect } from 'react'
import { HeartIcon, PlusIcon, MinusIcon, ShareIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline, ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function DetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [watchlist, setWatchlist] = useState<Content[]>([])

  const { data: details, error: detailsError } = useSWR<ContentDetails>(
    id ? ['details', id] : null,
    () => fetchContentDetails(id as string, 'movie')
      .catch(() => fetchContentDetails(id as string, 'tv'))
  )

  const { data: recommendations, error: recommendationsError } = useSWR<Content[]>(
    details ? ['recommendations', details.id, details.media_type] : null,
    () => fetchRecommendations(details!.id.toString(), details!.media_type)
  )

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

  const isInWatchlist = details ? watchlist.some(item => item.id === details.id) : false

  const shareContent = () => {
    if (navigator.share && details) {
      navigator.share({
        title: details.title || details.name,
        text: `Check out ${details.title || details.name} on Movie & TV Recommender!`,
        url: window.location.href,
      })
    } else {
      alert('Sharing is not supported on this device')
    }
  }

  if (detailsError) return <div>Error loading details</div>
  if (!details) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.push('/')}
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Movies
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {details.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title || details.name || 'Content poster'}
              width={500}
              height={750}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-[750px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500">No poster available</p>
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => details && toggleWatchlist(details)}
              className={`flex items-center px-4 py-2 rounded-md ${
                isInWatchlist ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {isInWatchlist ? (
                <>
                  <MinusIcon className="h-5 w-5 mr-2" /> Remove from Watchlist
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5 mr-2" /> Add to Watchlist
                </>
              )}
            </button>
            <button
              onClick={shareContent}
              className="flex items-center px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              <ShareIcon className="h-5 w-5 mr-2" /> Share
            </button>
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{details.title || details.name}</h1>
          <p className="text-gray-600 mb-4">{details.release_date || details.first_air_date}</p>
          <p className="text-lg mb-4">{details.overview}</p>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {details.genres.map((genre: { id: number; name: string }) => (
                <span key={genre.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Rating</h2>
            <p className="text-lg">{details.vote_average.toFixed(1)} / 10</p>
          </div>
          {details.runtime && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Runtime</h2>
              <p className="text-lg">{details.runtime} minutes</p>
            </div>
          )}
          {details.number_of_seasons && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Seasons</h2>
              <p className="text-lg">{details.number_of_seasons}</p>
            </div>
          )}
          {details.number_of_episodes && (
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Episodes</h2>
              <p className="text-lg">{details.number_of_episodes}</p>
            </div>
          )}
        </div>
      </div>
      {recommendations && recommendations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
          <ContentList 
            items={recommendations} 
            onToggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
          />
        </div>
      )}
    </div>
  )
}