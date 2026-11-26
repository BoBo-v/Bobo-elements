export interface SessionItem {
  id: string
  title: string
  updatedAt?: string | number | Date
  group?: string
  pinned?: boolean
  unread?: boolean
}

export interface SessionListProps {
  items?: SessionItem[]
  activeId?: string
  searchable?: boolean
  searchPlaceholder?: string
  creatable?: boolean
  createText?: string
  emptyText?: string
  groupByTime?: boolean
}

export interface SessionListEmits {
  (e: 'select', item: SessionItem): void
  (e: 'create'): void
  (e: 'delete', item: SessionItem): void
  (e: 'rename', item: SessionItem, nextTitle: string): void
  (e: 'pin', item: SessionItem): void
}
