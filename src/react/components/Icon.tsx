import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

type IconProps = {
    name: 'xmark' | 'spinner';
    spin?: boolean;
    'data-testid'?: string;
};

const iconMap = {
    xmark: faXmark,
    spinner: faSpinner,
};

export default function Icon({ name, spin, 'data-testid': testId }: IconProps) {
    return <FontAwesomeIcon icon={iconMap[name]} spin={spin} data-testid={testId} />;
}
