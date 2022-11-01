import {
  Resolvers,
  ResolverTypeWrapper,
} from '@pokedex/generated/graphql-types'
import { GraphQLContext, IPokemonByTypeObject } from '@pokedex/types/IPokemon'

const QueryResolver: Resolvers['Query'] = {
  allPokemon: async (_, { offset, limit }, { PokemonApi }: GraphQLContext) => {
    const response = await PokemonApi.allPokemon({ offset, limit })
    return response
  },
  allPokemonByType: async (_, { type }, { PokemonApi }) => {
    return await PokemonApi.allPokemonByType(type)
  },
  allPokemonByColor: async (_, { type }, { PokemonApi }) => {
    return (await (
      await PokemonApi.allPokemonByColor(type)
    ).map((res) => ({
      pokemon: { ...res },
    }))) as ResolverTypeWrapper<IPokemonByTypeObject>[]
  },
  pokemonSpeciesById: async (
    parent,
    args: { id: string },
    { pokemonSpeciesDataLoader }: GraphQLContext
  ) => {
    const { id } = args
    const response = await pokemonSpeciesDataLoader.load(String(id))
    return response
  },
  pokemonById: async (
    parent,
    args: { id: string },
    { pokemonDataLoader }: GraphQLContext
  ) => {
    const { id } = args
    return await pokemonDataLoader.load(String(id))
  },
  allPokemonTypes: async (
    parent,
    { offset, limit },
    { PokemonApi }: GraphQLContext
  ) => {
    return await PokemonApi.allPokemonTypes({ offset, limit })
  },
  allPokemonSpecies: async (
    parent,
    { offset, limit },
    { PokemonApi }: GraphQLContext
  ) => {
    return await PokemonApi.allPokemonSpecies({ offset, limit })
  },
}

export default QueryResolver
