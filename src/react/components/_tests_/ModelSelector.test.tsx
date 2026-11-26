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
})
