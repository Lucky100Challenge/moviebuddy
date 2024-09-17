import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SearchBarProps {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for movies or TV shows"
        className="w-full px-4 py-2 rounded-l-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  )
}