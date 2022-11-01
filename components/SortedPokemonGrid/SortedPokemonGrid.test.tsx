import { mockSortedGridProps } from '@pokedex/api-utils/mocks'
import { render, screen, fireEvent } from '@testing-library/react'
import SortedPokemonGrid from './SortedPokemonGrid'

describe('<SortedPokemonGrid />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockHandleSetActivePokemon = jest.fn()

  it('displays pokemon if not loading', async () => {
    render(
      <SortedPokemonGrid
        handleSetActivePokemon={mockHandleSetActivePokemon}
        {...mockSortedGridProps}
      />
    )
    expect(screen.getByRole('heading', { name: 'dewgong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#91' })).toBeInTheDocument()
  })

  it('displays skeleton loaders if no pokemon', async () => {
    render(
      <SortedPokemonGrid
        handleSetActivePokemon={mockHandleSetActivePokemon}
        {...mockSortedGridProps}
        data={undefined}
        isLoading={true}
      />
    )
    expect(
      await screen.queryByRole('heading', { name: 'dewgong' })
    ).not.toBeInTheDocument()
    expect(
      await screen.queryByRole('heading', { name: '#91' })
    ).not.toBeInTheDocument()
  })

  it('allows user to set active pokemon from grid', async () => {
    render(
      <SortedPokemonGrid
        handleSetActivePokemon={mockHandleSetActivePokemon}
        {...mockSortedGridProps}
      />
    )
    expect(screen.getByRole('heading', { name: 'dewgong' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '#91' })).toBeInTheDocument()
    fireEvent.click(screen.getByAltText('dewgong'))
    expect(mockHandleSetActivePokemon).toHaveBeenCalled()
  })
})
