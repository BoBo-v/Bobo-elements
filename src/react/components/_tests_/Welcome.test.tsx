import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Welcome } from '../Welcome'

describe('Welcome component', () => {
  test('renders title, description, variant and align', () => {
    render(
      <Welcome
        title="你好，我是 Bobo AI"
        description="开始一段对话"
        variant="filled"
        align="center"
        extra={<button type="button">Docs</button>}
      >
        <div>Footer</div>
      </Welcome>
    )
    const el = screen.getByTestId('welcome')
    expect(el).toHaveClass('vk-welcome--filled', 'vk-welcome--center')
    expect(screen.getByTestId('welcome-title')).toHaveTextContent('你好，我是 Bobo AI')
    expect(screen.getByTestId('welcome-description')).toHaveTextContent('开始一段对话')
    expect(screen.getByTestId('welcome-extra')).toHaveTextContent('Docs')
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
