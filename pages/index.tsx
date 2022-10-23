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
    <div className="relative text-gray-600">
      <input
        type="search"
        name="serch"
        placeholder="Search"
        className="h-10 rounded-full bg-white px-5 pr-10 text-sm focus:outline-none"
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 56.966 56.966"
          // style="enable-background:new 0 0 56.966 56.966;"
          // xml:space="preserve"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
    // <div className="absolute right-4 flex w-1/3 flex-col justify-center">
    //   <input
    //     type="search"
    //     placeholder="Find a Pokemon..."
    //     disabled={isLoading}
    //     value={value}
    //     onChange={onChange}
    //     className="w-full rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
    //   />
    //   <ul
    //     className={`absolute top-16 w-full transition-all ${
    //       debouncedValue.length > 0 ? 'opacity-100' : 'opacity-0'
    //     } `}
    //   >
    //     {value.length > 0 &&
    //       debouncedValue.map((searchResult) => (
    //         <li
    //           key={searchResult}
    //           onClick={() => onSelectPokemon(searchResult)}
    //           className="mt-2 w-full bg-white p-4 capitalize text-gray-700"
    //         >
    //           {searchResult}
    //         </li>
    //       ))}
    //   </ul>
    // </div>
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
    <div className={`${currentColor}`}>
      <div className={`mx-auto max-w-7xl  px-4 pt-32 sm:px-6 lg:px-8`}>
        <div className="flex h-full w-full justify-between">
          <div className="flex h-full w-1/2 flex-col">
            <div>
              <h1 className="text-[7rem] capitalize text-white drop-shadow-md">
                <span>{pokemonData?.name}</span>
              </h1>
            </div>
            <div className="flex h-full flex-col rounded-lg bg-white p-4 drop-shadow-md">
              <div className="ml-2 flex items-center gap-4">
                <span className="text-xl">Type:</span>
                <span className="flex gap-2">
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
                </span>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2">
            <Image
              src={pokemonData?.image}
              className="h-full w-auto max-w-none object-contain"
              alt={pokemonData.name}
              width={1000}
              height={1000}
              quality={100}
            />
          </div>
        </div>
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
