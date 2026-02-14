import type { ReactNode, MouseEvent } from 'react';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
    type?: ButtonType;
    size?: ButtonSize;
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    disabled?: boolean;
    nativeType?: NativeType;
    autofocus?: boolean;
    icon?: ReactNode;
    loading?: boolean;
    children?: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonRef {
    ref?: HTMLButtonElement;
}
