import { useGetAllPokemonSpeciesQuery } from '@pokedex/generated/graphql-hooks'
import { useState } from 'react'

const usePokemonListPagination = () => {
  const [page, setPage] = useState(1)
  const totalPages = 100
  const handlePages = (updatePage: number) => setPage(updatePage)
  const { data: allPokemonData, isLoading: isAllPokemonDataLoading } =
    useGetAllPokemonSpeciesQuery({
      offset: (page - 1) * 9,
      limit: 9,
    })

  return {
    totalPages,
    handlePages,
    allPokemonData,
    isAllPokemonDataLoading,
    page,
  }
}

export default usePokemonListPagination
