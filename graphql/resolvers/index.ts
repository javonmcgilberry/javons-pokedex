import { Resolvers } from '@pokedex/generated/graphql-types'
import { loadMoveData } from '@pokedex/loaders/MoveLoader'
import { GraphQLContext } from '@pokedex/types/IPokemon'
import Chain from './chain'
import Pokemon from './pokemon'

const resolvers: Resolvers = {
  Query: {
    allPokemon: async (
      _,
      { offset, limit },
      { PokemonApi }: GraphQLContext
    ) => {
      const response = await PokemonApi.allPokemon({ offset, limit })
      return response
    },
    allPokemonByType: async (_, { type }, { PokemonApi }) => {
      return await PokemonApi.allPokemonByType(type)
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
  },
  Pokemon,
  Chain,
  Moves: {
    move: async (parent, _, { moveLoader }: GraphQLContext) => {
      const response = await loadMoveData(parent.move, moveLoader)
      return response
    },
  },
}

export default resolvers
