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
