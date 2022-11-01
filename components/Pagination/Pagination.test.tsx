import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('<Pagination />', () => {
  it('renders the component from the beginning', () => {
    const mockProps = {
      page: 1,
      totalPages: 5,
      handlePagination: jest.fn(),
    }
    render(<Pagination {...mockProps} />)

    fireEvent.click(screen.getByText(1))
    expect(mockProps.handlePagination).toBeCalledWith(1)

    fireEvent.click(screen.getByText(2))
    expect(mockProps.handlePagination).toBeCalledWith(2)

    fireEvent.click(screen.getByText(3))
    expect(mockProps.handlePagination).toBeCalledWith(3)

    fireEvent.click(screen.getByText(5))
    expect(mockProps.handlePagination).toBeCalledWith(5)
  })

  it('renders the component from the end', () => {
    const mockProps = {
      page: 5,
      totalPages: 5,
      handlePagination: jest.fn(),
    }
    render(<Pagination {...mockProps} />)

    fireEvent.click(screen.getByText(4))
    expect(mockProps.handlePagination).toBeCalledWith(4)

    fireEvent.click(screen.getByText(1))
    expect(mockProps.handlePagination).toBeCalledWith(1)

    fireEvent.click(screen.getByText(3))
    expect(mockProps.handlePagination).toBeCalledWith(3)

    fireEvent.click(screen.getByText(4))
    expect(mockProps.handlePagination).toBeCalledWith(4)

    fireEvent.click(screen.getByText(5))
    expect(mockProps.handlePagination).toBeCalledWith(5)
  })

  it('renders the component from the middle', () => {
    const mockProps = {
      page: 3,
      totalPages: 5,
      handlePagination: jest.fn(),
    }
    render(<Pagination {...mockProps} />)

    fireEvent.click(screen.getByText(2))
    expect(mockProps.handlePagination).toBeCalledWith(2)

    fireEvent.click(screen.getByText(1))
    expect(mockProps.handlePagination).toBeCalledWith(1)

    fireEvent.click(screen.getByText(2))
    expect(mockProps.handlePagination).toBeCalledWith(2)

    fireEvent.click(screen.getByText(3))
    expect(mockProps.handlePagination).toBeCalledWith(3)

    fireEvent.click(screen.getByText(4))
    expect(mockProps.handlePagination).toBeCalledWith(4)

    fireEvent.click(screen.getByText(5))
    expect(mockProps.handlePagination).toBeCalledWith(5)

    fireEvent.click(screen.getByText(4))
    expect(mockProps.handlePagination).toBeCalledWith(4)
  })
})
