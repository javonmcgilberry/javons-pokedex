import { useGetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import { useState, useCallback, useEffect } from 'react'

const useActivePokemon = () => {
  const [activePokemon, setActivePokemon] = useState('1')
  const { data, isLoading } = useGetPokemonByNameOrIdQuery({
    id: activePokemon,
  })

  const handleSetActivePokemon = useCallback((id: string) => {
    setActivePokemon(id)
  }, [])

  useEffect(() => {
    if (data) {
      console.log('selected Pokemon', data.pokemonById)
    }
  }, [data])

  return { handleSetActivePokemon, data, isLoading }
}

export default useActivePokemon
