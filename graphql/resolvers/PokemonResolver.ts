import { IPokemon } from '@pokedex/types/IPokemon'
import { IPokemonSpecies } from '@pokedex/types/PokemonSpecies'
import { Resolvers } from '../../generated/graphql-types'
import { loadData } from '../../loaders/PokemonLoader'
import { loadSpeciesData } from '../../loaders/PokemonSpeciesLoader'

const PokemonResolver: Resolvers['Pokemon'] = {
  id: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.id
  },
  base_experience: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.base_experience
  },
  height: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.height
  },
  abilities: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.abilities
  },
  moves: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.moves
  },
  types: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.types
  },
  species: async (parent, _, { pokemonSpeciesDataLoader }) => {
    const data = await loadSpeciesData(
      parent as IPokemonSpecies & IPokemon,
      pokemonSpeciesDataLoader
    )
    return data
  },
  stats: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    return data.stats
  },
  sprites: async (parent, _, { pokemonDataLoader }) => {
    const data = await loadData(parent, pokemonDataLoader)
    const sprites = {
      ...data.sprites,
      other: {
        ...data.sprites.other,
        official_artwork: data.sprites.other['official-artwork'],
      },
    }
    return sprites
  },
}

export default PokemonResolver
