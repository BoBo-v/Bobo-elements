import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Alert from '../Alert';
import type { AlertRef } from '../Alert';
import React from 'react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Alert component', () => {
    test('renders content and children', () => {
        render(
            <Alert type="success" closable>
                <span>Child content</span>
            </Alert>
        );
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(screen.getByTestId('alert-content')).toHaveTextContent('Child content');
    });

    test('closable alert hides on icon click and emits close', async () => {
        const handleClose = vi.fn();
        render(
            <Alert type="info" closable onClose={handleClose}>
                Test
            </Alert>
        );
        const closeBtn = screen.getByTestId('alert-close-btn');
        fireEvent.click(closeBtn);
        expect(handleClose).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
    });

    test('non-closable alert does not render close button', () => {
        render(
            <Alert type="warning" closable={false}>
                Test
            </Alert>
        );
        const closeBtn = screen.queryByTestId('alert-close-btn');
        expect(closeBtn).toBeNull();
    });

    test('hide method works programmatically via ref', async () => {
        const handleClose = vi.fn();
        const ref = React.createRef<AlertRef>();
        render(
            <Alert type="error" closable onClose={handleClose} ref={ref}>
                Test
            </Alert>
        );
        ref.current!.hide!();
        expect(handleClose).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
    });

    test('renders icon inside alert close button', () => {
        render(
            <Alert type="info" closable>
                Test
            </Alert>
        );
        const closeIcon = screen.getByTestId('alert-close-icon');
        expect(closeIcon).toBeInTheDocument();
    });
});
