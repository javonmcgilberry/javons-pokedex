import { Resolvers } from '@pokedex/generated/graphql-types'
import { loadChainData } from '@pokedex/loaders/ChainLoader'

const ChainResolver: Resolvers['Chain'] = {
  evolves_to: async (parent, args, { chainLoader }) => {
    const response = await loadChainData(parent, chainLoader)
    return await response.chain?.evolves_to
  },
  is_baby: async (parent, args, { chainLoader }) => {
    const response = await loadChainData(parent, chainLoader)
    return await response.chain?.is_baby
  },
  species: async (parent, args, { chainLoader }) => {
    const response = await loadChainData(parent, chainLoader)
    return await response.chain?.species
  },
}

export default ChainResolver
