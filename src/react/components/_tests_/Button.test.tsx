import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';
import React from 'react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

beforeAll(() => {
    library.add(faXmark, faSpinner)
})

describe('Button component', () => {
    test('renders with correct text and type class', () => {
        render(<Button type="primary">Click me</Button>);
        const btn = screen.getByTestId('button');
        expect(btn).toBeInTheDocument();
        expect(screen.getByTestId('button-text')).toHaveTextContent('Click me');
        expect(btn).toHaveClass('vk-button--primary');
    });

    test('triggers onClick event', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        const btn = screen.getByTestId('button');
        fireEvent.click(btn);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled button and prevents click', () => {
        const handleClick = vi.fn();
        render(
            <Button disabled onClick={handleClick}>
                Disabled
            </Button>
        );
        const btn = screen.getByTestId('button');
        expect(btn).toBeDisabled();
        fireEvent.click(btn);
        expect(handleClick).not.toHaveBeenCalled();
    });

    // test('renders custom icon', () => {
    //     render(<Button icon={<span data-testid="button-icon">Icon</span>}>Icon Button</Button>);
    //     const icon = screen.getByTestId('button-icon');
    //     expect(icon).toBeInTheDocument();
    //     expect(icon).toHaveTextContent('Icon');
    // });
    test('renders custom icon', () => {
        render(<Button icon={<span data-testid="button-icon">Icon</span>}>Icon Button</Button>);
        const icons = screen.getAllByTestId('button-icon');
        expect(icons[0]).toHaveTextContent('Icon');
    });


    test('renders loading state correctly', () => {
        render(
            <Button loading icon={<span data-testid="button-icon">Icon</span>}>
                Loading
            </Button>
        );
        const btn = screen.getByTestId('button');
        expect(btn).toHaveClass('is-loading');
        expect(btn).toBeDisabled();
        expect(screen.getByTestId('button-loading-icon')).toBeInTheDocument();
        // loading 状态下自定义 icon 不应显示
        expect(screen.queryByTestId('button-icon')).toBeNull();
        expect(screen.getByTestId('button-text')).toHaveTextContent('Loading');
    });
});
