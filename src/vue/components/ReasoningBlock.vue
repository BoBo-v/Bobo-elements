<template>
  <div
    class="vk-reasoning-block"
    :class="{ 'is-thinking': status === 'thinking' }"
    data-testid="reasoning-block"
  >
    <Collapse
      :model-value="innerExpanded ? ['reasoning'] : []"
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
                {{ tokenCount }} {{ tokenUnit }}
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
import { ref, watch } from 'vue'
import type { ReasoningBlockProps, ReasoningBlockEmits } from '../../core/components/reasoning-block.types'
import { formatDuration } from '../../core/components/ai-format'
import Collapse from './Collapse/Collapse.vue'
import CollapseItem from './Collapse/CollapseItem.vue'
import Icon from './Icon.vue'
import '../../components/ReasoningBlock/style.css'

defineOptions({ name: 'VkReasoningBlock' })

const props = withDefaults(defineProps<ReasoningBlockProps>(), {
  title: '分析过程',
  expanded: false,
  status: 'done',
  autoCollapse: false,
  tokenUnit: 'tokens'
})

const emit = defineEmits<ReasoningBlockEmits>()
const innerExpanded = ref(props.expanded)

watch(() => props.expanded, (val) => {
  innerExpanded.value = val
})

// 当思考状态从 thinking 切换到 done 且开启 autoCollapse 时自动收起思维链
watch(() => props.status, (next, prev) => {
  if (props.autoCollapse && prev === 'thinking' && next === 'done' && innerExpanded.value) {
    innerExpanded.value = false
    emit('update:expanded', false)
    props.onExpandedChange?.(false)
  }
})

function handleChange(names: Array<string | number>) {
  const nextExpanded = names.includes('reasoning')
  innerExpanded.value = nextExpanded
  emit('update:expanded', nextExpanded)
  props.onExpandedChange?.(nextExpanded)
}
</script>
