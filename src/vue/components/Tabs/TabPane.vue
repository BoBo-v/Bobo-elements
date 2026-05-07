<template>
  <div
    class="vk-tabs__pane"
    :class="{ 'is-active': isActive }"
    v-show="isActive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onBeforeUnmount } from 'vue'
import type { TabPaneProps } from '../../../core/components/tabs/types'

defineOptions({ name: 'VkTabPane' })

const props = defineProps<TabPaneProps>()

const addPane = inject<(pane: TabPaneProps) => void>('vk-tabs-add-pane')
const removePane = inject<(name: string | number) => void>('vk-tabs-remove-pane')
const getActiveName = inject<() => string | number>('vk-tabs-active-name')

const isActive = computed(() => getActiveName?.() === props.name)

onMounted(() => {
  addPane?.({
    name: props.name,
    label: props.label,
    disabled: props.disabled
  })
})

onBeforeUnmount(() => {
  removePane?.(props.name)
})
</script>
