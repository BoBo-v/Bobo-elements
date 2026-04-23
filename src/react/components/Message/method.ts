import React from 'react';
import { createRoot } from 'react-dom/client';
import type { CreateMessageProps, MessageContext } from '../../../core/components/message.react.types';
import MessageComponent from './Message';

let seed = 1;
let zIndex = 2000;
const instances: MessageContext[] = [];

export const getLastBottomOffset = (id: string): number => {
  const idx = instances.findIndex((inst) => inst.id === id);
  if (idx <= 0) return 0;
  return instances[idx - 1].bottomOffset;
};

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`;
  const curZIndex = zIndex++;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const instance: MessageContext = {
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

  const element = React.createElement(MessageComponent, {
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
  // Copy the array since destroy modifies instances
  [...instances].forEach((inst) => inst.destroy());
};
