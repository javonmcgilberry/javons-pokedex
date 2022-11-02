import { IPokemonSpecies } from '@pokedex/types/PokemonSpecies'
import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'
import { GraphQLContext } from '../types/IPokemon'
import { IPokemon } from '../types/IPokemon'

const getPokemonSpeciesById = async (id: string): Promise<IPokemonSpecies> => {
  /**
   * only lookup "normal type"
   */
  if (id.includes('-')) {
    id = id.split('-')[0]
  }
  const responseBody = await fetch(`${BASE_URL}pokemon-species/${id}`)
  const data = (await responseBody.json()) as IPokemonSpecies
  return { ...data, id: data.pokedex_numbers[0].entry_number }
}

const getPokemonSpeciesByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getPokemonSpeciesById(id))
}

export const loadSpeciesData = async (
  parent: IPokemonSpecies & IPokemon,
  pokemonSpeciesDataLoader: GraphQLContext['pokemonSpeciesDataLoader']
) => {
  const { name, pokedex_numbers } = parent
  const id = Array.isArray(pokedex_numbers)
    ? pokedex_numbers[0]?.entry_number
    : name
  const data = await pokemonSpeciesDataLoader.load(String(id))
  return data
}

export const PokemonSpeciesLoader = new DataLoader(getPokemonSpeciesByIds)
