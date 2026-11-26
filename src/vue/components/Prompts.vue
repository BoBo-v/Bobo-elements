<template>
  <div class="vk-prompts" data-testid="prompts">
    <div v-if="$slots.title || title" class="vk-prompts__title" data-testid="prompts-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="vk-prompts__list"
      :class="[
        `vk-prompts__list--${layout}`,
        wrap ? 'vk-prompts__list--wrap' : ''
      ]"
    >
      <button
        v-for="item in items"
        :key="item.key"
        type="button"
        class="vk-prompts__item"
        :class="`vk-prompts__item--${variant}`"
        :disabled="item.disabled"
        data-testid="prompts-item"
        @click="handleSelect(item)"
      >
        <slot name="item" :item="item">
          <Icon v-if="item.icon" :icon="item.icon" class="vk-prompts__icon" />
          <span class="vk-prompts__content">
            <span class="vk-prompts__label">{{ item.label }}</span>
            <span v-if="item.description" class="vk-prompts__desc">{{ item.description }}</span>
          </span>
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PromptsProps, PromptsEmits, PromptItem } from '../../core/components/prompts.types'
import Icon from './Icon.vue'
import '../../components/Prompts/style.css'

defineOptions({ name: 'VkPrompts' })

withDefaults(defineProps<PromptsProps>(), {
  items: () => [],
  layout: 'grid',
  variant: 'card',
  wrap: true
})

const emits = defineEmits<PromptsEmits>()

function handleSelect(item: PromptItem) {
  if (item.disabled) return
  emits('select', item)
}
</script>
