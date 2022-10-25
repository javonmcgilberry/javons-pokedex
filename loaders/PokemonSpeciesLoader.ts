import { IPokemonSpecies } from '@pokedex/types/PokemonSpecies'
import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'
import { GraphQLContext } from '../models'

const getPokemonSpeciesById = async (id: string): Promise<IPokemonSpecies> => {
  const responseBody = await fetch(`${BASE_URL}pokemon-species/${id}`)
  const data = (await responseBody.json()) as IPokemonSpecies
  return { ...data, id: data.pokedex_numbers[0].entry_number }
}

const getPokemonSpeciesByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getPokemonSpeciesById(id))
}

export const loadData = async (
  parent: { id: string } & IPokemonSpecies,
  pokemonSpeciesDataLoader: GraphQLContext['pokemonSpeciesDataLoader']
) => {
  const { name, pokedex_numbers } = parent
  const data = await pokemonSpeciesDataLoader.load(
    String(pokedex_numbers[0].entry_number ?? name)
  )
  return data
}

export const PokemonSpeciesLoader = new DataLoader(getPokemonSpeciesByIds)
