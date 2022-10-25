import { GetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import usePokemonBackgroundColor from '@pokedex/hooks/usePokemonBackgroundColor'
import PokemonDataModel from '@pokedex/models/PokemonDataModel'
import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import {
  AttributeGroup,
  NavOption,
  AttributePanel,
  AttributePanels,
  AttributeNavigation,
} from '../AttributeNavigation'
import ProgressBar from '../ProgressBar/ProgressBar'

interface IPokemonPanel {
  pokemon: GetPokemonByNameOrIdQuery['pokemonById']
  isLoading: boolean
  handlePagination: { next: () => void; prev: () => void }
}

const PokemonPanel = ({
  pokemon,
  handlePagination,
  isLoading,
}: IPokemonPanel) => {
  const pokemonData = new PokemonDataModel(pokemon)
  const currentColor = usePokemonBackgroundColor(pokemonData)

  return (
    <div className={`${currentColor} rounded-b-[12rem] `}>
      <div className={`mx-auto h-[80vh]  max-w-7xl px-4 pt-32 sm:px-6 lg:px-8`}>
        <div className="flex h-full w-full justify-between">
          <div className="flex h-full w-1/2 flex-col justify-center">
            <div className="flex justify-between gap-2">
              <Image
                alt="left-arrow"
                className="m-8 p-8 drop-shadow-sm"
                width={40}
                height={40}
                src="/assets/icons/arrow-left.svg"
                onClick={() => handlePagination.prev()}
              />
              <h1 className="text-center text-[5rem] capitalize text-white drop-shadow-md">
                <span className="flex">
                  {pokemonData?.name || 'Loading Pokemon...'}
                </span>
              </h1>
              <Image
                alt="right-arrow"
                className="m-8 p-8 drop-shadow-sm"
                width={40}
                height={40}
                src="/assets/icons/arrow-right.svg"
                onClick={() => handlePagination.next()}
              />
            </div>
            {!isLoading && (
              <div className="flex max-h-[50vh] min-h-min flex-col overflow-hidden rounded-lg bg-white bg-opacity-30 p-4 drop-shadow-md">
                <AttributeNavigation id="test-1" navColor={currentColor}>
                  <AttributeGroup>
                    <NavOption>About</NavOption>
                    <NavOption>Base Stats</NavOption>
                    <NavOption>Moves</NavOption>
                  </AttributeGroup>
                  <AttributePanels>
                    <AttributePanel>
                      <div className="grid grid-cols-5 gap-4 py-4">
                        <div className="uppercase text-white">Species</div>
                        <div className="col-span-4 font-bold text-white">
                          {pokemonData.species}
                        </div>
                        <div className="uppercase text-white">Height</div>
                        <div className="col-span-4 font-bold text-white">
                          {pokemonData.height}
                        </div>
                        <div className="uppercase text-white">Weight</div>
                        <div className="col-span-4 font-bold text-white">
                          {pokemonData.weight}
                        </div>
                        <div className="uppercase text-white">Abilities</div>
                        <div className="col-span-4 font-bold text-white">
                          {pokemonData.abilities}
                        </div>
                        <div className="uppercase text-white">Type</div>
                        <div className="col-span-4 flex gap-2 font-bold text-white">
                          {pokemonData?.typeIcons?.map(({ icon, name }) => (
                            <div key={icon} className="flex items-center gap-2">
                              {icon && (
                                <Image
                                  className="m-8 p-8 drop-shadow-sm"
                                  src={icon}
                                  alt={icon}
                                  width={32}
                                  height={32}
                                />
                              )}
                              <span>{name && name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AttributePanel>
                    <AttributePanel>
                      <div className="grid grid-cols-5 gap-4 py-4">
                        {pokemonData.stats?.map((stat) => {
                          return (
                            <>
                              <div className="col-span-2 uppercase text-white">
                                {stat.stat?.name}
                              </div>
                              <div className="col-span-1 font-bold text-white">
                                {stat.base_stat}
                              </div>
                              <div className="col-span-2 font-bold text-white">
                                <ProgressBar
                                  color={pokemonData?.typeColor}
                                  statValue={stat.base_stat}
                                  maxValue={stat.max}
                                />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </AttributePanel>
                    <AttributePanel>
                      <div className="grid grid-cols-3 items-center gap-4 overflow-scroll py-4">
                        <div className="col-span-1 font-bold uppercase text-white">
                          Move
                        </div>
                        <div className="col-span-1 font-bold text-white">
                          Power
                        </div>
                        <div className="col-span-1 flex items-center gap-2 font-bold text-white">
                          Type
                        </div>
                        {pokemonData.moves?.map((move) => {
                          return (
                            <>
                              <div className="col-span-1 uppercase text-white">
                                {move.move}
                              </div>
                              <div className="col-span-1 text-white">
                                {move.power}
                              </div>
                              <div className="col-span-1 flex items-center gap-2 text-white">
                                {move.typeIcon && (
                                  <Image
                                    className="m-8 p-8 drop-shadow-sm"
                                    src={move.typeIcon}
                                    alt={move.typeIcon}
                                    width={32}
                                    height={32}
                                  />
                                )}
                                <span>{move.type && move.type}</span>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </AttributePanel>
                  </AttributePanels>
                </AttributeNavigation>
              </div>
            )}
          </div>
          <div className="relative flex h-full w-1/2 flex-col justify-center">
            {pokemonData?.pokedexNumber && (
              <h1 className="absolute top-0 right-0 z-10 text-center text-[8rem] capitalize text-white opacity-60 drop-shadow-md">
                <span className="flex justify-end">
                  #{pokemonData?.pokedexNumber}
                </span>
              </h1>
            )}
            <div>
              {pokemonData?.image && (
                <Image
                  src={pokemonData?.image}
                  className="relative h-full w-auto max-w-none object-contain drop-shadow-lg"
                  alt={pokemonData.name}
                  width={1000}
                  height={1000}
                  quality={100}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPanel
