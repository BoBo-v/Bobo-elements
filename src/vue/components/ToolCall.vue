<template>
  <div
    class="vk-tool-call"
    :class="`vk-tool-call--${status}`"
    data-testid="tool-call"
  >
    <button
      type="button"
      class="vk-tool-call__header"
      data-testid="tool-call-header"
      :aria-expanded="isExpanded"
      @click="toggleExpand"
    >
      <span class="vk-tool-call__title-wrap">
        <Icon :icon="statusIcon" :spin="status === 'running'" />
        <span class="vk-tool-call__title">{{ title }}</span>
        <span v-if="toolName" class="vk-tool-call__name">{{ toolName }}</span>
      </span>
      <span class="vk-tool-call__meta">
        <span v-if="duration !== undefined" class="vk-tool-call__duration">
          {{ formatDuration(duration) }}
        </span>
        <span class="vk-tool-call__status" :class="`vk-tool-call__status--${status}`" data-testid="tool-call-status">
          {{ TOOL_STATUS_LABELS[status] }}
        </span>
        <Icon icon="chevron-down" class="vk-tool-call__chevron" :class="{ 'is-expanded': isExpanded }" />
      </span>
    </button>

    <div v-if="isExpanded && hasBody" class="vk-tool-call__body" data-testid="tool-call-body">
      <slot />
      <div v-if="formattedArgs">
        <div class="vk-tool-call__section-label">{{ argsLabel }}</div>
        <pre class="vk-tool-call__payload" data-testid="tool-call-args">{{ formattedArgs }}</pre>
      </div>
      <div v-if="formattedResult">
        <div class="vk-tool-call__section-label">{{ resultLabel }}</div>
        <pre class="vk-tool-call__payload" data-testid="tool-call-result">{{ formattedResult }}</pre>
      </div>
      <div v-if="errorMessage" class="vk-tool-call__error" data-testid="tool-call-error">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="status === 'awaiting-approval' || $slots.actions" class="vk-tool-call__approval" data-testid="tool-call-approval">
      <slot name="actions">
        <button
          type="button"
          class="vk-tool-call__btn vk-tool-call__btn--reject"
          data-testid="tool-call-reject-btn"
          @click="$emit('reject')"
        >
          {{ rejectText }}
        </button>
        <button
          type="button"
          class="vk-tool-call__btn vk-tool-call__btn--approve"
          data-testid="tool-call-approve-btn"
          @click="$emit('approve')"
        >
          {{ approveText }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue'
import type { ToolCallProps, ToolCallEmits } from '../../core/components/tool-call.types'
import { formatDuration } from '../../core/components/ai-format'
import { formatToolPayload, TOOL_STATUS_LABELS } from '../../core/components/tool-call.logic'
import Icon from './Icon.vue'
import '../../components/ToolCall/style.css'

defineOptions({ name: 'VkToolCall' })

const props = withDefaults(defineProps<ToolCallProps>(), {
  status: 'pending',
  expanded: undefined,
  defaultExpanded: false,
  approveText: '允许执行',
  rejectText: '拒绝',
  argsLabel: '输入参数',
  resultLabel: '执行结果'
})

const emits = defineEmits<ToolCallEmits>()
const slots = useSlots()

const innerExpanded = ref(props.expanded ?? props.defaultExpanded)

watch(() => props.expanded, (val) => {
  if (val !== undefined) {
    innerExpanded.value = val
  }
})

const isExpanded = computed(() => props.expanded ?? innerExpanded.value)
const formattedArgs = computed(() => formatToolPayload(props.args))
const formattedResult = computed(() => formatToolPayload(props.result))
const hasBody = computed(() => Boolean(slots.default || formattedArgs.value || formattedResult.value || props.errorMessage))

const statusIcon = computed(() => {
  switch (props.status) {
    case 'running': return 'spinner'
    case 'success': return 'circle-check'
    case 'error': return 'circle-xmark'
    case 'awaiting-approval': return 'triangle-exclamation'
    default: return 'clock'
  }
})

function toggleExpand() {
  const next = !isExpanded.value
  innerExpanded.value = next
  emits('update:expanded', next)
}
</script>
