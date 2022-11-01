import { render, screen, fireEvent } from '@testing-library/react'
import AllPokemonView from './AllPokemonView'

describe('<AllPokemonView />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockHandlePages = jest.fn()
  const mockHandleSetActivePokemon = jest.fn()
  const mockProps = {
    isAllPokemonDataLoading: false,
    allPokemonData: {
      allPokemonSpecies: [
        {
          id: '1',
          name: 'bulbasaur',
          weight: 69,
          height: 7,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
            {
              type: {
                name: 'poison',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
              },
            },
          },
          base_experience: 64,
        },
        {
          id: '2',
          name: 'ivysaur',
          weight: 130,
          height: 10,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
            {
              type: {
                name: 'poison',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
              },
            },
          },
          base_experience: 142,
        },
        {
          id: '3',
          name: 'venusaur',
          weight: 1000,
          height: 20,
          types: [
            {
              type: {
                name: 'grass',
              },
            },
            {
              type: {
                name: 'poison',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
              },
            },
          },
          base_experience: 263,
        },
        {
          id: '4',
          name: 'charmander',
          weight: 85,
          height: 6,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
              },
            },
          },
          base_experience: 62,
        },
        {
          id: '5',
          name: 'charmeleon',
          weight: 190,
          height: 11,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
              },
            },
          },
          base_experience: 142,
        },
        {
          id: '6',
          name: 'charizard',
          weight: 905,
          height: 17,
          types: [
            {
              type: {
                name: 'fire',
              },
            },
            {
              type: {
                name: 'flying',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
              },
            },
          },
          base_experience: 267,
        },
        {
          id: '7',
          name: 'squirtle',
          weight: 90,
          height: 5,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
              },
            },
          },
          base_experience: 63,
        },
        {
          id: '8',
          name: 'wartortle',
          weight: 225,
          height: 10,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
              },
            },
          },
          base_experience: 142,
        },
        {
          id: '9',
          name: 'blastoise',
          weight: 855,
          height: 16,
          types: [
            {
              type: {
                name: 'water',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
              },
            },
          },
          base_experience: 265,
        },
      ],
    },
    page: 1,
    totalPages: 101,
    handlePages: mockHandlePages,
    handleSetActivePokemon: mockHandleSetActivePokemon,
  }
  it('displays pokemon if not loading', async () => {
    render(<AllPokemonView {...mockProps} />)
    expect(
      screen.getByRole('heading', { name: 'blastoise' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#9' })).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('blastoise'))
  })

  it('displays skeleton loaders if no pokemon', async () => {
    render(
      <AllPokemonView
        {...mockProps}
        allPokemonData={undefined}
        isAllPokemonDataLoading={true}
      />
    )
    expect(
      await screen.queryByRole('heading', { name: 'blastoise' })
    ).not.toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#9' })
    ).not.toBeInTheDocument()
  })
})
