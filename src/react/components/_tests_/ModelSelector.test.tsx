import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { ModelSelector } from '../ModelSelector'

describe('ModelSelector component', () => {
  const models = [
    { id: 'm1', name: 'Model One', contextLength: '128K', tags: ['Fast'] },
    { id: 'm2', name: 'Model Two', contextLength: '200K', tags: ['Reasoning'] },
  ]

  test('opens menu and fires onChange', () => {
    const onChange = vi.fn()
    render(<ModelSelector value="m1" models={models} onChange={onChange} />)
    expect(screen.getByTestId('model-selector-trigger')).toHaveTextContent('Model One')
    fireEvent.click(screen.getByTestId('model-selector-trigger'))
    const options = screen.getAllByTestId('model-selector-option')
    fireEvent.click(options[1])
    expect(onChange).toHaveBeenCalledWith('m2', models[1])
  })

  test('applies right-aligned class when menu would overflow right edge', () => {
    const origInnerWidth = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true })
    const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      right: 360,
      top: 60,
      bottom: 92,
      width: 160,
      height: 32,
      x: 200,
      y: 60,
      toJSON: () => ({}),
    } as DOMRect)
    const offsetWidthSpy = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(268)

    try {
      render(<ModelSelector value="m1" models={models} />)
      fireEvent.click(screen.getByTestId('model-selector-trigger'))
      expect(screen.getByTestId('model-selector-menu')).toHaveClass('vk-model-selector__menu--align-right')
    } finally {
      rectSpy.mockRestore()
      offsetWidthSpy.mockRestore()
      Object.defineProperty(window, 'innerWidth', { value: origInnerWidth, configurable: true })
    }
  })
})
