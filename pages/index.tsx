import AutoCompleteSearch from '@pokedex/components/AutoCompleteSearch/AutoCompleteSearch'
import Header from '@pokedex/components/Header/Header'
import PokemonSpotlight from '@pokedex/components/PokemonSpotlight/PokemonSpotlight'
import useActivePokemon from '@pokedex/hooks/useActivePokemon'

import Head from 'next/head'
import React from 'react'
import PokemonListView from '@pokedex/components/PokemonListView/PokemonListView'

export default function Home() {
  const { handleSetActivePokemon, activePokemon, isLoading, handlePagination } =
    useActivePokemon()

  console.log('ACTIVE POKEMON', activePokemon)

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
      <PokemonSpotlight
        handleSetActivePokemon={handleSetActivePokemon}
        pokemon={activePokemon}
        isLoading={isLoading}
        handlePagination={handlePagination}
      />
      <PokemonListView handleSetActivePokemon={handleSetActivePokemon} />
    </div>
  )
}
