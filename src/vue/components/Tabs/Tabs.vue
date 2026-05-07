<template>
  <div
    class="vk-tabs"
    :class="{ 'vk-tabs--card': type === 'card' }"
  >
    <div class="vk-tabs__header">
      <div
        v-for="pane in paneList"
        :key="pane.name"
        class="vk-tabs__item"
        :class="{
          'is-active': modelValue === pane.name,
          'is-disabled': pane.disabled
        }"
        @click="handleTabClick(pane)"
      >
        {{ pane.label }}
      </div>
    </div>
    <div class="vk-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, onMounted } from 'vue'
import type { TabsProps, TabsEmits, TabPaneProps } from '../../../core/components/tabs/types'
import { tabsContextKey } from '../../../core/components/tabs/types'
import '@/components/Tabs/style.css'

defineOptions({ name: 'VkTabs' })

const props = withDefaults(defineProps<TabsProps>(), {
  type: 'line'
})
const emits = defineEmits<TabsEmits>()

const paneList = ref<TabPaneProps[]>([])

const addPane = (pane: TabPaneProps) => {
  paneList.value.push(pane)
}

const removePane = (name: string | number) => {
  const index = paneList.value.findIndex(p => p.name === name)
  if (index > -1) paneList.value.splice(index, 1)
}

const handleTabClick = (pane: TabPaneProps) => {
  if (pane.disabled) return
  emits('update:modelValue', pane.name)
  emits('change', pane.name)
}

provide(tabsContextKey, {
  activeName: props.modelValue,
  handleTabClick: (name: string | number) => {
    emits('update:modelValue', name)
    emits('change', name)
  }
})

provide('vk-tabs-add-pane', addPane)
provide('vk-tabs-remove-pane', removePane)
provide('vk-tabs-active-name', () => props.modelValue)
</script>
