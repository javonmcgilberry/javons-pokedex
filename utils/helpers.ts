import { POKEMON_COLORS, POKEMON_TYPES } from '@pokedex/consts/consts'
import { GetAllPokemonNamesQuery } from '@pokedex/generated/graphql-hooks'

export const getSearchResults = (
  data: GetAllPokemonNamesQuery['allPokemonSpecies'] | undefined,
  value: string
) => {
  return (
    data
      ?.filter((pokemon) => {
        if (pokemon.name.includes(value?.toLowerCase())) {
          return true
        }
      })
      .slice(0, 10) ?? []
  )
}

type Active = (
  activeType:
    | typeof POKEMON_TYPES[number]
    | typeof POKEMON_COLORS[number]
    | null,
  type: typeof POKEMON_TYPES[number] | typeof POKEMON_COLORS[number]
) => string
export const isActive: Active = (activeType, type) =>
  activeType === type ? `opacity-100` : ''
export const isNotActive: Active = (activeType, type) =>
  activeType !== null && activeType !== type ? `opacity-50` : ''
