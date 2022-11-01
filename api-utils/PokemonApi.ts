import { IEvolutionChain } from '@pokedex/types/EvolutionChain'
import { BASE_URL } from '../consts/consts'
import { IResult, IMoveDetails } from '../types/IPokemon'
import {
  AllPokemonByColorResponse,
  AllPokemonByTypeResponse,
  AllPokemonResponse,
  PaginationParams,
} from '../types/types'
import { fetchPokemonApiData } from './fetchPokemonApi'

class PokemonApi {
  private static resources = {
    Pokemon: 'pokemon',
    Species: 'pokemon-species',
    Type: 'type',
    PokemonColor: 'pokemon-color',
    Evolution: 'evolution-chain',
    move: 'move',
  }
  private static baseUrl = BASE_URL
  static getId(result: IResult) {
    if (result.url) {
      return result.url.split('/')[result.url.split('/').length - 2]
    }
    return null
  }

  private static async getPaginatedData<T>({
    resource,
    offset,
    limit,
  }: PaginationParams) {
    const url = `${this.baseUrl}${resource}?offset=${offset}&limit=${limit}`
    const data = await fetchPokemonApiData<T>(url)
    return data
  }

  private static setData(results: IResult[]) {
    return results.map((result: IResult) => {
      return { ...result, id: this.getId(result) }
    })
  }

  static async allPokemon({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<AllPokemonResponse>({
      resource: this.resources.Pokemon,
      offset,
      limit,
    })
    const { results } = data
    return this.setData(results)
  }

  static async allPokemonByType(type: string) {
    const url = `${this.baseUrl}${this.resources.Type}/${type}`
    const { pokemon } = await fetchPokemonApiData<AllPokemonByTypeResponse>(url)
    return pokemon
  }

  static async allPokemonByColor(color: string) {
    const url = `${this.baseUrl}${this.resources.PokemonColor}/${color}`
    const { pokemon_species } =
      await fetchPokemonApiData<AllPokemonByColorResponse>(url)
    return pokemon_species
  }

  static async allPokemonTypes({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<{ results: IResult[] }>({
      resource: this.resources.Type,
      offset,
      limit,
    })
    const { results } = data
    return this.setData(results)
  }

  static async getEvolutionChain({ id }: { id: string }) {
    const url = `${this.baseUrl}${this.resources.Evolution}/${id}`
    const data = await fetchPokemonApiData<IEvolutionChain>(url)
    return data
  }

  static async getMove({ id }: { id: string }) {
    const url = `${this.baseUrl}${this.resources.move}/${id}`
    const data = await fetchPokemonApiData<IMoveDetails>(url)
    return data
  }

  static async allPokemonSpecies({ offset, limit }: PaginationParams) {
    const data = await this.getPaginatedData<{ results: IResult[] }>({
      resource: this.resources.Species,
      offset,
      limit,
    })
    const { results } = data
    return this.setData(results)
  }
}

export default PokemonApi
