<template>
  <span
    class="vk-token-badge"
    :class="[
      `vk-token-badge--${computedStatus}`,
      size !== 'default' ? `vk-token-badge--${size}` : '',
      variant === 'filled' ? 'vk-token-badge--filled' : ''
    ]"
    :title="detailTitle || undefined"
    data-testid="token-badge"
  >
    <span class="vk-token-badge__prefix">{{ prefix }}</span>
    <span class="vk-token-badge__value" data-testid="token-badge-value">{{ formatTokenCount(used) }}</span>
    <span v-if="total !== undefined" data-testid="token-badge-total">/ {{ formatTokenCount(total) }}</span>
    <span v-if="hasBreakdown" class="vk-token-badge__breakdown" data-testid="token-badge-breakdown">
      <template v-if="inputTokens !== undefined">↑{{ formatTokenCount(inputTokens) }}</template>
      <template v-if="outputTokens !== undefined">↓{{ formatTokenCount(outputTokens) }}</template>
      <template v-if="cachedTokens !== undefined">⚡{{ formatTokenCount(cachedTokens) }}</template>
    </span>
    <span v-if="showProgress && progressPercent !== null" class="vk-token-badge__progress" data-testid="token-badge-progress">
      <span class="vk-token-badge__progress-bar" :style="{ width: `${progressPercent}%` }" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TokenBadgeProps } from '../../core/components/token-badge.types'
import { formatTokenCount, resolveTokenStatus } from '../../core/components/ai-format'
import '../../components/TokenBadge/style.css'

defineOptions({ name: 'VkTokenBadge' })

const props = withDefaults(defineProps<TokenBadgeProps>(), {
  used: 0,
  status: 'normal',
  autoStatus: false,
  warningThreshold: 0.8,
  dangerThreshold: 1,
  size: 'default',
  variant: 'light',
  prefix: 'Tokens',
  showProgress: false
})

const computedStatus = computed(() =>
  resolveTokenStatus(
    props.used,
    props.total,
    props.status,
    props.autoStatus,
    props.warningThreshold,
    props.dangerThreshold
  )
)

const hasBreakdown = computed(() =>
  props.inputTokens !== undefined || props.outputTokens !== undefined || props.cachedTokens !== undefined
)

const progressPercent = computed(() => {
  if (props.total === undefined || props.total <= 0) return null
  return Math.min(100, Math.max(0, Math.round((props.used / props.total) * 100)))
})

const detailTitle = computed(() => {
  const parts: string[] = []
  if (props.inputTokens !== undefined) parts.push(`输入: ${props.inputTokens}`)
  if (props.outputTokens !== undefined) parts.push(`输出: ${props.outputTokens}`)
  if (props.cachedTokens !== undefined) parts.push(`缓存: ${props.cachedTokens}`)
  return parts.join(' · ')
})
</script>
