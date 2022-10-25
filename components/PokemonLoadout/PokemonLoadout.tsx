import { GetPokemonByNameOrIdQuery } from '@pokedex/generated/graphql-hooks'
import usePokemonBackgroundColor from '@pokedex/hooks/usePokemonBackgroundColor'
import PokemonDataModel from '@pokedex/models/PokemonDataModel'
import Image from 'next/image'
import {
  AttributeGroup,
  NavOption,
  AttributePanel,
  AttributePanels,
  AttributeNavigation,
} from '../AttributeNavigation'

interface IPokemonPanel {
  pokemon: GetPokemonByNameOrIdQuery['pokemonById']
  isLoading: boolean
  handlePagination: { next: () => void; prev: () => void }
}

const PokemonPanel = ({ pokemon, handlePagination }: IPokemonPanel) => {
  console.log('GIVE ME THE POKEMON', pokemon)
  const pokemonData = new PokemonDataModel(pokemon)
  const currentColor = usePokemonBackgroundColor(pokemonData)
  return (
    <div className={`${currentColor}`}>
      <div className={`mx-auto max-w-7xl  px-4 pt-32 sm:px-6 lg:px-8`}>
        <div className="flex h-full w-full justify-between">
          <div className="flex h-full w-1/2 flex-col">
            <div className="flex justify-between gap-2">
              <Image
                alt="left-arrow"
                className="m-8 p-8 drop-shadow-sm"
                width={40}
                height={40}
                src="/assets/icons/arrow-left.svg"
                onClick={() => handlePagination.prev()}
              />
              <h1 className="text-[5rem] capitalize text-white drop-shadow-md">
                <span>{pokemonData?.name || 'Loading...'}</span>
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
            <div className="flex h-full flex-col rounded-lg bg-white bg-opacity-30 p-4 drop-shadow-md	">
              <AttributeNavigation id="test-1" navColor={currentColor}>
                <AttributeGroup>
                  <NavOption>About</NavOption>
                  <NavOption>Base Stats</NavOption>
                  <NavOption>Moves</NavOption>
                </AttributeGroup>
                <AttributePanels>
                  <AttributePanel>
                    <p>Panel one content!</p>
                  </AttributePanel>
                  <AttributePanel>
                    <p>Panel two content!</p>
                  </AttributePanel>
                  <AttributePanel>
                    <p>Panel three content!</p>
                  </AttributePanel>
                </AttributePanels>
              </AttributeNavigation>
              <div className="ml-2 flex items-center gap-4">
                <span className="text-xl text-white">Type:</span>
                <span className="flex gap-2">
                  {pokemonData.typeIcons?.map((icon) => (
                    <Image
                      className="m-8 p-8 drop-shadow-sm"
                      key={icon}
                      src={icon}
                      alt={icon}
                      width={40}
                      height={40}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2">
            <Image
              src={pokemonData?.image}
              className="h-full w-auto max-w-none object-contain"
              alt={pokemonData.name}
              width={1000}
              height={1000}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonPanel
