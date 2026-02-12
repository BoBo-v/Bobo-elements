import React from 'react';
import type { ButtonProps } from '../../core/components/button.react.types';
import Icon from './Icon';

export default function Button({
                                   children,
                                   onClick,
                                   disabled,
                                   type = 'primary',
                                   icon,
                                   loading = false,
                               }: ButtonProps) {
    return (
        // <button
        //     className={`vk-button vk-button--${type} ${loading ? 'is-loading' : ''}`}
        //     disabled={disabled || loading}
        //     onClick={onClick}
        //     data-testid="button"
        // >
        //     {loading && <Icon name="spinner" spin data-testid="button-loading-icon" />}
        //     {!loading && icon && <span data-testid="button-icon">{icon}</span>}
        //     <span data-testid="button-text">{children}</span>
        // </button>
        <button
            className={`vk-button vk-button--${type} ${loading ? 'is-loading' : ''}`}
            disabled={disabled || loading}
            onClick={onClick}
            data-testid="button"
        >
            {loading && <Icon name="spinner" spin data-testid="button-loading-icon" />}
            {!loading && icon && <span className="vk-button__icon">{icon}</span>}
            <span data-testid="button-text">{children}</span>
        </button>
    );
}
