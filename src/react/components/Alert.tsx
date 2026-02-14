import { forwardRef, useImperativeHandle, useState } from 'react';
import type { ReactElement } from 'react';
import type { AlertProps, AlertRef } from '../../core/components/alert.react.types';
import Icon from './Icon';

const Alert = forwardRef<AlertRef, AlertProps>(
    (
        { type = 'info', closable = false, children, onClose }: AlertProps,
        ref
    ): ReactElement | null => {
        const [visible, setVisible] = useState(true);

        const hide = () => {
            setVisible(false);
            onClose?.();
        };

        useImperativeHandle(ref, () => ({ hide }));

        if (!visible) return null;

        return (
            <div className={`vk-alert vk-alert--${type}`} role="alert" data-testid="alert">
                <div className="vk-alert__content" data-testid="alert-content">
                    {children}
                </div>
                {closable && (
                    <button
                        className="vk-alert__close"
                        onClick={hide}
                        aria-label="close"
                        data-testid="alert-close-btn"
                    >
                        <Icon name="xmark" data-testid="alert-close-icon" />
                    </button>
                )}
            </div>
        );
    }
);

export default Alert;
export type { AlertRef };
