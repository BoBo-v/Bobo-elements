<template>
  <span
    class="vk-token-badge"
    :class="[
      `vk-token-badge--${computedStatus}`,
      size !== 'default' ? `vk-token-badge--${size}` : '',
      variant === 'filled' ? 'vk-token-badge--filled' : ''
    ]"
    data-testid="token-badge"
  >
    <span class="vk-token-badge__prefix">{{ prefix }}</span>
    <span class="vk-token-badge__value" data-testid="token-badge-value">{{ formatNumber(used) }}</span>
    <span v-if="total !== undefined" data-testid="token-badge-total">/ {{ formatNumber(total) }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TokenBadgeProps } from '../../core/components/token-badge.types'
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
  prefix: 'Tokens'
})

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

const computedStatus = computed(() => {
  if (!props.autoStatus || props.total === undefined || props.total <= 0) return props.status
  const ratio = props.used / props.total
  if (ratio >= props.dangerThreshold) return 'danger'
  if (ratio >= props.warningThreshold) return 'warning'
  return 'normal'
})
</script>
