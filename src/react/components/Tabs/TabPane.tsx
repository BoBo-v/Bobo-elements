import { memo } from 'react'
import type { TabPaneProps } from '../../../core/components/tabs/types'
import { useTabsContext } from './Tabs'

export const TabPane = memo(function TabPane({
  name,
  children,
}: TabPaneProps) {
  const { activeName } = useTabsContext()

  if (activeName !== name) return null

  return (
    <div className="vk-tabs__pane is-active">
      {children}
    </div>
  )
})
