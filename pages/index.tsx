import AllPokemonView from '@pokedex/components/AllPokemonView/AllPokemonView'
import AutoCompleteSearch from '@pokedex/components/AutoCompleteSearch/AutoCompleteSearch'
import Header from '@pokedex/components/Header/Header'
import PokemonCard from '@pokedex/components/PokemonCard/PokemonCard'
import PokemonColor from '@pokedex/components/PokemonColor/PokemonColor'
import PokemonPanel from '@pokedex/components/PokemonLoadout/PokemonLoadout'
import PokemonType from '@pokedex/components/PokemonType/PokemonType'
import SortedPokemonGrid from '@pokedex/components/SortedPokemonGrid/SortedPokemonGrid'
import { POKEMON_COLORS, POKEMON_TYPES } from '@pokedex/consts/consts'
import {
  GetAllPokemonByTypeQuery,
  useGetAllPokemonByColorQuery,
  useGetAllPokemonByTypeQuery,
  useGetAllPokemonSpeciesQuery,
} from '@pokedex/generated/graphql-hooks'
import useActivePokemon from '@pokedex/hooks/useActivePokemon'
import Head from 'next/head'
import React, { useState } from 'react'

enum Characteristics {
  TYPE,
  COLOR,
}

export default function Home() {
  const [page, setPage] = useState(1)
  const totalPages = 101
  const handlePages = (updatePage: number) => setPage(updatePage)
  const { handleSetActivePokemon, activePokemon, isLoading, handlePagination } =
    useActivePokemon()

  const [activeCharacteristic, setActiveCharacteristic] =
    useState<null | Characteristics>(null)

  const [activeSearchParam, setActiveSearchParam] = useState<null | string>(
    null
  )

  const { data: allPokemonData, isLoading: isAllPokemonDataLoading } =
    useGetAllPokemonSpeciesQuery({
      offset: (page - 1) * 9,
      limit: 9,
    })

  const handleActivePokemonCharacteristic = (type: string) => {
    setActiveSearchParam((prev) => (prev === type ? null : type))
  }

  const { data: pokemonByTypeData, isLoading: isPokemonByTypeLoading } =
    useGetAllPokemonByTypeQuery(
      { type: activeSearchParam as unknown as string },
      {
        enabled:
          activeSearchParam !== null &&
          activeCharacteristic === Characteristics.TYPE,
      }
    )

  const { data: pokemonByColorData, isLoading: isPokemonByColorLoading } =
    useGetAllPokemonByColorQuery(
      { color: activeSearchParam as unknown as string },
      {
        enabled:
          activeSearchParam !== null &&
          activeCharacteristic === Characteristics.COLOR,
      }
    )

  const dataSorted = [
    pokemonByTypeData?.allPokemonByType,
    pokemonByColorData?.allPokemonByColor,
  ].find((data) => data !== undefined)

  const handleActiveCharacteristic = (
    characteristic: Characteristics | null
  ) => {
    setActiveCharacteristic(characteristic)
    setActiveSearchParam(null)
  }

  const isSortedGridLoading =
    activeSearchParam !== null &&
    ((activeCharacteristic === Characteristics.COLOR &&
      isPokemonByColorLoading) ||
      (activeCharacteristic === Characteristics.TYPE && isPokemonByTypeLoading))

  return (
    <div>
      <Head>
        <title>Pokedex By Javon</title>
      </Head>
      <Header
        render={() => (
          <AutoCompleteSearch handleSetActivePokemon={handleSetActivePokemon} />
        )}
      />
      <PokemonPanel
        handleSetActivePokemon={handleSetActivePokemon}
        pokemon={activePokemon}
        isLoading={isLoading}
        handlePagination={handlePagination}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Sort By:</h1>
          <div className="flex gap-4 py-8">
            <button
              className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
              onClick={() => handleActiveCharacteristic(Characteristics.TYPE)}
            >
              type
            </button>
            <button
              className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
              onClick={() => handleActiveCharacteristic(Characteristics.COLOR)}
            >
              color
            </button>
            <button
              className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
              onClick={() => handleActiveCharacteristic(null)}
            >
              reset
            </button>
          </div>
        </div>
        {activeCharacteristic === Characteristics.TYPE && (
          <div className="grid grid-cols-9 py-8">
            {POKEMON_TYPES.map((type) => (
              <PokemonType
                key={type}
                type={type}
                activeType={activeSearchParam}
                handleActivePokemonFilter={handleActivePokemonCharacteristic}
              />
            ))}
          </div>
        )}
        {activeCharacteristic === Characteristics.COLOR && (
          <div className="grid grid-cols-5 py-8">
            {POKEMON_COLORS.map((type) => (
              <PokemonColor
                key={type}
                type={type}
                activeType={activeSearchParam}
                handleActivePokemonFilter={handleActivePokemonCharacteristic}
              />
            ))}
          </div>
        )}
        {activeCharacteristic === null && (
          <AllPokemonView
            handleSetActivePokemon={handleSetActivePokemon}
            isAllPokemonDataLoading={isAllPokemonDataLoading}
            allPokemonData={allPokemonData}
            page={page}
            totalPages={totalPages}
            handlePages={handlePages}
          />
        )}
        {activeCharacteristic !== null && activeSearchParam !== null && (
          <SortedPokemonGrid
            isLoading={isSortedGridLoading}
            data={dataSorted}
            handleSetActivePokemon={handleSetActivePokemon}
          />
        )}
      </div>
    </div>
  )
}
