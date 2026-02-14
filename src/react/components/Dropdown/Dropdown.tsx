import { useRef, Fragment } from 'react';
import type { DropdownProps, DropdownInstance, MenuOption } from '../../../core/components/dropdown.react.types';
import type { TooltipInstance } from '../../../core/components/Tooltip/tooltip.types';
import Tooltip from '../Tooltip/Tooltip';
import '../../../components/Dropdown/style.css';

const Dropdown = ({
    menuOptions,
    hideAfterClick = true,
    trigger,
    placement,
    openDelay,
    closeDelay,
    manual,
    onVisibleChange,
    onSelect,
    children,
}: DropdownProps) => {
    const tooltipRef = useRef<TooltipInstance>(null);

    const visibleChange = (visible: boolean) => {
        onVisibleChange?.(visible);
    };

    const itemClick = (item: MenuOption) => {
        if (item.disabled) return;
        onSelect?.(item);
        if (hideAfterClick) {
            tooltipRef.current?.hide();
        }
    };

    return (
        <div className="vk-dropdown">
            <Tooltip
                trigger={trigger}
                placement={placement}
                openDelay={openDelay}
                closeDelay={closeDelay}
                manual={manual}
                ref={tooltipRef}
                onVisibleChange={visibleChange}
                contentSlot={
                    <ul className="vk-dropdown__menu">
                        {menuOptions.map((item) => (
                            <Fragment key={item.key}>
                                {item.divided && (
                                    <li role="separator" className="divided-placeholder" />
                                )}
                                <li
                                    id={`dropdown-item-${item.key}`}
                                    className={[
                                        'vk-dropdown__item',
                                        item.disabled ? 'is-disabled' : '',
                                        item.divided ? 'is-divided' : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    onClick={() => itemClick(item)}
                                >
                                    {item.label}
                                </li>
                            </Fragment>
                        ))}
                    </ul>
                }
            >
                {children}
            </Tooltip>
        </div>
    );
};

export default Dropdown;
