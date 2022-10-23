import PokemonDataModel from '@pokedex/models/PokemonDataModel'
import { useRef } from 'react'

const usePokemonBackgroundColor = (pokemon: PokemonDataModel) => {
  const currentColor = useRef('')
  currentColor.current =
    pokemon.typeColor === undefined ? currentColor.current : pokemon.typeColor

  return currentColor.current
}

export default usePokemonBackgroundColor
