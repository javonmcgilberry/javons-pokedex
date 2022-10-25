/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { useTabsContext } from '../AttributeNavigationContext'
import { IAttributeNavigationProps } from '../AttributeNavigation.types'

export const NavOption = ({
  children,
  onClick,
  tabIndex,
}: IAttributeNavigationProps) => {
  const { activeButton, navColor, id } = useTabsContext()
  const isActive = activeButton === tabIndex
  return (
    <button
      onClick={onClick}
      className={`${navColor} ${
        !isActive && 'bg-opacity-25'
      } w-full rounded-sm py-2 font-medium uppercase text-white`}
    >
      {children}
    </button>
  )
}
