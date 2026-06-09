import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReasoningBlock } from '../ReasoningBlock'

describe('ReasoningBlock component', () => {
  test('basic render', () => {
    render(<ReasoningBlock>Reasoning content</ReasoningBlock>)
    expect(screen.getByTestId('reasoning-block')).toBeInTheDocument()
    expect(screen.getByTestId('reasoning-block')).toHaveClass('vk-reasoning-block')
  })

  test('shows title', () => {
    render(<ReasoningBlock>content</ReasoningBlock>)
    expect(screen.getByText('思考过程')).toBeInTheDocument()
  })

  test('custom title', () => {
    render(<ReasoningBlock title="推理过程">content</ReasoningBlock>)
    expect(screen.getByText('推理过程')).toBeInTheDocument()
  })

  test('shows duration', () => {
    const { container } = render(<ReasoningBlock duration={1500}>content</ReasoningBlock>)
    expect(container.querySelector('.vk-reasoning-block__duration')).toBeTruthy()
  })

  test('shows token count', () => {
    const { container } = render(<ReasoningBlock tokenCount={42}>content</ReasoningBlock>)
    expect(container.querySelector('.vk-reasoning-block__tokens')).toBeTruthy()
  })
})
