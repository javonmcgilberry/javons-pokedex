import { GetAllPokemonSpeciesQuery } from '@pokedex/generated/graphql-hooks'
import { HandleSetActivePokemon } from '@pokedex/types/types'
import { Fragment } from 'react'
import { Pagination } from '../Pagination/Pagination'
import PokemonCard from '../PokemonCard/PokemonCard'

interface IAllPokemonView {
  allPokemonData: GetAllPokemonSpeciesQuery | undefined
  isAllPokemonDataLoading: boolean
  page: number
  totalPages: number
  handlePages: (updatePage: number) => void
  handleSetActivePokemon: HandleSetActivePokemon
}

const AllPokemonView = ({
  isAllPokemonDataLoading,
  allPokemonData,
  page,
  totalPages,
  handlePages,
  handleSetActivePokemon,
}: IAllPokemonView) => {
  return (
    <>
      <div className="relative grid grid-cols-3 gap-4 drop-shadow-md">
        {isAllPokemonDataLoading &&
          [...Array(3)].map((el, index) => (
            <Fragment key={index}>
              <div
                style={{
                  paddingTop: '100%',
                  background: `radial-gradient(circle, gray, rgba(6,11,40,1) 100%)`,
                }}
                className={`relative flex h-0 w-full animate-pulse flex-col items-center rounded-[4rem] bg-opacity-50 p-4`}
                key={el}
              ></div>
            </Fragment>
          ))}
        {allPokemonData?.allPokemonSpecies.map(
          (pokemon: GetAllPokemonSpeciesQuery['allPokemonSpecies'][0]) => {
            return (
              <PokemonCard
                handleSetActivePokemon={handleSetActivePokemon}
                key={pokemon.id}
                pokemon={pokemon}
              />
            )
          }
        )}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePagination={handlePages}
      />
    </>
  )
}

export default AllPokemonView
