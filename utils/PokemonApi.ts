import { BASE_URL } from '../consts/consts'
import {
  AllPokemonByTypeResponse,
  AllPokemonResponse,
  IPokemonApi,
  PaginationParams,
  Result,
} from '../types/types'
import { fetchPokemonApi } from './fetchPokeApi'

class PokemonApi implements IPokemonApi {
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

  getUrl({ resource, limit, id }: any) {
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

  private getId(result: Result) {
    return result.url.split('/')[result.url.split('/').length - 2]
  }

  async allPokemon({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<AllPokemonResponse>(
      this.getFetchPaginationUrl({
        resource: this.resources.Pokemon,
        offset,
        limit,
      })
    )
    return results.map((result: Result) => {
      const id = this.getId(result)
      return { id, ...result }
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
    const { results } = await fetchPokemonApi<{ results: Result[] }>(
      this.getFetchPaginationUrl({
        resource: this.resources.Type,
        offset,
        limit,
      })
    )
    return results.map((result) => {
      const id = this.getId(result)
      return { id, ...result }
    })
  }

  async allPokemonSpecies({ offset, limit }: PaginationParams) {
    const { results } = await fetchPokemonApi<{ results: Result[] }>(
      this.getFetchPaginationUrl({
        resource: this.resources.Pokemon,
        offset,
        limit,
      })
    )
    return results.map((result) => {
      const id = this.getId(result)
      return { id, ...result }
    })
  }
}

export default PokemonApi
