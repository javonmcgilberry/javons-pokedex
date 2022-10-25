export type AttributeNavigationPropType = {
  id: string
  children?: React.ReactNode
  navColor?: string
  additionalClassnames?: string
}

export type IAttributeNavigationProps = {
  children: React.ReactNode
  onClick?: () => void
  tabIndex?: number
  color?: string
  id?: string
}

export interface IAttributeNavigation {
  activeButton: number
  onChange: (key: number) => void
}
