import { BASE_URL } from '../consts/consts'
import { IResult } from '../models'
import {
  AllPokemonByTypeResponse,
  AllPokemonResponse,
  PaginationParams,
  URLParams,
} from '../types/types'
import { fetchPokemonApi } from './fetchPokeApi'

class PokemonApi {
  private resources: Record<string, string>
  private baseUrl: string
  constructor() {
    this.baseUrl = BASE_URL
    this.resources = {
      Pokemon: 'pokemon',
      Species: 'pokemon-species',
      Type: 'type',
    }
  }

  private getUrl({ resource, limit, id }: URLParams) {
    return `${this.baseUrl}${resource}${
      id ? `${id && `/${id}`}` : `${limit && `?limit=${limit}`}`
    }`
  }

  private getFetchPaginationUrl({
    resource,
    offset,
    limit = 20,
  }: { resource: string } & PaginationParams) {
    return `${this.baseUrl}${resource}?offset=${offset}&limit=${limit}`
  }

  private getId(result: IResult) {
    if (result.url) {
      return result.url.split('/')[result.url.split('/').length - 2]
    }
    return null
  }

  async allPokemon({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<AllPokemonResponse>(
      this.getFetchPaginationUrl({
        resource: this.resources.Pokemon,
        offset,
        limit,
      })
    )
    return results.map((result: IResult) => {
      return { ...result, id: this.getId(result) }
    })
  }

  async allPokemonByType(type: string) {
    const { pokemon } = await fetchPokemonApi<AllPokemonByTypeResponse>(
      this.getUrl({
        resource: this.resources.Type,
        id: type,
      })
    )
    return pokemon
  }

  async allPokemonTypes({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<{ results: IResult[] }>(
      this.getFetchPaginationUrl({
        resource: this.resources.Type,
        offset,
        limit,
      })
    )
    return results.map((result) => {
      return { ...result, id: this.getId(result) }
    })
  }

  async allPokemonSpecies({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<{ results: IResult[] }>(
      this.getFetchPaginationUrl({
        resource: this.resources.Pokemon,
        offset,
        limit,
      })
    )
    return results.map((result) => {
      return { ...result, id: this.getId(result) }
    })
  }
}

export default PokemonApi
