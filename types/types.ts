type PaginationRequest = (params: PaginationParams) => Promise<Result[]>

type PokemonTypeObj = Omit<Pokemon, 'id'>

interface Pokemon {
  id?: string
  name: string
  url: string
}

export interface Result {
  name: string
  url: string
}

export interface AllPokemonResponse {
  count: number
  next: string
  previous: string
  results: Result[]
}

export interface AllPokemonByTypeResponse {
  pokemon: PokemonTypeObj[]
}

export interface IPokemonApi {
  allPokemon: (params: PaginationParams) => Promise<Pokemon[]>
  allPokemonByType: (type: string) => Promise<PokemonTypeObj[]>
  allPokemonTypes: PaginationRequest
  allPokemonSpecies: PaginationRequest
}

export interface PaginationParams {
  offset: number
  limit: number
}
