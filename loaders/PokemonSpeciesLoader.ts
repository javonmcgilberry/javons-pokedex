import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'
import { GraphQLContext, IPokemon } from '../models'

const getPokemonSpeciesById = async (id: string): Promise<IPokemon> => {
  const responseBody = await fetch(`${BASE_URL}pokemon-species/${id}`)
  const data = await responseBody.json()
  return data
}

const getPokemonSpeciesByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getPokemonSpeciesById(id))
}

export const loadData = async (
  parent: IPokemon,
  pokemonSpeciesDataLoader: GraphQLContext['pokemonSpeciesDataLoader']
) => {
  const { id, name } = parent
  const data = await pokemonSpeciesDataLoader.load(String(id ?? name))
  return data
}

export const PokemonLoader = new DataLoader(getPokemonSpeciesByIds)
