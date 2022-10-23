import { BASE_URL } from '../consts/consts'
import { IResult } from '../models'
import {
  AllPokemonByTypeResponse,
  AllPokemonResponse,
  PaginationParams,
  URLParams,
} from '../types/types'
import { fetchPokemonApiData } from './fetchPokeApi'

class PokemonApi {
  private baseUrl: string
  private resources: {
    Pokemon: 'pokemon'
    Species: 'pokemon-species'
    Type: 'type'
  }
  constructor() {
    this.baseUrl = BASE_URL
    this.resources = {
      Pokemon: 'pokemon',
      Species: 'pokemon-species',
      Type: 'type',
    }
  }

  private getId(result: IResult) {
    if (result.url) {
      return result.url.split('/')[result.url.split('/').length - 2]
    }
    return null
  }

  private async getPaginatedData<T>({
    resource,
    offset,
    limit,
  }: PaginationParams) {
    const url = `${this.baseUrl}${resource}?offset=${offset}&limit=${limit}`
    const data = await fetchPokemonApiData<T>(url)
    return data
  }

  private setData(results: IResult[]) {
    return results.map((result: IResult) => {
      return { ...result, id: this.getId(result) }
    })
  }

  async allPokemon({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<AllPokemonResponse>({
      resource: this.resources.Pokemon,
      offset,
      limit,
    })
    const { results } = await data
    return this.setData(results)
  }

  async allPokemonByType(type: string) {
    const url = `${this.baseUrl}${this.resources.Type}/${type}`
    const { pokemon } = await fetchPokemonApiData<AllPokemonByTypeResponse>(url)
    return pokemon
  }

  async allPokemonTypes({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<{ results: IResult[] }>({
      resource: this.resources.Type,
      offset,
      limit,
    })
    const { results } = await data
    return this.setData(results)
  }

  async allPokemonSpecies({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<{ results: IResult[] }>({
      resource: this.resources.Species,
      offset,
      limit,
    })
    const { results } = await data
    return this.setData(results)
  }
}

export default PokemonApi
