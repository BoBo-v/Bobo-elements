import type { ReactNode } from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
    type?: AlertType;
    effect?: 'light' | 'dark';
    closable?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

export interface AlertRef {
    hide?: () => void;
}
