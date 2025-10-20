import type { ReactNode } from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
    type?: AlertType;
    closable?: boolean;
    children?: ReactNode;
    onClose?: () => void;
}

export interface AlertRef {
    hide?: () => void;
}
