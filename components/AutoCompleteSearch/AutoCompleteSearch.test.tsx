import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, fireEvent } from '@testing-library/react'

import AutoCompleteSearch from './AutoCompleteSearch'

const queryClient = new QueryClient()

const mockHandleChange = jest.fn()
const mockHandleClick = jest.fn()
jest.mock('../../hooks/useAutoCompleteSearch.ts', () => {
  const originalModule = jest.requireActual(
    '../../hooks/useAutoCompleteSearch.ts'
  )
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      isLoading: false,
      value: '',
      suggestionsActive: true,
      handleChange: mockHandleChange,
      suggestions: [{ name: 'bulbasaur', id: '1' }],
      handleClick: mockHandleClick,
    }),
  }
})

describe('<AutoCompleteSearch />', () => {
  it('renders the component from the beginning', async () => {
    const mockSetActivePokemon = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <AutoCompleteSearch handleSetActivePokemon={mockSetActivePokemon} />
      </QueryClientProvider>
    )

    fireEvent.change(await screen.findByRole('textbox'), {
      target: { value: 'bulbasaur' },
    })
    // it should debounce..
    expect(mockHandleChange).toHaveBeenCalledTimes(1)
    expect(await screen.findByText('bulbasaur')).toBeInTheDocument()
    fireEvent.click(await screen.findByText('bulbasaur'))
    expect(mockHandleClick).toHaveBeenCalled()
  })
})
