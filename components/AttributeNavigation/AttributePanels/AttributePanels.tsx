/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { IAttributeNavigationProps } from '../AttributeNavigation.types'
import { useTabsContext } from '../AttributeNavigationContext'

export const AttributePanels = ({ children }: IAttributeNavigationProps) => {
  const { activeButton, id } = useTabsContext()
  const panels = React.Children.map(children, (child, index) => {
    if (activeButton !== index) {
      return null
    }
    // @ts-ignore
    return React.cloneElement(child, {
      tabIndex: index,
      id,
    })
  })
  return <div>{panels}</div>
}
