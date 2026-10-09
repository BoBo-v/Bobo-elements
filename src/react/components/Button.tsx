import { memo } from 'react';
import type { ButtonProps } from '../../core/components/button.react.types';
import { useButtonLogic } from '../../core/components/button.react.logic';
import Icon from './Icon';

const Button = memo(function Button(props: ButtonProps) {
    const {
        children,
        onClick,
        icon,
        loading = false,
    } = props;
    const { isDisabled, classes } = useButtonLogic(props);

    return (
        <button
            className={classes}
            disabled={isDisabled}
            onClick={onClick}
            data-testid="button"
        >
            {loading && <Icon name="spinner" spin data-testid="button-loading-icon" />}
            {!loading && icon && <span className="vk-button__icon">{icon}</span>}
            <span data-testid="button-text">{children}</span>
        </button>
    );
});

export default Button;
