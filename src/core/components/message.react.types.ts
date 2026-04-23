import type { ReactNode } from 'react';

export interface MessageProps {
  message?: string | ReactNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger';
  onDestory: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>;

export interface MessageContext {
  id: string;
  destroy: () => void;
  bottomOffset: number;
  updateBottomOffset: (val: number) => void;
}
