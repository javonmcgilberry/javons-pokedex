import { GetAllPokemonQuery } from '@pokedex/generated/graphql-hooks'
import { InputMaybe } from '../generated/graphql-types'
import { IPokemonByTypeObject, IResult } from './IPokemon'

export interface AllPokemonResponse {
  count: number
  next: string
  previous: string
  results: IResult[]
}

export interface AllPokemonByTypeResponse {
  pokemon: IPokemonByTypeObject[]
}

export interface AllPokemonByColorResponse {
  pokemon_species: { name: string; url: string }[]
}

export interface PaginationParams {
  offset: number
  limit?: InputMaybe<number> | undefined
  resource?: string
}

export interface URLParams {
  resource: string
  limit?: string
  id: string
}

export type HandleSetActivePokemon = (
  id: GetAllPokemonQuery['allPokemon'][0]['id']
) => void
