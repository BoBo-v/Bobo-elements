import type { ReactNode } from 'react';

export interface NotificationProps {
  title: string;
  message?: string | ReactNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'danger';
  onDestory: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
  icon?: string;
}

export type CreateNotificationProps = Omit<NotificationProps, 'onDestory' | 'id' | 'zIndex'>;

export interface NotificationContext {
  id: string;
  destroy: () => void;
  bottomOffset: number;
  updateBottomOffset: (val: number) => void;
}
