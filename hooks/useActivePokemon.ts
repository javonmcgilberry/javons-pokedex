import { useGetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import { useState, useCallback, useMemo } from 'react'

const useActivePokemon = () => {
  const [activePokemonData, setActivePokemonData] = useState<string | number>(
    '1'
  )
  const { data, isLoading } = useGetPokemonByNameOrIdQuery({
    id: activePokemonData as string,
  })
  const activePokemon = data?.pokemonById

  const handlePagination = useMemo(() => {
    return {
      next: () =>
        setActivePokemonData((prev) => {
          const current = Number(prev)
          return Math.max(1, current + 1)
        }),
      prev: () =>
        setActivePokemonData((prev) => {
          const current = Number(prev)
          return Math.max(1, Math.min(905, current - 1))
        }),
    }
  }, [])

  const handleSetActivePokemon = useCallback((id: string) => {
    // POKEMON NAME MUST be lowercase.
    setActivePokemonData(id.toLowerCase())
  }, [])

  return { handleSetActivePokemon, activePokemon, isLoading, handlePagination }
}

export default useActivePokemon
