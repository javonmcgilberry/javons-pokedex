import React, { useCallback, useMemo, useState } from 'react'
import { AttributeNavigationPropType } from './AttributeNavigation.types'
import { AttributeNavigationContext } from './AttributeNavigationContext'

export const AttributeNavigation = ({
  id,
  children,
  navColor,
}: AttributeNavigationPropType) => {
  const [activeButton, setActiveButton] = useState<number>(0)
  // memo-ize cb fn to ensure active tab state is preserved in children.
  const onChange = useCallback((tabKey: number) => setActiveButton(tabKey), [])
  // memo-ize context values to reduce needless re-renders.
  const value = useMemo(
    () => ({ activeButton, onChange, navColor, id }),
    [activeButton, onChange, navColor, id]
  )

  return (
    <AttributeNavigationContext.Provider value={value}>
      {children}
    </AttributeNavigationContext.Provider>
  )
}
