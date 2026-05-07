import { createContext, useContext, Children, isValidElement } from 'react'
import type { TabsProps, TabsContext, TabPaneProps } from '../../../core/components/tabs/types'
import '../../../components/Tabs/style.css'

const TabsContextReact = createContext<TabsContext | null>(null)

export const useTabsContext = () => {
  const ctx = useContext(TabsContextReact)
  if (!ctx) throw new Error('TabPane must be used inside Tabs')
  return ctx
}

export function Tabs({
  modelValue,
  type = 'line',
  children,
  onChange,
}: TabsProps) {
  const handleTabClick = (name: string | number) => {
    onChange?.(name)
  }

  const panes: { name: string | number; label: string; disabled?: boolean }[] = []
  Children.forEach(children, (child) => {
    if (isValidElement<TabPaneProps>(child) && child.props.name !== undefined) {
      panes.push({
        name: child.props.name,
        label: child.props.label,
        disabled: child.props.disabled,
      })
    }
  })

  return (
    <TabsContextReact.Provider value={{ activeName: modelValue, handleTabClick }}>
      <div className={`vk-tabs ${type === 'card' ? 'vk-tabs--card' : ''}`}>
        <div className="vk-tabs__header">
          {panes.map((pane) => (
            <div
              key={String(pane.name)}
              className={`vk-tabs__item ${modelValue === pane.name ? 'is-active' : ''} ${pane.disabled ? 'is-disabled' : ''}`}
              onClick={() => !pane.disabled && handleTabClick(pane.name)}
            >
              {pane.label}
            </div>
          ))}
        </div>
        <div className="vk-tabs__content">{children}</div>
      </div>
    </TabsContextReact.Provider>
  )
}
