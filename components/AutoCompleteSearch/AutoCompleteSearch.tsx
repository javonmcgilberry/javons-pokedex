import useAutoCompleteSearch from '@pokedex/hooks/useAutoCompleteSearch'

interface IAutoCompleteSearch {
  handleSetActivePokemon: (pokemonName: string) => void
}

const AutoCompleteSearch = ({
  handleSetActivePokemon,
}: IAutoCompleteSearch) => {
  const {
    value,
    handleChange,
    suggestions,
    suggestionsActive,
    handleClick,
    isLoading,
  } = useAutoCompleteSearch({
    onPokemonNameSelected: handleSetActivePokemon,
  })
  return (
    <div className="relative">
      <input
        className="w-full rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
        type="search"
        placeholder="Find a Pokemon..."
        value={value}
        disabled={isLoading}
        onChange={handleChange}
      />
      {suggestionsActive && (
        <ul className="absolute w-full">
          {suggestions.map((suggestion, index) => {
            return (
              <li
                className="mt-2 w-full rounded-md bg-white p-4 capitalize text-gray-700"
                key={index}
                onClick={handleClick}
              >
                {suggestion}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default AutoCompleteSearch
