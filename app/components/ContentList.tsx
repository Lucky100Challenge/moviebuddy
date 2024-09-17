import { Content } from '../types'
import ContentCard from './ContentCard'

interface ContentListProps {
  items: Content[]
  title?: string
  onToggleWatchlist: (item: Content) => void
  watchlist: Content[]
}

export default function ContentList({ items, title, onToggleWatchlist, watchlist }: ContentListProps) {
  return (
    <div className="mb-12">
      {title && <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onToggleWatchlist={onToggleWatchlist}
            isInWatchlist={watchlist.some(watchlistItem => watchlistItem.id === item.id)}
          />
        ))}
      </div>
    </div>
  )
}