import { render, screen, fireEvent } from '@testing-library/react'
import PokemonCard from './PokemonCard'

describe('<PokemonCard />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockWindowScroll = jest.fn()
  window.scrollTo = mockWindowScroll
  const mockFn = jest.fn()
  const mockProps = {
    pokemon: {
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
    handleSetActivePokemon: () => mockFn(),
  }
  it('renders the pokemon card details', async () => {
    render(<PokemonCard {...mockProps} />)
    expect(
      screen.getByRole('heading', { name: 'blastoise' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#9' })).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('blastoise'))
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('renders the pokemon card details with small text', async () => {
    render(<PokemonCard {...mockProps} smallText />)
    expect(
      screen.getByRole('heading', { name: 'blastoise' })
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#9' })).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('blastoise'))
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockWindowScroll).toHaveBeenCalledTimes(1)
  })
})
