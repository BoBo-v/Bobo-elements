import React from 'react';
import { createRoot } from 'react-dom/client';
import type {
  CreateNotificationProps,
  NotificationContext,
} from '../../../core/components/notification.react.types';
import NotificationComponent from './Notification';

let seed = 1;
let zIndex = 2000;
const instances: NotificationContext[] = [];

export const getLastBottomOffset = (id: string): number => {
  const idx = instances.findIndex((inst) => inst.id === id);
  if (idx <= 0) return 0;
  return instances[idx - 1].bottomOffset;
};

export const createNotification = (props: CreateNotificationProps) => {
  const id = `notification_${seed++}`;
  const curZIndex = zIndex++;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const instance: NotificationContext = {
    id,
    destroy: () => {},
    bottomOffset: 0,
    updateBottomOffset: (val: number) => {
      instance.bottomOffset = val;
    },
  };

  const destroy = () => {
    const idx = instances.findIndex((inst) => inst.id === id);
    if (idx !== -1) instances.splice(idx, 1);
    root.unmount();
    container.remove();
  };

  instance.destroy = destroy;

  const onUpdateHeight = (height: number) => {
    const lastBottom = getLastBottomOffset(id);
    instance.bottomOffset = height + (props.offset || 20) + lastBottom;
  };

  const element = React.createElement(NotificationComponent, {
    ...props,
    id,
    zIndex: curZIndex,
    onDestory: destroy,
    getLastBottomOffset: () => getLastBottomOffset(id),
    onUpdateHeight,
  });

  root.render(element);
  instances.push(instance);
  return instance;
};

export const closeAll = () => {
  [...instances].forEach((inst) => inst.destroy());
};
