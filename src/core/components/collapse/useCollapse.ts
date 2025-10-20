import { useState, useCallback } from 'react'

export type NameType = string | number

export interface UseCollapseOptions {
    modelValue?: NameType[]
    accordion?: boolean
    onChange?: (names: NameType[]) => void
}

export function useCollapse({
                                modelValue = [],
                                accordion = false,
                                onChange
                            }: UseCollapseOptions) {
    const [activeNames, setActiveNames] = useState<NameType[]>(modelValue)

    const handleItemClick = useCallback(
        (name: NameType) => {
            let _activeNames = [...activeNames]

            if (accordion) {
                _activeNames =
                    _activeNames[0] === name ? [] : [name]
            } else {
                const index = _activeNames.indexOf(name)
                if (index > -1) {
                    _activeNames.splice(index, 1)
                } else {
                    _activeNames.push(name)
                }
            }

            setActiveNames(_activeNames)
            onChange?.(_activeNames)
        },
        [accordion, activeNames, onChange]
    )

    return { activeNames, handleItemClick }
}
