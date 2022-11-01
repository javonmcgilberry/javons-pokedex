import { POKEMON_COLORS } from '@pokedex/consts/consts'
import { isActive, isNotActive } from '@pokedex/utils/helpers'

interface IPokemonColor {
  type: typeof POKEMON_COLORS[number]
  handleActivePokemonFilter: (type: typeof POKEMON_COLORS[number]) => void
  activeType: string | null
}

const PokemonColor = ({
  type,
  handleActivePokemonFilter,
  activeType,
}: IPokemonColor) => {
  return (
    <a
      className="flex flex-col"
      key={type}
      onClick={() => handleActivePokemonFilter(type)}
    >
      <button
        style={{ backgroundColor: `${type}` }}
        className={`relative m-2 justify-center rounded-md p-8 drop-shadow-sm hover:opacity-80 ${isActive(
          activeType,
          type
        )} ${isNotActive(activeType, type)}`}
      ></button>
    </a>
  )
}

export default PokemonColor
