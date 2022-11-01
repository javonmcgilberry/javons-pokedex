import { render } from '@testing-library/react'
import Header from './Header'

describe('<Header />', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  const mockRender = jest.fn()
  const mockProps = {
    render: mockRender,
  }
  it('renders a searchbar inside the heaader', async () => {
    render(<Header {...mockProps} />)
    expect(mockRender).toHaveBeenCalled()
  })
})
