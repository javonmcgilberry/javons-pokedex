import PokemonApi from '@pokedex/api-utils/PokemonApi'
import DataLoader from 'dataloader'
import { GraphQLContext, IResult, IMoveDetails } from '../types/IPokemon'

const getMoveById = async (url: string): Promise<IMoveDetails> => {
  const id = PokemonApi.getId({ url } as IResult) as string
  const responseBody = await PokemonApi.getMove({ id })
  return responseBody
}

const getMoveByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getMoveById(id))
}

export const loadMoveData = async (
  parent: unknown,
  moveLoader: GraphQLContext['moveLoader']
) => {
  const { url } = parent as { url: string }
  const data = await moveLoader.load(url)
  return data
}

export const MoveLoader = new DataLoader(getMoveByIds)
