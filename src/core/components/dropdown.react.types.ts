import type { ReactNode } from 'react';
import type { TooltipProps } from './Tooltip/tooltip.types';

export interface MenuOption {
    label: string | ReactNode;
    key: string | number;
    disabled?: boolean;
    divided?: boolean;
}

export interface DropdownProps extends TooltipProps {
    menuOptions: MenuOption[];
    hideAfterClick?: boolean;
    onSelect?: (item: MenuOption) => void;
}

export interface DropdownInstance {
    show: () => void;
    hide: () => void;
}
