<template>
  <span
    class="vk-token-badge"
    :class="[`vk-token-badge--${status}`]"
    data-testid="token-badge"
  >
    <span class="vk-token-badge__prefix">{{ prefix }}</span>
    <span class="vk-token-badge__value" data-testid="token-badge-value">{{ formatNumber(used) }}</span>
    <span v-if="total !== undefined" data-testid="token-badge-total">/ {{ formatNumber(total) }}</span>
  </span>
</template>

<script setup lang="ts">
import type { TokenBadgeProps } from '../../core/components/token-badge.types'
import '../../components/TokenBadge/style.css'

defineOptions({ name: 'VkTokenBadge' })

withDefaults(defineProps<TokenBadgeProps>(), {
  used: 0,
  status: 'normal',
  prefix: 'Tokens'
})

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}
</script>
