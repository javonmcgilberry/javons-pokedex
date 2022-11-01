import { POKEMON_COLORS, POKEMON_TYPES } from '@pokedex/consts/consts'
import { isActive, isNotActive } from '@pokedex/utils/helpers'
import Image from 'next/image'

interface IPokemonType {
  type: typeof POKEMON_TYPES[number] | typeof POKEMON_COLORS[number]
  handleActivePokemonFilter: (
    type: typeof POKEMON_TYPES[number] | typeof POKEMON_COLORS[number]
  ) => void
  activeType: string | null
}

const PokemonType = ({
  type,
  handleActivePokemonFilter,
  activeType,
}: IPokemonType) => {
  return (
    <a
      className="flex flex-col"
      key={type}
      onClick={() => handleActivePokemonFilter(type)}
    >
      <div
        className={`relative m-2 justify-center p-8 drop-shadow-sm hover:opacity-80 ${isActive(
          activeType,
          type
        )} ${isNotActive(activeType, type)}`}
      >
        <Image
          src={`/assets/icons/${type}.svg`}
          alt={type as string}
          layout="fill"
        />
      </div>
      <h2 className="text-center font-medium capitalize text-white">{type}</h2>
    </a>
  )
}

export default PokemonType
