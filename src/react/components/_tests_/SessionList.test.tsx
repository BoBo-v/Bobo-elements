import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { SessionList } from '../SessionList'

describe('SessionList component', () => {
  const items = [
    { id: '1', title: 'Pinned Chat', pinned: true },
    { id: '2', title: 'React Hooks', updatedAt: new Date() },
  ]

  test('filters items and handles create/select/delete', () => {
    const onCreate = vi.fn()
    const onSelect = vi.fn()
    const onDelete = vi.fn()
    render(
      <SessionList
        items={items}
        activeId="2"
        searchable
        onCreate={onCreate}
        onSelect={onSelect}
        onDelete={onDelete}
      />
    )

    expect(screen.getAllByTestId('session-list-item')).toHaveLength(2)
    fireEvent.change(screen.getByTestId('session-list-search'), { target: { value: 'Hooks' } })
    expect(screen.getAllByTestId('session-list-item')).toHaveLength(1)

    fireEvent.click(screen.getByTestId('session-list-create-btn'))
    expect(onCreate).toHaveBeenCalledTimes(1)

    fireEvent.click(screen.getByTestId('session-list-delete-btn'))
    expect(onDelete).toHaveBeenCalledWith(items[1])
  })
})
