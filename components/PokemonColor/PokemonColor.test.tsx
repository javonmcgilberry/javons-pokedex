import { render, screen, fireEvent } from '@testing-library/react'
import PokemonColor from './PokemonColor'

describe('<PokemonColor />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockHandleActive = jest.fn()
  const mockProps = {
    type: 'blue',
    activeType: 'red',
    handleActivePokemonFilter: (type: string) => mockHandleActive(type),
  }
  it('sets pokemon color', async () => {
    render(<PokemonColor {...mockProps} />)
    fireEvent.click(screen.getByRole('button', { name: '' }))
    expect(mockHandleActive).toHaveBeenCalledWith('blue')
  })

  it('sets pokemon color resulting in active', async () => {
    render(<PokemonColor {...mockProps} type="red" />)
    fireEvent.click(screen.getByRole('button', { name: '' }))
    expect(mockHandleActive).toHaveBeenCalledWith('red')
  })
})
