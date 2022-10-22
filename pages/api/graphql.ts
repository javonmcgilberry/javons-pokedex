// pages/api/graphql.js
import { useResponseCache } from '@envelop/response-cache'
import { createServer } from '@graphql-yoga/node'
import { PokemonLoader } from '../../loaders/PokemonLoader'
import { IPokemonApi } from '../../types/types'
import PokemonApi from '../../utils/PokemonApi'

const typeDefs = `
  type Query {
    allPokemon(offset: Int!, limit: Int): [Pokemon!]!
    allPokemonByType(type: String!): [PokemonByTypeObject!]!
    allPokemonTypes(offset: Int!, limit: Int): [Result!]!
    allPokemonSpecies(offset: Int!, limit: Int): [Result!]!
    pokemonById(id: ID!): Pokemon
  }

  type Pokemon {
    id: ID!
    name: String!
    types: [PokemonTypes!]
    stats: [PokemonStats!]
  }

  type PokemonTypes {
    slot: Int!
    type: PokemonTypeDetails
  }

  type PokemonStats {
    base_stat: Int!
    effort: Int!
    stat: PokemonStat
  }

  type PokemonStat {
    name: String!
    url: String!
  }

  type PokemonTypeDetails {
    name: String!
    url: String!
  }
  
  type Result {
    name: String!
    url: String!
    id: String
  }

  type PokemonByTypeObject {
    pokemon: Result
  }
`
const resolvers = {
  Query: {
    allPokemon: async (
      _,
      { offset, limit },
      { PokemonApi }: { PokemonApi: IPokemonApi }
    ) => {
      return await PokemonApi.allPokemon({ offset, limit })
    },
    allPokemonByType: async (
      _,
      { type },
      { PokemonApi }: { PokemonApi: IPokemonApi }
    ) => {
      return await PokemonApi.allPokemonByType(type)
    },
    pokemonById: async (
      _: null,
      args: { id: string },
      { pokemonDataLoader }
    ) => {
      const { id } = args
      return await pokemonDataLoader.load(Number(id))
    },
    allPokemonTypes: async (
      _: null,
      { offset, limit },
      { PokemonApi }: { PokemonApi: IPokemonApi }
    ) => {
      return await PokemonApi.allPokemonTypes({ offset, limit })
    },
    allPokemonSpecies: async (
      _: null,
      { offset, limit },
      { PokemonApi }: { PokemonApi: IPokemonApi }
    ) => {
      return await PokemonApi.allPokemonSpecies({ offset, limit })
    },
  },
  Pokemon: {
    types: async (parent, _, { pokemonDataLoader }) => {
      const { id, name } = parent
      const data = await pokemonDataLoader.load(id ?? name)
      return data.types
    },
    stats: async (parent, _, { pokemonDataLoader }) => {
      const { id, name } = parent
      const data = await pokemonDataLoader.load(id ?? name)
      return data.stats
    },
  },
}

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResponseCache({
      // global cache
      includeExtensionMetadata: true,
      session: () => null,
    }),
  ],
  context: {
    PokemonApi: new PokemonApi(),
    pokemonDataLoader: PokemonLoader,
  },
})

export default server
