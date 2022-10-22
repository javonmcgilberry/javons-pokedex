// pages/api/graphql.js
import { useResponseCache } from '@envelop/response-cache'
import { createServer } from '@graphql-yoga/node'
import DataLoader from 'dataloader'
import { getPokemonByIds, PokemonLoader } from '../../loaders/PokemonLoader'

type PokemonTypeObj = Omit<Pokemon, 'id'>

interface Result {
  name: string
  url: string
}

interface AllPokemonResponse {
  count: number
  next: string
  previous: string
  results: Result[]
}

interface AllPokemonByTypeResponse {
  pokemon: PokemonTypeObj[]
}

type FetchParams = Parameters<typeof fetch>
type FetchInput = FetchParams[0]
type FetchInit = FetchParams[1]

const fetchPokemonApi = <T>(
  input: FetchInput,
  init: FetchInit = {}
): Promise<T> => {
  return fetch(input, {
    ...init,
    // ensure cookies are always passed
    credentials: 'same-origin',

    headers: {
      ...init.headers,
      // always include this header
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      // Throw error for error status codes (400+)
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp
    })
    .then((resp) => resp.json() as Promise<T>)
}

export const BASE_URL = `https://pokeapi.co/api/v2/`
const POKEMON_TYPE_COUNT = 20

export const getUrl = ({ resource, limit, id }: any) => {
  return `${BASE_URL}${resource}${
    id ? `${id && `/${id}`}` : `${limit && `?limit=${limit}`}`
  }`
}

interface Pokemon {
  id?: string
  name: string
  url: string
}

interface IPokemonApi {
  allPokemon: (params: PaginationParams) => Promise<Pokemon[]>
  allPokemonByType: (type: string) => Promise<PokemonTypeObj[]>
  allPokemonTypes: (params: PaginationParams) => Promise<Result[]>
  allPokemonSpecies: (params: PaginationParams) => Promise<Result[]>
}

interface PaginationParams {
  offset: number
  limit: number
}

class PokemonApi implements IPokemonApi {
  private resources: Record<string, string>
  private baseUrl: string
  constructor() {
    this.baseUrl = BASE_URL
    this.resources = {
      Pokemon: 'pokemon',
      Species: 'pokemon-species',
      Type: 'type',
    }
  }

  getFetchPaginationUrl({
    resource,
    offset,
    limit = 20,
  }: { resource: string } & PaginationParams) {
    return `${this.baseUrl}${resource}?offset=${offset}&limit=${limit}`
  }
  private getId(result: Result) {
    return result.url.split('/')[result.url.split('/').length - 2]
  }

  async allPokemon({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<AllPokemonResponse>(
      this.getFetchPaginationUrl({
        resource: this.resources.Pokemon,
        offset,
        limit,
      })
    )
    return results.map((result: Result) => {
      const id = this.getId(result)
      return { id, ...result }
    })
  }

  async allPokemonByType(type: string) {
    const { pokemon } = await fetchPokemonApi<AllPokemonByTypeResponse>(
      getUrl({
        resource: this.resources.Type,
        id: type,
      })
    )
    return pokemon
  }
  async allPokemonTypes() {
    const { results } = await fetchPokemonApi<{ results: Result[] }>(
      getUrl({
        resource: this.resources.Type,
        limit: POKEMON_TYPE_COUNT,
      })
    )
    return results.map((result) => {
      const id = this.getId(result)
      return { id, ...result }
    })
  }
  async allPokemonSpecies() {
    const { results } = await fetchPokemonApi<{ results: Result[] }>(
      getUrl({
        resource: this.resources.Species,
        limit: POKEMON_TYPE_COUNT,
      })
    )
    return results.map((result) => {
      const id = this.getId(result)
      return { id, ...result }
    })
  }
}

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
