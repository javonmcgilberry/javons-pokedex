import DataLoader from 'dataloader'
import { BASE_URL } from '../consts/consts'

const getPokemonById = async (id: string) => {
  const responseBody = await fetch(`${BASE_URL}pokemon/${id}`)
  const data = await responseBody.json()
  return data
}

const getPokemonByIds = async (ids: readonly string[]) => {
  return ids.map(async (id) => await getPokemonById(id))
}

export const PokemonLoader = new DataLoader(getPokemonByIds)
