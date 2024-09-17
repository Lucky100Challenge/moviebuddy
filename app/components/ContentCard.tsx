import Image from 'next/image'
import Link from 'next/link'
import { Content } from '../types'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'

interface ContentCardProps {
  item: Content
  onToggleWatchlist: (item: Content) => void
  isInWatchlist: boolean
}

export default function ContentCard({ item, onToggleWatchlist, isInWatchlist }: ContentCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 relative">
      <Link href={`/details/${item.id}`}>
        <div className="relative h-64">
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name || 'Content poster'}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-75"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/details/${item.id}`}>
          <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors truncate">{item.title || item.name}</h2>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{item.release_date || item.first_air_date}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">{item.overview}</p>
      </div>
      <button
        onClick={() => onToggleWatchlist(item)}
        className="absolute top-2 right-2 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-all"
      >
        {isInWatchlist ? (
          <HeartIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIconOutline className="h-6 w-6 text-gray-600 hover:text-red-500" />
        )}
      </button>
    </div>
  )
}