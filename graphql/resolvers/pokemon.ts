import { Resolvers } from '../../generated/graphql-types'
import { loadData } from '../../loaders/PokemonLoader'

const Pokemon: Resolvers['Pokemon'] = {
  types: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.types
  },
  stats: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.stats
  },
  sprites: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.sprites
  },
}

export default Pokemon
