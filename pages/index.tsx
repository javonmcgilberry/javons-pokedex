import AutoCompleteSearch from '@pokedex/components/AutoCompleteSearch/AutoCompleteSearch'
import Header from '@pokedex/components/Header/Header'
import {
  GetPokemonByNameOrIdQuery,
  useGetAllPokemonNamesQuery,
  useGetAllPokemonQuery,
  useGetPokemonByNameOrIdQuery,
} from '@pokedex/generated/graphql-hooks'
import useActivePokemon from '@pokedex/hooks/useActivePokemon'
import useAutoCompleteSearch from '@pokedex/hooks/useAutoCompleteSearch'
import usePokemonBackgroundColor from '@pokedex/hooks/usePokemonBackgroundColor'
import PokemonDataModel from '@pokedex/models/PokemonDataModel'
import { getSearchResults } from '@pokedex/utils/helpers'
import useDebounce from '@pokedex/utils/useDebounce'
import Image from 'next/image'
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react'

const SearchInput = ({ value, onChange, onSelectPokemon }) => {
  const { data, isLoading } = useGetAllPokemonNamesQuery()
  const searchResults = getSearchResults(data?.allPokemonSpecies, value)
  const debouncedValue = useDebounce(searchResults, 500) as string[]
  return (
    <div className="absolute right-4 flex w-1/3 flex-col justify-center">
      <input
        type="search"
        placeholder="Find a Pokemon..."
        disabled={isLoading}
        value={value}
        onChange={onChange}
        className="w-full rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
      />
      <ul
        className={`absolute top-16 w-full transition-all ${
          debouncedValue.length > 0 ? 'opacity-100' : 'opacity-0'
        } `}
      >
        {value.length > 0 &&
          debouncedValue.map((searchResult) => (
            <li
              key={searchResult}
              onClick={() => onSelectPokemon(searchResult)}
              className="mt-2 w-full bg-white p-4 capitalize text-gray-700"
            >
              {searchResult}
            </li>
          ))}
      </ul>
    </div>
  )
}

const PokemonPanel = ({
  pokemon,
}: {
  pokemon: GetPokemonByNameOrIdQuery['pokemonById']
  isLoading: boolean
}) => {
  const pokemonData = new PokemonDataModel(pokemon)
  const currentColor = usePokemonBackgroundColor(pokemonData)
  return (
    <div>
      <div
        className={`mx-auto max-w-7xl ${currentColor} px-4 pt-32 sm:px-6 lg:px-8`}
      >
        {pokemonData?.name}

        {pokemonData.typeIcons?.map((icon) => (
          <Image
            className="m-8 p-8 drop-shadow-sm"
            key={icon}
            src={icon}
            alt={icon}
            width={40}
            height={40}
          />
        ))}
        <Image
          src={pokemonData?.image}
          width={400}
          height={400}
          alt={pokemonData.name}
          quality={100}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const { handleSetActivePokemon, data, isLoading } = useActivePokemon()
  return (
    <div>
      <Header
        render={() => (
          <AutoCompleteSearch handleSetActivePokemon={handleSetActivePokemon} />
          // <SearchInput
          //   value={value}
          //   onChange={handleChange}
          //   onSelectPokemon={handleSelectPokemon}
          // />
        )}
      />
      <PokemonPanel pokemon={data?.pokemonById} isLoading={isLoading} />

      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <AutoCompleteSearch handleSetActivePokemon={handleSetActivePokemon} />
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
