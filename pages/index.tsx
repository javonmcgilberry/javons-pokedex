import {
  GetPokemonByNameOrIdQuery,
  useGetAllPokemonNamesQuery,
  useGetAllPokemonQuery,
  useGetPokemonByNameOrIdQuery,
} from '@pokedex/generated/graphql-hooks'
import { getSearchResults } from '@pokedex/utils/helpers'
import useDebounce from '@pokedex/utils/useDebounce'
import Image from 'next/image'
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useRef,
} from 'react'

const Header = ({ render }: { render: () => React.ReactNode }) => {
  return (
    <div className="fixed flex w-full items-center justify-between bg-white p-4">
      <div>
        <Image
          src="/pokemon_logo.svg"
          alt="pokemon-logo"
          width={120}
          height={60}
        />
      </div>
      {render()}
    </div>
  )
}

class Pokemon {
  constructor(private pokemon: GetPokemonByNameOrIdQuery['pokemonById']) {}

  private getTypeColor(type: string | undefined) {
    return `bg-${type}`
  }

  get name() {
    return this.pokemon?.name
  }

  get stats() {
    return this.pokemon?.stats
  }

  get image() {
    return this.pokemon?.sprites.other?.home?.front_default as string
  }

  get types() {
    return this.pokemon?.types
  }

  get typeColor() {
    if (this.pokemon?.types) {
      return this.getTypeColor(this.pokemon?.types[0].type?.name)
    }
  }

  get typeIcons() {
    if (this.pokemon?.types) {
      return this.pokemon?.types.map(
        (typeObj) => `/assets/icons/${typeObj.type?.name}.svg`
      )
    }
  }
}

const SearchInput = ({ value, onChange, onSelectPokemon }) => {
  const { data, isLoading } = useGetAllPokemonNamesQuery()
  const searchResults = getSearchResults(data?.allPokemonSpecies, value)
  const debouncedValue = useDebounce(searchResults, 500) as string[]
  return (
    <div className="absolute right-4 flex w-1/3 flex-col justify-center">
      <input
        type="search"
        placeholder="Find a Pokemon..."
        disabled={isLoading}
        value={value}
        onChange={onChange}
        className="w-full rounded py-3 px-4 font-thin shadow shadow-gray-100 duration-100 focus:shadow-lg focus:shadow-slate-200 focus:outline-none"
      />
      <ul
        className={`absolute top-16 w-full transition-all ${
          debouncedValue.length > 0 ? 'opacity-100' : 'opacity-0'
        } `}
      >
        {value.length > 0 &&
          debouncedValue.map((searchResult) => (
            <li
              key={searchResult}
              onClick={() => onSelectPokemon(searchResult)}
              className="mt-2 w-full bg-white p-4 capitalize text-gray-700"
            >
              {searchResult}
            </li>
          ))}
      </ul>
    </div>
  )
}

const PokemonPanel = ({
  pokemon,
}: {
  pokemon: GetPokemonByNameOrIdQuery['pokemonById']
  isLoading: boolean
}) => {
  const currentColor = useRef('')
  const nextColor = useRef()
  const pokeData = new Pokemon(pokemon)
  const [panelColor, setPanelColor] = useState(pokeData.typeColor)
  currentColor.current = pokeData.typeColor as string

  return (
    <div>
      {' '}
      <div
        className={`mx-auto max-w-7xl ${currentColor.current} px-4 pt-32 sm:px-6 lg:px-8`}
      >
        {pokeData?.name}

        {pokeData.typeIcons?.map((icon) => (
          <Image key={icon} src={icon} alt={icon} width={40} height={40} />
        ))}
        <Image
          src={pokeData?.image}
          width={400}
          height={400}
          alt={pokeData.name}
          quality={100}
        />
      </div>
    </div>
  )
}

export default function Home() {
  const [offset, setOffset] = useState(0)
  const [activePokemon, setActivePokemon] = useState('1')
  const { data, isLoading } = useGetPokemonByNameOrIdQuery({
    id: activePokemon,
  })
  const [value, setValue] = useState('')

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  const handleSelectPokemon = useCallback((value: string) => {
    setActivePokemon(value)
    setValue('')
  }, [])

  useEffect(() => {
    if (data) {
      console.log('selected Pokemon', data.pokemonById)
    }
  }, [data])

  return (
    <div>
      <Header
        render={() => (
          <SearchInput
            value={value}
            onChange={handleChange}
            onSelectPokemon={handleSelectPokemon}
          />
        )}
      />
      <PokemonPanel pokemon={data?.pokemonById} isLoading={isLoading} />

      <div className="mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        {/* <PokemonPanel pokemon={data?.pokemonById} isLoading={isLoading} /> */}

        <div className="mt-10 space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
          <div className="cursor-pointer rounded-md bg-amber-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-red-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-green-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>

          <div className="cursor-pointer rounded-md bg-purple-500 p-4 text-center text-white shadow-xl">
            <div className="mt-2 font-bold">John Doe</div>
            <div className="font-light">Some description</div>
          </div>
        </div>
      </div>
    </div>
  )
}
