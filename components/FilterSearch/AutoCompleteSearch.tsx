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
      <div className="relative text-gray-600">
        <input
          type="search"
          placeholder="Click a type to filter by both name and type"
          value={value}
          disabled={isLoading}
          onChange={handleChange}
          className="z-10 h-10 w-full rounded-md bg-white px-5 pr-10 text-sm drop-shadow-md focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
          <svg
            className="h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            width="512px"
            height="512px"
          >
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
      {suggestionsActive && (
        <ul className="absolute z-10 w-full">
          {suggestions.map((suggestion, index) => {
            return (
              <li
                className="mt-2 w-full rounded-md bg-white p-2 pl-2 capitalize text-gray-700 drop-shadow-md"
                key={index}
                onClick={() => handleClick(suggestion.id as string)}
              >
                {suggestion.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default AutoCompleteSearch
