import { GetAllPokemonNamesQuery } from '@pokedex/generated/graphql-hooks'

export const getSearchResults = (
  data: GetAllPokemonNamesQuery['allPokemonSpecies'] | undefined,
  value: string
) => {
  return (
    data
      ?.map(({ name }) => name)
      .filter((pokemon: string) => {
        if (pokemon.includes(value?.toLowerCase())) {
          return true
        }
      })
      .slice(0, 10) ?? []
  )
}
