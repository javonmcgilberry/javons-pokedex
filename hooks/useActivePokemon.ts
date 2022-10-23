import { useGetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import { useState, useCallback } from 'react'

const useActivePokemon = () => {
  const [activePokemon, setActivePokemon] = useState('1')
  const { data, isLoading } = useGetPokemonByNameOrIdQuery({
    id: activePokemon,
  })

  const handleSetActivePokemon = useCallback((id: string) => {
    // POKEMON NAME MUST be lowercase.
    setActivePokemon(id.toLowerCase())
  }, [])

  return { handleSetActivePokemon, data, isLoading }
}

export default useActivePokemon
