import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { MessageProps } from '../../../core/components/message.react.types';
import Icon from '../Icon';
import '../../../components/Message/style.css';

interface InternalMessageProps extends MessageProps {
  getLastBottomOffset: () => number;
  onUpdateHeight: (height: number) => void;
}

export default function Message({
  message,
  duration = 3000,
  showClose = false,
  type = 'info',
  onDestory,
  offset = 20,
  zIndex,
  getLastBottomOffset,
  onUpdateHeight,
}: InternalMessageProps) {
  const [visible, setVisible] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastOffset = getLastBottomOffset();
  const topOffset = offset + lastOffset;

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
    if (visible && messageRef.current) {
      const height = messageRef.current.getBoundingClientRect().height;
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
        'vk-message',
        type ? `vk-message--${type}` : '',
        showClose ? 'is-close' : '',
        visible ? '' : 'fade-up-leave-to',
      ]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      ref={messageRef}
      style={{
        top: `${topOffset}px`,
        zIndex,
        opacity: visible ? 1 : 0,
        transition: 'top 0.3s, opacity 0.3s, transform 0.3s',
      }}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      <div className="vk-message__content">
        {message}
      </div>
      {showClose && (
        <div className="vk-message__close">
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
