import { memo } from 'react';
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
  faArrowUp,
  faRobot,
  faUser,
  faBrain,
  faClock,
  faRotateRight,
  faFileLines,
  faFilePdf,
  faFileCode,
  faImage,
  faBookOpen,
  faChevronDown,
  faPlus,
  faThumbtack,
  faPen,
  faTrash,
  faCheck,
  faCopy,
  faThumbsUp,
  faThumbsDown,
  faTriangleExclamation,
  faWandMagicSparkles,
  faCommentDots,
  faCode,
  faBolt,
  faVial,
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
  'arrow-up': faArrowUp,
  robot: faRobot,
  user: faUser,
  brain: faBrain,
  clock: faClock,
  'rotate-right': faRotateRight,
  'file-lines': faFileLines,
  'file-pdf': faFilePdf,
  'file-code': faFileCode,
  image: faImage,
  'book-open': faBookOpen,
  'chevron-down': faChevronDown,
  plus: faPlus,
  thumbtack: faThumbtack,
  pen: faPen,
  trash: faTrash,
  check: faCheck,
  copy: faCopy,
  'thumbs-up': faThumbsUp,
  'thumbs-down': faThumbsDown,
  'triangle-exclamation': faTriangleExclamation,
  'wand-magic-sparkles': faWandMagicSparkles,
  'comment-dots': faCommentDots,
  code: faCode,
  bolt: faBolt,
  vial: faVial,
};

type IconProps = {
  name: string;
  spin?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onMouseDown?: (e: MouseEvent) => void;
  'data-testid'?: string;
};

const Icon = memo(function Icon({ name, spin, className, onClick, onMouseDown, 'data-testid': testId }: IconProps) {
  if (name === 'sparkles') {
    return (
      <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
        className={className}
        onClick={onClick as any}
        onMouseDown={onMouseDown as any}
        data-testid={testId}
      >
        <path d="M9.5 2.5L11.2 7.8L16.5 9.5L11.2 11.2L9.5 16.5L7.8 11.2L2.5 9.5L7.8 7.8L9.5 2.5Z" />
        <path d="M18 13.5L19 16.5L22 17.5L19 18.5L18 21.5L17 18.5L14 17.5L17 16.5L18 13.5Z" />
      </svg>
    );
  }
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
});

export default Icon;
