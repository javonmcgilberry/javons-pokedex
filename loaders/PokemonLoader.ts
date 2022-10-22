import DataLoader from 'dataloader'
import { getUrl } from '../pages/api/graphql'

const getPokemonById = async (id: string) => {
  const responseBody = await fetch(
    getUrl({
      resource: 'pokemon',
      id,
    })
  )
  const data = await responseBody.json()
  return data
}

const getPokemonByIds = async (ids: readonly string[]) => {
  console.log('GETTING ID', ids)
  return ids.map(async (id) => await getPokemonById(id))
}

export const PokemonLoader = new DataLoader(getPokemonByIds)
