import { useState, useMemo, memo } from 'react'
import type { CSSProperties } from 'react'
import type { SessionListProps as CoreSessionListProps, SessionItem } from '../../../core/components/session-list.types'
import { groupSessions } from '../../../core/components/session-list.logic'
import Icon from '../Icon'
import '../../../components/SessionList/style.css'

export type { SessionItem }

export interface SessionListProps extends CoreSessionListProps {
  className?: string
  style?: CSSProperties
  onSelect?: (item: SessionItem) => void
  onCreate?: () => void
  onDelete?: (item: SessionItem) => void
  onRename?: (item: SessionItem, nextTitle: string) => void
  onPin?: (item: SessionItem) => void
}

export const SessionList = memo(function SessionList({
  items = [],
  activeId,
  searchable = false,
  searchPlaceholder = '搜索历史对话...',
  creatable = true,
  createText = '新建对话',
  emptyText = '暂无历史对话',
  groupByTime = true,
  className,
  style,
  onSelect,
  onCreate,
  onDelete,
  onRename,
  onPin,
}: SessionListProps) {
  const [keyword, setKeyword] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const groups = useMemo(() => groupSessions(items, keyword, groupByTime), [items, keyword, groupByTime])

  const commitRename = (item: SessionItem) => {
    if (editingId !== item.id) return
    const next = editingTitle.trim()
    setEditingId(null)
    if (next && next !== item.title) {
      onRename?.(item, next)
    }
  }

  const rootClass = ['vk-session-list', className || ''].filter(Boolean).join(' ')

  return (
    <aside className={rootClass} style={style} data-testid="session-list">
      {(creatable || searchable) && (
        <div className="vk-session-list__top">
          {creatable && (
            <button
              type="button"
              className="vk-session-list__create"
              data-testid="session-list-create-btn"
              onClick={onCreate}
            >
              <Icon name="plus" /> {createText}
            </button>
          )}
          {searchable && (
            <input
              type="text"
              className="vk-session-list__search"
              value={keyword}
              placeholder={searchPlaceholder}
              data-testid="session-list-search"
              onChange={(e) => setKeyword(e.target.value)}
            />
          )}
        </div>
      )}

      {groups.length > 0 ? (
        <div className="vk-session-list__groups">
          {groups.map((group) => (
            <div key={group.label || '_all'}>
              {group.label && <div className="vk-session-list__group-title">{group.label}</div>}
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`vk-session-list__item${item.id === activeId ? ' is-active' : ''}`}
                  data-testid="session-list-item"
                  onClick={() => onSelect?.(item)}
                >
                  {editingId === item.id ? (
                    <input
                      type="text"
                      className="vk-session-list__rename-input"
                      value={editingTitle}
                      data-testid="session-list-rename-input"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') commitRename(item)
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      onBlur={() => commitRename(item)}
                    />
                  ) : (
                    <span className="vk-session-list__item-title">{item.title}</span>
                  )}

                  {editingId !== item.id && (
                    <span className="vk-session-list__item-actions">
                      <button
                        type="button"
                        className="vk-session-list__icon-btn"
                        data-testid="session-list-pin-btn"
                        aria-label={item.pinned ? '取消置顶' : '置顶'}
                        onClick={(e) => {
                          e.stopPropagation()
                          onPin?.(item)
                        }}
                      >
                        <Icon name="thumbtack" />
                      </button>
                      <button
                        type="button"
                        className="vk-session-list__icon-btn"
                        data-testid="session-list-rename-btn"
                        aria-label="重命名"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingId(item.id)
                          setEditingTitle(item.title)
                        }}
                      >
                        <Icon name="pen" />
                      </button>
                      <button
                        type="button"
                        className="vk-session-list__icon-btn vk-session-list__icon-btn--danger"
                        data-testid="session-list-delete-btn"
                        aria-label="删除"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete?.(item)
                        }}
                      >
                        <Icon name="trash" />
                      </button>
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="vk-session-list__empty" data-testid="session-list-empty">
          {emptyText}
        </div>
      )}
    </aside>
  )
})
