import { IAttributeNavigationProps } from '../AttributeNavigation.types'

export const AttributePanel = ({
  children,
  tabIndex,
  id,
}: IAttributeNavigationProps) => {
  return (
    <div
      id={`secondary-navigation-tabpanel-${id}-${tabIndex}`}
      className="overflow-scroll"
    >
      {children}
    </div>
  )
}
