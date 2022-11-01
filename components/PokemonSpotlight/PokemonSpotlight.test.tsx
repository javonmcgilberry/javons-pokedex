import { mockSpotlightProps } from '@pokedex/api-utils/mocks'
import { render, screen, fireEvent } from '@testing-library/react'
import PokemonSpotlight from './PokemonSpotlight'

describe('<PokemonSpotlight />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockWindowScroll = jest.fn()
  window.scrollTo = mockWindowScroll
  const mockPrev = jest.fn()
  const mockNext = jest.fn()
  const mockHandleSetActivePokemon = jest.fn()

  it('displays pokemon details if not loading', async () => {
    render(
      <PokemonSpotlight
        {...mockSpotlightProps}
        handleSetActivePokemon={mockHandleSetActivePokemon}
        handlePagination={{ next: mockNext, prev: mockPrev }}
        isLoading={false}
      />
    )
    expect(
      await screen.queryByRole('heading', { name: 'bulbasaur' })
    ).toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#1' })
    ).toBeInTheDocument()
  })

  it('does not display pokemon details if loading', async () => {
    render(
      <PokemonSpotlight
        {...mockSpotlightProps}
        handleSetActivePokemon={mockHandleSetActivePokemon}
        handlePagination={{ next: mockNext, prev: mockPrev }}
        isLoading={true}
      />
    )
    expect(
      await screen.queryByRole('heading', { name: 'bulbasaur' })
    ).not.toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#1' })
    ).not.toBeInTheDocument()
  })

  it('allows user to click on pokemon in evolution chain', async () => {
    render(
      <PokemonSpotlight
        handleSetActivePokemon={mockHandleSetActivePokemon}
        handlePagination={{ next: mockNext, prev: mockPrev }}
        {...mockSpotlightProps}
      />
    )
    expect(await screen.queryByAltText('bulbasaur')).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('bulbasaur'))
    expect(screen.getByRole('heading', { name: '#1' })).toBeInTheDocument()
  })
  it('allows user to click to view next pokemon', async () => {
    render(
      <PokemonSpotlight
        {...mockSpotlightProps}
        handleSetActivePokemon={mockHandleSetActivePokemon}
        handlePagination={{ next: mockNext, prev: mockPrev }}
      />
    )
    expect(screen.getByRole('img', { name: 'right-arrow' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('img', { name: 'right-arrow' }))
    expect(mockNext).toHaveBeenCalled()
  })
  it('allows user to click to view previous pokemon', async () => {
    render(
      <PokemonSpotlight
        {...mockSpotlightProps}
        handleSetActivePokemon={mockHandleSetActivePokemon}
        handlePagination={{ next: mockNext, prev: mockPrev }}
      />
    )
    expect(screen.getByRole('img', { name: 'left-arrow' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('img', { name: 'left-arrow' }))
    expect(mockPrev).toHaveBeenCalled()
  })
})
