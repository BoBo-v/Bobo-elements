import type { ButtonProps } from './button.react.types';
import { useMemo } from 'react';
import clsx from 'clsx';

export function useButtonLogic(props: ButtonProps) {
    const isDisabled = !!props.disabled || !!props.loading;

    const iconName = useMemo(() => {
        if (props.loading) return 'spinner';
        if (props.icon) return props.icon;
        return undefined;
    }, [props.loading, props.icon]);

    const classes = useMemo(() => {
        return clsx(
            'vk-button',
            props.type && `vk-button--${props.type}`,
            props.size && `vk-button--${props.size}`,
            props.plain && 'is-plain',
            props.round && 'is-round',
            props.circle && 'is-circle',
            props.loading && 'is-loading'
        );
    }, [props.type, props.size, props.plain, props.round, props.circle, props.loading]);

    return { isDisabled, iconName, classes };
}
