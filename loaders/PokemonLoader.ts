import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'
import { GraphQLContext } from '../types/IPokemon'
import { IPokemon } from '../types/IPokemon'

const getPokemonById = async (id: string): Promise<IPokemon> => {
  try {
    const responseBody = await fetch(`${BASE_URL}pokemon/${id}`)
    const data = await responseBody.json()
    return data
  } catch {
    const speciesReponse = await fetch(`${BASE_URL}pokemon-species/${id}`)
    const responseData = await speciesReponse.json()
    const responseBody = await fetch(`${BASE_URL}pokemon/${responseData.id}`)
    const data = await responseBody.json()
    return data
  }
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
