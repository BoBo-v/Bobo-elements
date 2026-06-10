<template>
  <div class="vk-reasoning-block" data-testid="reasoning-block">
    <Collapse
      :model-value="expanded ? ['reasoning'] : []"
      @change="handleChange"
    >
      <CollapseItem name="reasoning">
        <template #title>
          <div class="vk-reasoning-block__header">
            <Icon icon="brain" class="vk-reasoning-block__icon" />
            <span class="vk-reasoning-block__title">{{ title }}</span>
            <span v-if="duration !== undefined || tokenCount !== undefined" class="vk-reasoning-block__meta">
              <span v-if="duration !== undefined" class="vk-reasoning-block__duration">
                <Icon icon="clock" /> {{ formatDuration(duration) }}
              </span>
              <span v-if="tokenCount !== undefined" class="vk-reasoning-block__tokens">
                {{ tokenCount }} tokens
              </span>
            </span>
          </div>
        </template>
        <div class="vk-reasoning-block__content">
          <slot />
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import type { ReasoningBlockProps } from '../../core/components/reasoning-block.types'
import Collapse from './Collapse/Collapse.vue'
import CollapseItem from './Collapse/CollapseItem.vue'
import Icon from './Icon.vue'
import '../../components/ReasoningBlock/style.css'

defineOptions({ name: 'VkReasoningBlock' })

const props = withDefaults(defineProps<ReasoningBlockProps>(), {
  title: '分析过程',
  expanded: false
})

const emit = defineEmits<{
  (e: 'update:expanded', value: boolean): void
}>()

function handleChange(names: Array<string | number>) {
  const nextExpanded = names.includes('reasoning')
  emit('update:expanded', nextExpanded)
  props.onExpandedChange?.(nextExpanded)
}

function formatDuration(ms: number): string {
  if (ms < 1000) return ms + 'ms'
  return (ms / 1000).toFixed(1) + 's'
}
</script>
