<template>
  <aside class="vk-session-list" data-testid="session-list">
    <div v-if="creatable || searchable" class="vk-session-list__top">
      <button
        v-if="creatable"
        type="button"
        class="vk-session-list__create"
        data-testid="session-list-create-btn"
        @click="$emit('create')"
      >
        <Icon icon="plus" /> {{ createText }}
      </button>
      <input
        v-if="searchable"
        v-model="keyword"
        type="text"
        class="vk-session-list__search"
        :placeholder="searchPlaceholder"
        data-testid="session-list-search"
      />
    </div>

    <div v-if="groups.length > 0" class="vk-session-list__groups">
      <div v-for="group in groups" :key="group.label || '_all'">
        <div v-if="group.label" class="vk-session-list__group-title">{{ group.label }}</div>
        <div
          v-for="item in group.items"
          :key="item.id"
          class="vk-session-list__item"
          :class="{ 'is-active': item.id === activeId }"
          data-testid="session-list-item"
          @click="$emit('select', item)"
        >
          <input
            v-if="editingId === item.id"
            v-model="editingTitle"
            type="text"
            class="vk-session-list__rename-input"
            data-testid="session-list-rename-input"
            @click.stop
            @keydown.enter="commitRename(item)"
            @keydown.esc="cancelRename"
            @blur="commitRename(item)"
          />
          <span v-else class="vk-session-list__item-title">{{ item.title }}</span>

          <span v-if="editingId !== item.id" class="vk-session-list__item-actions">
            <button
              type="button"
              class="vk-session-list__icon-btn"
              data-testid="session-list-pin-btn"
              :aria-label="item.pinned ? '取消置顶' : '置顶'"
              @click.stop="$emit('pin', item)"
            >
              <Icon icon="thumbtack" />
            </button>
            <button
              type="button"
              class="vk-session-list__icon-btn"
              data-testid="session-list-rename-btn"
              aria-label="重命名"
              @click.stop="startRename(item)"
            >
              <Icon icon="pen" />
            </button>
            <button
              type="button"
              class="vk-session-list__icon-btn vk-session-list__icon-btn--danger"
              data-testid="session-list-delete-btn"
              aria-label="删除"
              @click.stop="$emit('delete', item)"
            >
              <Icon icon="trash" />
            </button>
          </span>
        </div>
      </div>
    </div>

    <div v-else class="vk-session-list__empty" data-testid="session-list-empty">
      {{ emptyText }}
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SessionListProps, SessionListEmits, SessionItem } from '../../core/components/session-list.types'
import { groupSessions } from '../../core/components/session-list.logic'
import Icon from './Icon.vue'
import '../../components/SessionList/style.css'

defineOptions({ name: 'VkSessionList' })

const props = withDefaults(defineProps<SessionListProps>(), {
  items: () => [],
  searchable: false,
  searchPlaceholder: '搜索历史对话...',
  creatable: true,
  createText: '新建对话',
  emptyText: '暂无历史对话',
  groupByTime: true
})

const emits = defineEmits<SessionListEmits>()
const keyword = ref('')
const editingId = ref<string | null>(null)
const editingTitle = ref('')

const groups = computed(() => groupSessions(props.items, keyword.value, props.groupByTime))

function startRename(item: SessionItem) {
  editingId.value = item.id
  editingTitle.value = item.title
}

function commitRename(item: SessionItem) {
  if (editingId.value !== item.id) return
  const next = editingTitle.value.trim()
  editingId.value = null
  if (next && next !== item.title) {
    emits('rename', item, next)
  }
}

function cancelRename() {
  editingId.value = null
}
</script>
