import { GetAllPokemonNamesQuery } from '@pokedex/generated/graphql-hooks'

export const getSearchResults = (
  data: GetAllPokemonNamesQuery['allPokemonSpecies'] | undefined,
  value: string
) => {
  return (
    data
      ?.map(({ name }) => name)
      .filter((pokemon: string) => {
        if (pokemon.includes(value)) {
          return true
        }
      }) ?? []
  )
}
