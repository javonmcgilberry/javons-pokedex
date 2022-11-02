import {
  GetAllPokemonByColorQuery,
  GetAllPokemonByTypeQuery,
} from '@pokedex/generated/graphql-hooks'
import { HandleSetActivePokemon } from '@pokedex/types/types'
import { memo } from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'

interface ISortedPokemonGrid {
  isLoading: boolean
  handleSetActivePokemon: HandleSetActivePokemon
  data:
    | GetAllPokemonByTypeQuery['allPokemonByType']
    | GetAllPokemonByColorQuery['allPokemonByColor']
    | undefined
}

const SortedPokemonGrid = ({
  isLoading,
  data,
  handleSetActivePokemon,
}: ISortedPokemonGrid) => {
  return (
    <div className="relative grid grid-cols-8 gap-4 drop-shadow-md">
      {isLoading &&
        [...Array(8)].map((el) => (
          <>
            <div
              style={{
                paddingTop: '100%',
                background: `radial-gradient(circle, gray, rgba(6,11,40,1) 100%)`,
              }}
              className={`relative flex h-0 w-full animate-pulse flex-col items-center rounded-[4rem] bg-opacity-50 p-4`}
              key={el}
            ></div>
          </>
        ))}
      {data
        ?.filter((pokemon) => Number(pokemon.pokemon?.id) <= 905)
        .map(({ pokemon }) => {
          if (pokemon)
            return (
              <PokemonCard
                handleSetActivePokemon={handleSetActivePokemon}
                key={pokemon.name}
                pokemon={pokemon}
                smallText
              />
            )
        })}
    </div>
  )
}

export default SortedPokemonGrid
