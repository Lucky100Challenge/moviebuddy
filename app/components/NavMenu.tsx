'use client'

import { useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Genre } from '../types'
import { fetchGenres } from '../utils/api'

export default function NavMenu() {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(() => {
    fetchGenres().then(setGenres)
  }, [])

  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
          Movie & TV Recommender
        </Link>
        <div className="flex space-x-4">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white gradient-bg rounded-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all">
              Genres
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 max-h-60 overflow-y-auto">
                  {genres.map((genre) => (
                    <Menu.Item key={genre.id}>
                      {({ active }) => (
                        <Link
                          href={`/genre/${genre.id}`}
                          className={`${
                            active ? 'gradient-bg text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors`}
                        >
                          {genre.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Link href="/watchlist" className="px-4 py-2 text-sm font-medium text-white secondary-gradient-bg rounded-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-all">
            Watchlist
          </Link>
        </div>
      </div>
    </nav>
  )
}