import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faSpinner,
  faCircleXmark,
  faEye,
  faEyeSlash,
  faAngleDown,
  faCircleCheck,
  faCircleInfo,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { MouseEvent } from 'react';

const iconMap: Record<string, IconDefinition> = {
  xmark: faXmark,
  spinner: faSpinner,
  'circle-xmark': faCircleXmark,
  eye: faEye,
  'eye-slash': faEyeSlash,
  'angle-down': faAngleDown,
  'circle-check': faCircleCheck,
  'circle-info': faCircleInfo,
  'circle-exclamation': faCircleExclamation,
};

type IconProps = {
  name: string;
  spin?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  'data-testid'?: string;
};

export default function Icon({ name, spin, className, onClick, onMouseDown, 'data-testid': testId }: IconProps) {
  const icon = iconMap[name];
  if (!icon) return null;
  return (
    <FontAwesomeIcon
      icon={icon}
      spin={spin}
      className={className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      data-testid={testId}
    />
  );
}
