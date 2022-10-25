import { IEvolutionChain } from '@pokedex/types/EvolutionChain'
import PokemonApi from '@pokedex/utils/PokemonApi'
import DataLoader from 'dataloader'
import { GraphQLContext, IResult } from '../models'

const getChainById = async (url: string): Promise<IEvolutionChain> => {
  const id = PokemonApi.getId({ url } as IResult) as string
  const responseBody = await PokemonApi.getEvolutionChain({ id })
  return responseBody
}

const getChainByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getChainById(id))
}

export const loadChainData = async (
  parent: unknown,
  chainLoader: GraphQLContext['chainLoader']
) => {
  const { url } = parent as { url: string }
  const data = await chainLoader.load(url)
  return data
}

export const ChainLoader = new DataLoader(getChainByIds)
