import AutoCompleteSearch from '@pokedex/components/AutoCompleteSearch/AutoCompleteSearch'
import Header from '@pokedex/components/Header/Header'
import PokemonPanel from '@pokedex/components/PokemonLoadout/PokemonLoadout'
import useActivePokemon from '@pokedex/hooks/useActivePokemon'
import Head from 'next/head'
import React from 'react'

export default function Home() {
  const { handleSetActivePokemon, activePokemon, isLoading, handlePagination } =
    useActivePokemon()

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
      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <AutoCompleteSearch handleSetActivePokemon={handleSetActivePokemon} />
      </div>
    </div>
  )
}
