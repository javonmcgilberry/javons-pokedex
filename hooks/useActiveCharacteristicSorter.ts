import {
  useGetAllPokemonByTypeQuery,
  useGetAllPokemonByColorQuery,
} from '@pokedex/generated/graphql-hooks'
import { useState } from 'react'

export enum Characteristics {
  TYPE,
  COLOR,
}

const useActiveCharacteristicSorter = () => {
  const [activeCharacteristic, setActiveCharacteristic] =
    useState<null | Characteristics>(null)

  const [activeSearchParam, setActiveSearchParam] = useState<null | string>(
    null
  )

  const handleActivePokemonCharacteristic = (type: string) => {
    setActiveSearchParam((prev) => (prev === type ? null : type))
  }

  const { data: pokemonByTypeData, isLoading: isPokemonByTypeLoading } =
    useGetAllPokemonByTypeQuery(
      { type: activeSearchParam as unknown as string },
      {
        enabled:
          activeSearchParam !== null &&
          activeCharacteristic === Characteristics.TYPE,
      }
    )

  const { data: pokemonByColorData, isLoading: isPokemonByColorLoading } =
    useGetAllPokemonByColorQuery(
      { color: activeSearchParam as unknown as string },
      {
        enabled:
          activeSearchParam !== null &&
          activeCharacteristic === Characteristics.COLOR,
      }
    )

  const dataSorted = [
    pokemonByTypeData?.allPokemonByType,
    pokemonByColorData?.allPokemonByColor,
  ].find((data) => data !== undefined)

  const handleActiveCharacteristic = (
    characteristic: Characteristics | null
  ) => {
    setActiveCharacteristic(characteristic)
    setActiveSearchParam(null)
  }

  const isSortedGridLoading =
    activeSearchParam !== null &&
    ((activeCharacteristic === Characteristics.COLOR &&
      isPokemonByColorLoading) ||
      (activeCharacteristic === Characteristics.TYPE && isPokemonByTypeLoading))

  return {
    handleActiveCharacteristic,
    isSortedGridLoading,
    dataSorted,
    handleActivePokemonCharacteristic,
    activeCharacteristic,
    activeSearchParam,
  }
}

export default useActiveCharacteristicSorter
