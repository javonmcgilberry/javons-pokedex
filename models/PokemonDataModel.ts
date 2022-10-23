import { GetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'

class PokemonDataModel {
  constructor(private pokemon: GetPokemonByNameOrIdQuery['pokemonById']) {}

  private getTypeColor(type: string | undefined) {
    return `bg-${type}`
  }

  get name() {
    return this.pokemon?.name
  }

  get stats() {
    return this.pokemon?.stats
  }

  get image() {
    return this.pokemon?.sprites.other?.home?.front_default as string
  }

  get types() {
    return this.pokemon?.types
  }

  get typeColor() {
    if (this.pokemon?.types) {
      return this.getTypeColor(this.pokemon?.types[0].type?.name)
    }
  }

  get typeIcons() {
    if (this.pokemon?.types) {
      return this.pokemon?.types.map(
        (typeObj) => `/assets/icons/${typeObj.type?.name}.svg`
      )
    }
  }
}
export default PokemonDataModel
