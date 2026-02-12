import React, { useRef } from 'react'
import type { DropdownProps } from '../../core/components/dropdown.types'
import { useDropdownLogic } from '../../core/components/dropdown.logic'
import Tooltip from '../Tooltip'
import '../../core/styles/dropdown.css'

const Dropdown: React.FC<DropdownProps> = (props) => {
    const { tooltipRef, visibleChange, itemClick } = useDropdownLogic(props)

    return (
        <div className="vk-dropdown">
            <Tooltip
                trigger={props.trigger}
                placement={props.placement}
                openDelay={props.openDelay}
                closeDelay={props.closeDelay}
                manual={props.manual}
                ref={tooltipRef}
                onVisibleChange={visibleChange}
            >
                {props.children}
                <ul className="vk-dropdown__menu">
                    {props.menuOptions.map(item => (
                        <React.Fragment key={item.key}>
                            {item.divided && <li role="separator" className="divided-placeholder" />}
                            <li
                                id={`dropdown-item-${item.key}`}
                                className={`vk-dropdown__item ${item.disabled ? 'is-disabled' : ''} ${item.divided ? 'is-divided' : ''}`}
                                onClick={() => itemClick(item)}
                            >
                                {item.label}
                            </li>
                        </React.Fragment>
                    ))}
                </ul>
            </Tooltip>
        </div>
    )
}

export default Dropdown
