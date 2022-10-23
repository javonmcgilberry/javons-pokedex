import {
  useGetAllPokemonNamesQuery,
  useGetAllPokemonQuery,
  useGetPokemonByNameOrIdQuery,
} from '@pokedex/generated/graphql-hooks'
import { getSearchResults } from '@pokedex/utils/helpers'
import getColor from '@pokedex/utils/pokemonColors'
import useDebounce from '@pokedex/utils/useDebounce'
import Image from 'next/image'
import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'

const Header = ({ render }: { render: () => React.ReactNode }) => {
  return (
    <div className="flex justify-between">
      <div>
        <Image
          src="/pokemon_logo.svg"
          alt="pokemon-logo"
          width={120}
          height={60}
        />
      </div>
      {render()}
    </div>
  )
}

const SearchInput = ({ value, onChange, onSelectPokemon }) => {
  const { data, isLoading } = useGetAllPokemonNamesQuery()
  const searchResults = getSearchResults(data?.allPokemonSpecies, value)
  return (
    <>
      <input
        type="search"
        placeholder="Find a Pokemon"
        disabled={isLoading}
        value={value}
        onChange={onChange}
        className="w-full rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
      />
      <ul
        className={`w-full transition-all duration-200 ${
          searchResults.length > 0 ? 'opacity-100' : 'opacity-0'
        } `}
      >
        {value.length > 0 &&
          searchResults.map((searchResult: any) => (
            <li
              key={searchResult}
              onClick={() => onSelectPokemon(searchResult)}
              className="mt-2 w-full bg-white p-4 text-gray-700"
            >
              {searchResult}
            </li>
          ))}
      </ul>
    </>
  )
}
export default function Home() {
  const [offset, setOffset] = useState(0)
  const [activePokemon, setActivePokemon] = useState('1')
  const { data, isLoading } = useGetPokemonByNameOrIdQuery({
    id: activePokemon,
  })
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleSelectPokemon = useCallback((value: string) => {
    setActivePokemon(value)
  }, [])

  useEffect(() => {
    if (data) {
      console.log('selected Pokemon', data.pokemonById)
    }
  }, [data])

  return (
    <div>
      <Header
        render={() => (
          <div>
            <SearchInput
              value={value}
              onChange={handleChange}
              onSelectPokemon={handleSelectPokemon}
            />
          </div>
        )}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold text-red-500">Good Morning</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-blue-800 sm:text-4xl">
            Welcome to KindaCode.com
          </p>
        </div>

        <div className="mt-10 space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
          <div className="cursor-pointer rounded-md bg-amber-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-red-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-green-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-purple-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>
        </div>
      </div>
    </div>
  )
}
