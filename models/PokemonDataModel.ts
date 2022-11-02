import { GetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'

class PokemonDataModel {
  private metersToFeet = 3.281

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

  get backgroundColor() {
    const colors: Record<string, string> = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD',
    }
    if (this.pokemon?.types && this.pokemon?.types[0].type)
      return colors[this.pokemon?.types[0].type?.name]
  }

  get pokedexNumber() {
    return this.pokemon?.id as string
  }

  private mapImages(
    evolutionsArray: GetPokemonByNameOrIdQuery['pokemonById'][]
  ) {
    return evolutionsArray
      .map((pokemon) => ({
        ...pokemon,
        image: pokemon?.sprites?.other?.official_artwork?.front_default,
      }))
      .filter((pokemon) => pokemon.image !== undefined)
  }

  private getEvolution(pokemon: GetPokemonByNameOrIdQuery['pokemonById']) {
    const evolutionsArray = [pokemon?.species?.evolution_chain?.species]
    const evolutions = pokemon?.species?.evolution_chain?.evolves_to
    if (pokemon?.species?.evolution_chain?.evolves_to?.length === 0)
      return this.mapImages(evolutionsArray)
    if (evolutions) {
      for (const pokemon of evolutions) {
        evolutionsArray.push(pokemon?.species)
        if (pokemon?.evolves_to) {
          evolutionsArray.push(pokemon.evolves_to[0]?.species)
        }
      }
    }

    return this.mapImages(evolutionsArray)
  }

  private getTypeColor(type: string | undefined) {
    return `bg-${type}`
  }

  get name() {
    /**
     * only lookup "normal type"
     */
    if (this.pokemon?.name.includes('-')) {
      return this.pokemon?.name.split('-')[0]
    }
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
    return this.pokemon?.sprites.other?.official_artwork
      ?.front_default as string
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
        name: `${typeObj.type?.name}`,
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
    const height = parseFloat((this.pokemon?.height * 0.1).toFixed(2))
    return `${(height * this.metersToFeet).toFixed(2)}ft (${height}m)`
  }

  get weight() {
    if (!this.pokemon?.weight) {
      return ''
    }
    const kilos = parseFloat((this.pokemon?.weight * 0.1).toFixed(2))
    const weight = this.kToLbs(this.pokemon?.weight)
    return `${(0.1 * weight.pounds).toFixed(2)}lbs ${weight.ounces.toFixed(
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

  get moves() {
    if (!this.pokemon?.moves) {
      return [{ move: '', type: '', power: '', typeIcon: '' }]
    }

    return this.pokemon.moves.map((move) => ({
      move: move?.move?.name as string,
      power: move?.move?.power as number,
      type: move?.move?.type?.name as string,
      typeIcon: `/assets/icons/${move?.move?.type?.name}.svg`,
    }))
  }

  get evolutions() {
    if (!this.pokemon?.species?.evolution_chain) {
      return null
    }
    if (this.pokemon.species) {
      return this.getEvolution(this.pokemon) as {
        name: string
        image: string
        id: string
      }[]
    }
  }
}
export default PokemonDataModel
