import { GetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import { stat } from 'fs'

class PokemonDataModel {
  private metersToFeet = 3.281
  private kilosToPounds = 3.281

  constructor(
    private pokemon: GetPokemonByNameOrIdQuery['pokemonById'],
    private language = 'en'
  ) {
    this.pokemon = pokemon
    this.language = language
  }

  private kToLbs(pK: number) {
    const nearExact = pK / 0.45359237
    const lbs = Math.floor(nearExact)
    const oz = (nearExact - lbs) * 16
    return {
      pounds: lbs,
      ounces: oz,
    }
  }

  private getTypeColor(type: string | undefined) {
    return `bg-${type}`
  }

  get name() {
    return this.pokemon?.name
  }

  get stats() {
    const baseValues = this.pokemon?.stats?.map(
      (stat) => stat.base_stat
    ) as number[]
    return this.pokemon?.stats?.map((stat) => ({
      ...stat,
      min: Math.min(...baseValues),
      max: Math.max(...baseValues),
    }))
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
      return this.pokemon?.types.map((typeObj) => ({
        icon: `/assets/icons/${typeObj.type?.name}.svg`,
        name: typeObj.type?.name,
      }))
    }
  }

  get species() {
    return this.pokemon?.species?.genera?.find(
      (species) => species?.language?.name === this.language
    )?.genus
  }

  get height() {
    if (!this.pokemon?.height) {
      return ''
    }
    const height = parseFloat(
      ((this.pokemon?.height as number) * 0.1).toFixed(2)
    )
    return `${(height * this.metersToFeet).toFixed(2)}ft (${height}m)`
  }

  get weight() {
    if (!this.pokemon?.weight) {
      return ''
    }
    const kilos = parseFloat(
      ((this.pokemon?.weight as number) * 0.1).toFixed(2)
    )
    const weight = this.kToLbs(this.pokemon?.weight as number)
    return `${weight.pounds.toFixed(2)}lbs ${weight.ounces.toFixed(
      2
    )}oz (${kilos} kg)`
  }

  get abilities() {
    if (!this.pokemon?.abilities) {
      return ''
    }
    return this.pokemon?.abilities
      ?.map((ability) => {
        if (ability?.ability?.name) {
          return (
            ability?.ability?.name?.charAt(0).toUpperCase() +
            ability?.ability?.name?.slice(1).toLowerCase()
          )
        }
      })
      .join(', ')
  }
}
export default PokemonDataModel
