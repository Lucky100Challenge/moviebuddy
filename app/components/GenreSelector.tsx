import { Genre } from '../types'

interface GenreSelectorProps {
  genres: Genre[]
  onSelect: (genreId: number) => void
}

export default function GenreSelector({ genres, onSelect }: GenreSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Explore by Genre</h2>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 transition-colors"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}