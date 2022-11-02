import React from 'react'

export interface Props {
  page: number
  totalPages: number
  handlePagination: (page: number) => void
}

export const PaginationComponent: React.FC<Props> = ({
  page,
  totalPages,
  handlePagination,
}) => {
  return (
    <div>
      <div className="flex justify-center py-8 text-xl">
        {page !== 1 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            style={{
              boxShadow: `transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px`,
            }}
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            &lt;
          </button>
        )}

        <button
          {...(page === 1 && {
            style: {
              textDecoration: `none`,
              boxShadow: `transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 6px 16px`,
            },
          })}
          onClick={() => handlePagination(1)}
          type="button"
          className={`mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white ${
            page === 1 && ` bg-blue-500`
          }`}
        >
          {1}
        </button>

        {page > 3 && <div className="mx-[0.25rem] w-4">...</div>}

        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            {page - 2}
          </button>
        )}

        {page > 2 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            {page - 1}
          </button>
        )}

        {page !== 1 && page !== totalPages && (
          <button
            style={{
              boxShadow: `transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px`,
            }}
            onClick={() => handlePagination(page)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-blue-500 bg-transparent font-semibold text-white"
          >
            {page}
          </button>
        )}

        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            {page + 1}
          </button>
        )}

        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            {page + 2}
          </button>
        )}

        {page < totalPages - 2 && <div className="mx-[0.25rem] w-4">...</div>}

        <button
          {...(page === totalPages && {
            style: {
              boxShadow: `transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px`,
            },
          })}
          onClick={() => handlePagination(totalPages)}
          type="button"
          className={`mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white ${
            page === totalPages && `bg-blue-500`
          } `}
        >
          {totalPages}
        </button>

        {page !== totalPages && (
          <button
            style={{
              textDecoration: `none`,
              boxShadow: `transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 6px 16px`,
            }}
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="mx-[0.25rem] h-12 w-12 rounded-full border-none bg-transparent font-semibold text-white"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  )
}

export const Pagination = PaginationComponent
