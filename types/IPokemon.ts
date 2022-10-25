import DataLoader from 'dataloader'
import PokemonApi from '../utils/PokemonApi'
import { IPokemonSpecies } from './PokemonSpecies'
import { IEvolutionChain } from './EvolutionChain'

export interface GraphQLContext {
  PokemonApi: typeof PokemonApi
  pokemonDataLoader: DataLoader<string, Promise<IPokemon>, string>
  pokemonSpeciesDataLoader: DataLoader<string, Promise<IPokemonSpecies>, string>
  chainLoader: DataLoader<string, Promise<IEvolutionChain>, string>
  moveLoader: DataLoader<string, Promise<IMoveDetails>, string>
}

export interface IPokemon {
  id: string | null
  name: string | null
  height: number
  types: IPokemonTypes[]
  stats: IPokemonStats[]
  sprites: ISprites
  species: IPokemonSpecies
  base_experience: number
  abilities: Abilities[]
  moves: Moves[]
}

export interface Moves {
  move: IMoveDetails
}
export interface IMoveDetails {
  name: string
  url: string
  accuracy: number
  power: number
  pp: number
  priority: number
  type: MoveType
  flavor_text_entries: FlavorText[]
}

export interface FlavorText {
  flavor_text: string
  language: LanguageDetails
  version_group: VersionGroup
}

export interface LanguageDetails {
  name: string
  url: string
}

export interface VersionGroup {
  name: string
  url: string
}

export interface MoveType {
  name: string
}

export interface Abilities {
  ability: Ability
  is_hidden: boolean
  slot: number
}
interface Ability {
  name: string
  url: string
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
  ['official-artwork']: Front_Default
}

export interface Front_Default {
  front_default: string
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
