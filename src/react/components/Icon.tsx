import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

beforeAll(() => {
    library.add(faXmark, faSpinner)
})

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
