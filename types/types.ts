import { InputMaybe } from '../generated/graphql-types'
import { IPokemon, IPokemonByTypeObject, IResult } from '../models'

export interface AllPokemonResponse {
  count: number
  next: string
  previous: string
  results: IResult[]
}

export interface AllPokemonByTypeResponse {
  pokemon: IPokemonByTypeObject[]
}

export interface PaginationParams {
  offset: number
  limit?: InputMaybe<number> | undefined
}

export interface URLParams {
  resource: string
  limit?: string
  id: string
}
