import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '../Modal'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

describe('Modal component', () => {
  test('renders when visible is true', () => {
    render(
      <Modal visible title="测试弹窗">
        <p>内容</p>
      </Modal>
    )
    expect(screen.getByText('测试弹窗')).toBeInTheDocument()
    expect(screen.getByText('内容')).toBeInTheDocument()
  })

  test('does not render when visible is false', () => {
    render(
      <Modal visible={false} title="测试弹窗">
        <p>内容</p>
      </Modal>
    )
    expect(screen.queryByText('测试弹窗')).toBeNull()
  })

  test('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal visible title="测试" onClose={onClose}>
        内容
      </Modal>
    )
    fireEvent.click(screen.getByText('测试').parentElement!.querySelector('.vk-modal__close')!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('calls onClose when mask clicked', () => {
    const onClose = vi.fn()
    const { container } = render(
      <Modal visible title="测试" maskClosable onClose={onClose}>
        内容
      </Modal>
    )
    fireEvent.click(container.querySelector('.vk-overlay')!)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('does not call onClose when mask clicked with maskClosable false', () => {
    const onClose = vi.fn()
    const { container } = render(
      <Modal visible title="测试" maskClosable={false} onClose={onClose}>
        内容
      </Modal>
    )
    fireEvent.click(container.querySelector('.vk-overlay')!)
    expect(onClose).not.toHaveBeenCalled()
  })

  test('hides close button when closable is false', () => {
    const { container } = render(
      <Modal visible title="测试" closable={false}>
        内容
      </Modal>
    )
    expect(container.querySelector('.vk-modal__close')).toBeNull()
  })

  test('hides footer when showFooter is false', () => {
    const { container } = render(
      <Modal visible title="测试" showFooter={false}>
        内容
      </Modal>
    )
    expect(container.querySelector('.vk-modal__footer')).toBeNull()
  })

  test('calls onConfirm when confirm button clicked', () => {
    const onConfirm = vi.fn()
    const onClose = vi.fn()
    render(
      <Modal visible title="测试" onConfirm={onConfirm} onClose={onClose}>
        内容
      </Modal>
    )
    fireEvent.click(screen.getByText('确定'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test('calls onCancel when cancel button clicked', () => {
    const onCancel = vi.fn()
    const onClose = vi.fn()
    render(
      <Modal visible title="测试" onCancel={onCancel} onClose={onClose}>
        内容
      </Modal>
    )
    fireEvent.click(screen.getByText('取消'))
    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
