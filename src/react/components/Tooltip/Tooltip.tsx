import {
    useState,
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useMemo,
} from 'react';
import type { ReactNode } from 'react';
import { createPopper } from '@popperjs/core';
import type { Instance } from '@popperjs/core';
import { debounce } from 'lodash-es';
import type { TooltipProps, TooltipInstance } from '../../../core/components/Tooltip/tooltip.types';
import '../../../components/Tooltip/style.css';

interface TooltipPropsWithSlots extends TooltipProps {
    children?: ReactNode;
    contentSlot?: ReactNode;
}

const Tooltip = forwardRef<TooltipInstance, TooltipPropsWithSlots>(
    (
        {
            content,
            trigger = 'hover',
            placement = 'bottom',
            manual = false,
            popperOptions: extraPopperOptions,
            openDelay = 0,
            closeDelay = 0,
            children,
            contentSlot,
            onVisibleChange,
            onClickOutside,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const triggerNodeRef = useRef<HTMLDivElement>(null);
        const popperNodeRef = useRef<HTMLDivElement>(null);
        const containerNodeRef = useRef<HTMLDivElement>(null);
        const popperInstanceRef = useRef<Instance | null>(null);

        const computedPopperOptions = useMemo(
            () => ({
                placement,
                modifiers: [
                    {
                        name: 'offset',
                        options: { offset: [0, 9] },
                    },
                ],
                ...extraPopperOptions,
            }),
            [placement, extraPopperOptions]
        );

        const openPopper = useCallback(() => {
            setIsOpen(true);
            onVisibleChange?.(true);
        }, [onVisibleChange]);

        const closePopper = useCallback(() => {
            setIsOpen(false);
            onVisibleChange?.(false);
        }, [onVisibleChange]);

        const openDebounced = useMemo(
            () => debounce(openPopper, openDelay),
            [openPopper, openDelay]
        );
        const closeDebounced = useMemo(
            () => debounce(closePopper, closeDelay),
            [closePopper, closeDelay]
        );

        const openFinal = useCallback(() => {
            closeDebounced.cancel();
            openDebounced();
        }, [openDebounced, closeDebounced]);

        const closeFinal = useCallback(() => {
            openDebounced.cancel();
            closeDebounced();
        }, [openDebounced, closeDebounced]);

        const togglePopper = useCallback(() => {
            if (isOpen) {
                closeFinal();
            } else {
                openFinal();
            }
        }, [isOpen, openFinal, closeFinal]);

        useImperativeHandle(ref, () => ({
            show: openFinal,
            hide: closeFinal,
        }));

        // Click outside detection
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (
                    containerNodeRef.current &&
                    !containerNodeRef.current.contains(e.target as Node)
                ) {
                    if (trigger === 'click' && isOpen && !manual) {
                        closeFinal();
                    }
                    if (isOpen) {
                        onClickOutside?.(true);
                    }
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [trigger, isOpen, manual, closeFinal, onClickOutside]);

        // Create/destroy popper instance
        useEffect(() => {
            if (isOpen && triggerNodeRef.current && popperNodeRef.current) {
                popperInstanceRef.current = createPopper(
                    triggerNodeRef.current,
                    popperNodeRef.current,
                    computedPopperOptions
                );
            }
            return () => {
                popperInstanceRef.current?.destroy();
                popperInstanceRef.current = null;
            };
        }, [isOpen, computedPopperOptions]);

        // Cleanup debounces
        useEffect(() => {
            return () => {
                openDebounced.cancel();
                closeDebounced.cancel();
            };
        }, [openDebounced, closeDebounced]);

        // Event handlers
        const triggerEvents: Record<string, (e: React.MouseEvent) => void> = {};
        const outerEvents: Record<string, (e: React.MouseEvent) => void> = {};

        if (!manual) {
            if (trigger === 'hover') {
                triggerEvents.onMouseEnter = openFinal;
                outerEvents.onMouseLeave = closeFinal;
            } else if (trigger === 'click') {
                triggerEvents.onClick = togglePopper;
            }
        }

        return (
            <div className="vk-tooltip" ref={containerNodeRef} {...outerEvents}>
                <div className="vk-tooltip__trigger" ref={triggerNodeRef} {...triggerEvents}>
                    {children}
                </div>
                {isOpen && (
                    <div className="vk-tooltip__popper" ref={popperNodeRef}>
                        {contentSlot || content}
                        <div id="arrow" data-popper-arrow />
                    </div>
                )}
            </div>
        );
    }
);

export default Tooltip;
