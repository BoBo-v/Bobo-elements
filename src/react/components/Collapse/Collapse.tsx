import React, { createContext, useContext } from 'react'
import type { CollapseProps, CollapseContext } from '../../../core/components/collapse/types'
import { useCollapse } from '../../../core/components/collapse/useCollapse'

const CollapseContextReact = createContext<CollapseContext | null>(null)

export const useCollapseContext = () => {
    const ctx = useContext(CollapseContextReact)
    if (!ctx) throw new Error('CollapseItem must be used inside Collapse')
    return ctx
}

export const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({
                                                                               modelValue = [],
                                                                               accordion,
                                                                               onChange,
                                                                               children
                                                                           }) => {
    const { activeNames, handleItemClick } = useCollapse({ modelValue, accordion, onChange })

    return (
        <CollapseContextReact.Provider value={{ activeNames, handleItemClick }}>
            <div className="vk-collapse">{children}</div>
        </CollapseContextReact.Provider>
    )
}
