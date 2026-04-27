import { memo } from 'react'
import { useCollapseContext } from './Collapse'
import type { CollapseItemProps } from '../../../core/components/collapse/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

export const CollapseItem = memo(function CollapseItem({
    name,
    title,
    disabled,
    children,
}: CollapseItemProps) {
    const { activeNames, handleItemClick } = useCollapseContext()
    const isActive = activeNames.includes(name)

    const onClick = () => {
        if (!disabled) handleItemClick(name)
    }

    return (
        <div className={`vk-collapse-item ${disabled ? 'is-disabled' : ''}`}>
            <div
                className={`vk-collapse-item__header ${isActive ? 'is-active' : ''}`}
                onClick={onClick}
            >
                <span>{title}</span>
                <FontAwesomeIcon
                    icon={faAngleRight}
                    className={`header-angle ${isActive ? 'rotate-90' : ''}`}
                />
            </div>

            {isActive && (
                <div className="vk-collapse-item__wrapper">
                    <div className="vk-collapse-item__content">{children}</div>
                </div>
            )}
        </div>
    )
})
