import { GetAllPokemonQuery } from '@pokedex/generated/graphql-hooks'
import PokemonDataModel from '@pokedex/models/PokemonDataModel'
import { HandleSetActivePokemon } from '@pokedex/types/types'
import Image from 'next/image'
import React, { memo, ReactNode, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'

interface IPokemonCard {
  pokemon: GetAllPokemonQuery['allPokemon'][0]
  handleSetActivePokemon: HandleSetActivePokemon
  smallText?: boolean
}

export const FadeInWrapper = ({
  children,
  revealOn,
}: {
  children: ReactNode | ReactNode[]
  revealOn: unknown
}) => {
  const [fadeIn, set] = useSpring(() => ({ opacity: 0 }))

  useEffect(() => {
    if (revealOn) {
      set({ opacity: 1, from: { opacity: 0 } })
    }
  }, [set, revealOn])
  return (
    <animated.div
      style={{
        ...fadeIn,
      }}
    >
      {children}
    </animated.div>
  )
}

const PokemonCard = ({
  pokemon,
  handleSetActivePokemon,
  smallText,
}: IPokemonCard) => {
  const pokemonData = new PokemonDataModel(pokemon)

  return (
    <FadeInWrapper revealOn={pokemon}>
      <div
        style={{
          background: `radial-gradient(circle, ${pokemonData.backgroundColor}, rgba(6,11,40,1) 100%)`,
        }}
        className={`relative flex flex-col items-center rounded-[4rem] bg-opacity-50 p-4`}
        key={pokemon.id}
      >
        {pokemonData?.pokedexNumber && (
          <h1
            className={`absolute top-4 right-4 z-10 text-center ${
              !smallText ? `text-[4rem]` : `text-small`
            } capitalize text-white opacity-60 drop-shadow-md`}
          >
            <span className="flex justify-end">
              #{pokemonData?.pokedexNumber}
            </span>
          </h1>
        )}
        <div className="m-4 flex">
          {pokemonData?.image && (
            <Image
              src={pokemonData?.image}
              className="fade-in relative h-full w-auto max-w-none object-contain drop-shadow-lg transition-all hover:scale-110"
              alt={pokemonData.name}
              width={1000}
              height={1000}
              quality={100}
              onClick={() => {
                handleSetActivePokemon(pokemon.id)
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }}
            />
          )}
        </div>
        <h1 className="capitalize">{pokemonData?.name}</h1>
      </div>
    </FadeInWrapper>
  )
}

export default memo(PokemonCard)
