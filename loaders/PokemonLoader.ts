import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'
import { GraphQLContext, IPokemon } from '../models'

const getPokemonById = async (id: string): Promise<IPokemon> => {
  const responseBody = await fetch(`${BASE_URL}pokemon/${id}`)
  const data = await responseBody.json()
  console.log('RESPONSE BODY', data)
  return data
}

const getPokemonByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getPokemonById(id))
}

export const loadData = async (
  parent: IPokemon,
  pokemonDataLoader: GraphQLContext['pokemonDataLoader']
) => {
  const { id, name } = parent
  const data = await pokemonDataLoader.load(String(id ?? name))
  return data
}

export const PokemonLoader = new DataLoader(getPokemonByIds)
