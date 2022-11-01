import { fireEvent, render, screen } from '@testing-library/react'
import { AttributePanels } from './AttributePanels/AttributePanels'
import { AttributePanel } from './AttributePanel/AttributePanel'
import { AttributeOption } from './AttributeOption/AttributeOption'
import { AttributeNavigation } from './AttributeNavigation'
import { AttributeGroup } from './AttributeGroup/AttributeGroup'

describe('Secondary Navigation Components', () => {
  describe('Secondary Navigation', () => {
    it('should render the Secondary Navigation Component information', async () => {
      render(
        <AttributeNavigation id="test-1">
          <AttributeGroup>
            <AttributeOption>One</AttributeOption>
            <AttributeOption>Two</AttributeOption>
            <AttributeOption>Three</AttributeOption>
          </AttributeGroup>
          <AttributePanels>
            <AttributePanel>
              <p>Panel one content!</p>
            </AttributePanel>
            <AttributePanel>
              <p>Panel two content!</p>
            </AttributePanel>
            <AttributePanel>
              <p>Panel three content!</p>
            </AttributePanel>
          </AttributePanels>
        </AttributeNavigation>
      )
      const AttributePanelOneContet = screen.getByText('Panel one content!')
      expect(AttributePanelOneContet).toBeInTheDocument()
      const PanelTwoButton = screen.getByText('Two')
      await fireEvent.click(PanelTwoButton)
      expect(AttributePanelOneContet).not.toBeInTheDocument()
      const AttributePanelTwoContent = screen.getByText('Panel two content!')
      expect(AttributePanelTwoContent).toBeInTheDocument()
      const PanelThreeButton = screen.getByText('Three')
      await fireEvent.click(PanelThreeButton)
      expect(AttributePanelTwoContent).not.toBeInTheDocument()
      const AttributePanelThreeContent = screen.getByText(
        'Panel three content!'
      )
      expect(AttributePanelThreeContent).toBeInTheDocument()
    })
  })
})
