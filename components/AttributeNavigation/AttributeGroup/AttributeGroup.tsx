/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactElement } from 'react'
import { useTabsContext } from '../AttributeNavigationContext'
import { AttributeNavigationPropType } from '../AttributeNavigation.types'

export const AttributeGroup = ({
  children,
}: Omit<AttributeNavigationPropType, 'id'>) => {
  const { onChange, navColor } = useTabsContext()

  // clone children and add onclick method from context to track tab index on click.
  const tabList = React.Children.map(children, (child, index) => {
    // child element needs to have a reference of it's index within parent
    // the tabIndex is used to determine which matching panel index to display.
    return React.cloneElement(child as ReactElement, {
      tabIndex: index,
      onClick: () => onChange(index),
    })
  })

  return (
    <div
      className={`flex justify-between ${navColor} w-full rounded-sm bg-opacity-25`}
    >
      {tabList}
    </div>
  )
}
