import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { NotificationProps } from '../../../core/components/notification.react.types';
import Icon from '../Icon';
import '../../../components/Notification/style.css';

const typeIconNameMap: Record<string, string> = {
  success: 'circle-check',
  info: 'circle-info',
  warning: 'circle-exclamation',
  danger: 'circle-xmark',
};

interface InternalNotificationProps extends NotificationProps {
  getLastBottomOffset: () => number;
  onUpdateHeight: (height: number) => void;
}

export default function Notification({
  title,
  message,
  duration = 3000,
  showClose = true,
  type = 'info',
  onDestory,
  offset = 20,
  zIndex,
  icon,
  getLastBottomOffset,
  onUpdateHeight,
}: InternalNotificationProps) {
  const [visible, setVisible] = useState(false);
  const notifyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastOffset = getLastBottomOffset();
  const topOffset = offset + lastOffset;

  const iconName = type ? typeIconNameMap[type] || icon : icon;

  const startTimer = useCallback(() => {
    if (duration === 0) return;
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, duration);
  }, [duration]);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    setVisible(true);
    startTimer();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      clearTimer();
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Measure height after becoming visible
  useEffect(() => {
    if (visible && notifyRef.current) {
      const height = notifyRef.current.getBoundingClientRect().height;
      onUpdateHeight(height);
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // Destroy after leave animation
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        onDestory();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [visible, onDestory]);

  return (
    <div
      className={[
        'vk-notification',
        type ? `vk-notification--${type}` : '',
        showClose ? 'is-close' : '',
        visible ? '' : 'vk-notification-fade-leave-to',
      ]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      ref={notifyRef}
      style={{
        top: `${topOffset}px`,
        zIndex,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s, transform 0.3s, right 0.3s, top 0.4s',
      }}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {iconName && <Icon name={iconName} className="vk-notification__icon" />}
      <div className="vk-notification__text">
        <div className="vk-notification__title">{title}</div>
        <div className="vk-notification__content">{message}</div>
      </div>
      {showClose && (
        <div className="vk-notification__close">
          <Icon
            name="xmark"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
