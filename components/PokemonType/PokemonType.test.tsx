import { render, screen, fireEvent } from '@testing-library/react'
import PokemonType from './PokemonType'

describe('<PokemonType />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockHandleActive = jest.fn()
  const mockProps = {
    type: 'normal',
    activeType: 'fire',
    handleActivePokemonFilter: (type: string) => mockHandleActive(type),
  }
  it('sets pokemon type', async () => {
    render(<PokemonType {...mockProps} />)
    fireEvent.click(screen.getByRole('img', { name: 'normal' }))
    expect(mockHandleActive).toHaveBeenCalledWith('normal')
  })

  it('sets pokemon type resulting in active', async () => {
    render(<PokemonType {...mockProps} type="fire" />)
    fireEvent.click(screen.getByRole('img', { name: 'fire' }))
    expect(mockHandleActive).toHaveBeenCalledWith('fire')
  })
})
