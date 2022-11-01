import {
  GetAllPokemonNamesQuery,
  useGetAllPokemonNamesQuery,
} from '@pokedex/generated/graphql-hooks'
import { getSearchResults } from '@pokedex/utils/helpers'
import { useState, ChangeEvent } from 'react'

const useAutoCompleteSearch = ({
  onPokemonNameSelected,
}: {
  onPokemonNameSelected: (pokemonName: string) => void
}) => {
  const { data, isLoading } = useGetAllPokemonNamesQuery()
  const [value, setValue] = useState('')
  const searchResults = getSearchResults(data?.allPokemonSpecies, value)
  const [suggestions, setSuggestions] = useState<
    GetAllPokemonNamesQuery['allPokemonSpecies']
  >([{ name: 'bulbasaur', id: '1' }])
  const [suggestionsActive, setSuggestionsActive] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setValue(query)
    if (query.length > 1) {
      const filterSuggestions = searchResults.filter(
        (suggestion) => suggestion.name.toLowerCase().indexOf(query) > -1
      )
      setSuggestions(filterSuggestions)
      setSuggestionsActive(true)
    } else {
      setSuggestionsActive(false)
    }
  }

  const handleClick = (e: string) => {
    onPokemonNameSelected(e)
    setSuggestionsActive(false)
    setSuggestions([])
    setValue('')
  }

  return {
    value,
    isLoading,
    handleChange,
    suggestions,
    suggestionsActive,
    handleClick,
  }
}

export default useAutoCompleteSearch
