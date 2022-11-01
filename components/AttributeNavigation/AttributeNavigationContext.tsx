// TabsContext.tsx
import React from 'react'
import { IAttributeNavigation } from './AttributeNavigation.types'
export const AttributeNavigationContext =
  React.createContext<IAttributeNavigation | null>(null)
export function useTabsContext() {
  const context = React.useContext(AttributeNavigationContext) as {
    activeButton: number
    onChange: (tab: number) => void
    navColor: string
    id: string
  }

  return context
}
