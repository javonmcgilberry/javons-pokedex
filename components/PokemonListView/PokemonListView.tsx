import { POKEMON_TYPES, POKEMON_COLORS } from '@pokedex/consts/consts'
import useActiveCharacteristicSorter, {
  Characteristics,
} from '@pokedex/hooks/useActiveCharacteristicSorter'
import usePokemonListPagination from '@pokedex/hooks/usePokemonListPagination'
import { HandleSetActivePokemon } from '@pokedex/types/types'
import AllPokemonView from '../AllPokemonView/AllPokemonView'
import PokemonColor from '../PokemonColor/PokemonColor'
import PokemonType from '../PokemonType/PokemonType'
import SortedPokemonGrid from '../SortedPokemonGrid/SortedPokemonGrid'

const PokemonListView = ({
  handleSetActivePokemon,
}: {
  handleSetActivePokemon: HandleSetActivePokemon
}) => {
  const {
    totalPages,
    handlePages,
    allPokemonData,
    isAllPokemonDataLoading,
    page,
  } = usePokemonListPagination()
  const {
    handleActiveCharacteristic,
    isSortedGridLoading,
    dataSorted,
    handleActivePokemonCharacteristic,
    activeCharacteristic,
    activeSearchParam,
  } = useActiveCharacteristicSorter()
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Sort By:</h1>
        <div className="flex gap-4 py-8">
          <button
            className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
            onClick={() => handleActiveCharacteristic(Characteristics.TYPE)}
          >
            type
          </button>
          <button
            className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
            onClick={() => handleActiveCharacteristic(Characteristics.COLOR)}
          >
            color
          </button>
          <button
            className="rounded-lg bg-blue-500 p-4 transition-all hover:bg-blue-700"
            onClick={() => handleActiveCharacteristic(null)}
          >
            reset
          </button>
        </div>
      </div>
      {activeCharacteristic === Characteristics.TYPE && (
        <div className="grid grid-cols-9 py-8">
          {POKEMON_TYPES.map((type) => (
            <PokemonType
              key={type}
              type={type}
              activeType={activeSearchParam}
              handleActivePokemonFilter={handleActivePokemonCharacteristic}
            />
          ))}
        </div>
      )}
      {activeCharacteristic === Characteristics.COLOR && (
        <div className="grid grid-cols-5 py-8">
          {POKEMON_COLORS.map((type) => (
            <PokemonColor
              key={type}
              type={type}
              activeType={activeSearchParam}
              handleActivePokemonFilter={handleActivePokemonCharacteristic}
            />
          ))}
        </div>
      )}
      {activeCharacteristic === null && (
        <AllPokemonView
          handleSetActivePokemon={handleSetActivePokemon}
          isAllPokemonDataLoading={isAllPokemonDataLoading}
          allPokemonData={allPokemonData}
          page={page}
          totalPages={totalPages}
          handlePages={handlePages}
        />
      )}
      {activeCharacteristic !== null && activeSearchParam !== null && (
        <SortedPokemonGrid
          isLoading={isSortedGridLoading}
          data={dataSorted}
          handleSetActivePokemon={handleSetActivePokemon}
        />
      )}
    </div>
  )
}

export default PokemonListView
