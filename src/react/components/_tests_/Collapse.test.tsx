import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Collapse, CollapseItem } from '../Collapse/index'

describe('Collapse component', () => {
    test('renders children', () => {
        render(
            <Collapse modelValue={[]}>
                <CollapseItem name="1" title="Item 1">
                    Content 1
                </CollapseItem>
            </Collapse>
        )
        expect(screen.getByText('Item 1')).toBeInTheDocument()
    })

    test('toggles item on click (non-accordion)', () => {
        render(
            <Collapse modelValue={[]}>
                <CollapseItem name="1" title="Item 1">
                    Content 1
                </CollapseItem>
            </Collapse>
        )

        fireEvent.click(screen.getByText('Item 1'))
        expect(screen.getByText('Content 1')).toBeInTheDocument()
    })

    test('accordion mode allows only one open item', () => {
        const { container } = render(
            <Collapse modelValue={[]} accordion>
                <CollapseItem name="1" title="Item 1">
                    A
                </CollapseItem>
                <CollapseItem name="2" title="Item 2">
                    B
                </CollapseItem>
            </Collapse>
        )

        const headers = container.querySelectorAll('.vk-collapse-item__header')
        fireEvent.click(headers[0])
        expect(screen.getByText('A')).toBeInTheDocument()

        fireEvent.click(headers[1])
        expect(screen.queryByText('A')).not.toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    test('disabled item does not toggle', () => {
        render(
            <Collapse modelValue={[]}>
                <CollapseItem name="1" title="Item 1" disabled>
                    Content 1
                </CollapseItem>
            </Collapse>
        )

        fireEvent.click(screen.getByText('Item 1'))
        expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
})
