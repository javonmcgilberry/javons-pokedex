import { render, screen, fireEvent } from '@testing-library/react'
import SortedPokemonGrid from './SortedPokemonGrid'

describe('<SortedPokemonGrid />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockHandleSetActivePokemon = jest.fn()
  const mockProps = {
    handleSetActivePokemon: mockHandleSetActivePokemon,
    data: [
      {
        pokemon: {
          id: '87',
          name: 'dewgong',
          types: [
            {
              type: {
                name: 'water',
                url: 'https://pokeapi.co/api/v2/type/11/',
              },
            },
            {
              type: {
                name: 'ice',
                url: 'https://pokeapi.co/api/v2/type/15/',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png',
              },
            },
          },
        },
      },
      {
        pokemon: {
          id: '91',
          name: 'cloyster',
          types: [
            {
              type: {
                name: 'water',
                url: 'https://pokeapi.co/api/v2/type/11/',
              },
            },
            {
              type: {
                name: 'ice',
                url: 'https://pokeapi.co/api/v2/type/15/',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png',
              },
            },
          },
        },
      },
      {
        pokemon: {
          id: '124',
          name: 'jynx',
          types: [
            {
              type: {
                name: 'ice',
                url: 'https://pokeapi.co/api/v2/type/15/',
              },
            },
            {
              type: {
                name: 'psychic',
                url: 'https://pokeapi.co/api/v2/type/14/',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png',
              },
            },
          },
        },
      },
      {
        pokemon: {
          id: '131',
          name: 'lapras',
          types: [
            {
              type: {
                name: 'water',
                url: 'https://pokeapi.co/api/v2/type/11/',
              },
            },
            {
              type: {
                name: 'ice',
                url: 'https://pokeapi.co/api/v2/type/15/',
              },
            },
          ],
          sprites: {
            other: {
              official_artwork: {
                front_default:
                  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
              },
            },
          },
        },
      },
    ],
    isLoading: false,
  }
  it('displays pokemon if not loading', async () => {
    render(<SortedPokemonGrid {...mockProps} />)
    expect(screen.getByRole('heading', { name: 'dewgong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#91' })).toBeInTheDocument()
  })

  it('displays skeleton loaders if no pokemon', async () => {
    render(
      <SortedPokemonGrid {...mockProps} data={undefined} isLoading={true} />
    )
    expect(
      await screen.queryByRole('heading', { name: 'dewgong' })
    ).not.toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#91' })
    ).not.toBeInTheDocument()
  })

  it('allows user to set active pokemon from grid', async () => {
    render(<SortedPokemonGrid {...mockProps} />)
    expect(screen.getByRole('heading', { name: 'dewgong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#91' })).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('dewgong'))
    expect(mockHandleSetActivePokemon).toHaveBeenCalled()
  })
})
