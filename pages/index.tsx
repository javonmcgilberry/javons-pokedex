import AutoCompleteSearch from '@pokedex/components/AutoCompleteSearch/AutoCompleteSearch'
import Header from '@pokedex/components/Header/Header'
import PokemonPanel from '@pokedex/components/PokemonLoadout/PokemonLoadout'
import { useGetAllPokemonByTypeQuery } from '@pokedex/generated/graphql-hooks'
import useActivePokemon from '@pokedex/hooks/useActivePokemon'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'

const types = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
]

export default function Home() {
  const { handleSetActivePokemon, activePokemon, isLoading, handlePagination } =
    useActivePokemon()

  const [activeType, setActiveType] = useState<null | string>(null)

  const { data, loading } = useGetAllPokemonByTypeQuery(
    { type: activeType as unknown as string },
    { enabled: !!activeType }
  )

  const handleActivePokemonFilter = (type: string) => {
    setActiveType((prev) => (prev === type ? null : type))
  }

  console.log('GET THE DATA....', activeType, data)

  const isActive = (type: string) => (activeType === type ? `opacity-100` : '')
  const isNotActive = (type: string) =>
    activeType !== null && activeType !== type ? `opacity-50` : ''

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
        pokemon={activePokemon}
        isLoading={isLoading}
        handlePagination={handlePagination}
      />
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <AutoCompleteSearch handleSetActivePokemon={handleSetActivePokemon} />

        <div className="grid grid-cols-6">
          {types.map((type) => (
            <a
              className="flex flex-col"
              key={type}
              onClick={() => handleActivePokemonFilter(type)}
            >
              <div
                className={`m-8 justify-center p-8 drop-shadow-sm hover:opacity-80 ${isActive(
                  type
                )} ${isNotActive(type)}`}
              >
                <Image
                  src={`/assets/icons/${type}.svg`}
                  alt={type}
                  layout="fill"
                />
              </div>
              <h2 className="text-center text-black">{type}</h2>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
