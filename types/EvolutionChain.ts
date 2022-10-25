import { IPokemon } from '@pokedex/types/IPokemon'

export interface IEvolutionChain {
  chain: IChain
  id: number
}

export interface IChain {
  evolves_to: EvolvesToDetails[]
  is_baby: boolean
  species: IPokemon
}

export interface EvolvesToDetails {
  evolution_details: EvolutionDetails
  evolves_to: EvolvesToDetails[]
  species: IPokemon
}

export interface EvolutionDetails {
  item: EvolutionItem
}

export interface EvolutionItem {
  name: string
  url: string
}
