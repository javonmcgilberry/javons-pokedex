import DataLoader from 'dataloader'
import PokemonApi from './utils/PokemonApi'

export interface GraphQLContext {
  PokemonApi: PokemonApi
  pokemonDataLoader: DataLoader<string, Promise<IPokemon>, string>
  // pokemonSpeciesDataLoader: DataLoader<string, Promise<IPokemon>, string>
}

export interface IPokemon {
  id: string | null
  name: string | null
  types: IPokemonTypes[]
  stats: IPokemonStats[]
  sprites: ISprites
}

export interface IPokemonTypes {
  slot: number
  type: IPokemonTypeDetails
}

export interface IPokemonStats {
  base_stat: number
  effort: number
  stat: IPokemonStat
}

export interface IPokemonStat {
  name: string
  url: string
}

export interface IPokemonTypeDetails {
  name: string
  url: string
}

export interface ISprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other: IOtherSprites
}

export interface IOtherSprites {
  dream_world: DreamWorld
  home: IHome
}

export interface DreamWorld {
  front_default: string
  front_female: string
}

export interface IHome {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface IResult extends IPokemon {
  url: string | null
}

export interface IPokemonByTypeObject {
  pokemon: IResult
}
