import type { ReactNode } from 'react';
import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: Placement;
    manual?: boolean;
    popperOptions?: Partial<Options>;
    transition?: string;
    openDelay?: number;
    closeDelay?: number;
    children?: ReactNode;
    onVisibleChange?: (visible: boolean) => void;
    onClickOutside?: (value: boolean) => void;
}

export interface TooltipInstance {
    show: () => void;
    hide: () => void;
}
