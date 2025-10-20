import type { ButtonProps } from './button.types';

export function useButtonLogic(props: ButtonProps) {
    const isDisabled = !!props.disabled || !!props.loading;

    let iconName: string | undefined;
    if (props.loading) {
        iconName = 'spinner';
    } else if (props.icon) {
        iconName = props.icon;
    }

    const classes: string[] = ['vk-button'];
    if (props.type) classes.push(`vk-button--${props.type}`);
    if (props.size) classes.push(`vk-button--${props.size}`);
    if (props.plain) classes.push('is-plain');
    if (props.round) classes.push('is-round');
    if (props.circle) classes.push('is-circle');
    if (props.loading) classes.push('is-loading');

    return { isDisabled, iconName, classes: classes.join(' ') };
}
