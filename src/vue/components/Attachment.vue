<template>
  <div
    class="vk-attachment-list"
    :class="`vk-attachment-list--${layout}`"
    data-testid="attachment-list"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="vk-attachment-card"
      :class="[
        item.status ? `vk-attachment-card--${item.status}` : '',
        clickable ? 'vk-attachment-card--clickable' : ''
      ]"
      data-testid="attachment-card"
      @click="clickable && $emit('click', item)"
    >
      <div class="vk-attachment-card__thumb">
        <img v-if="isImageAttachment(item)" :src="item.url" :alt="item.name" />
        <Icon v-else :icon="getAttachmentIcon(item)" />
      </div>
      <div class="vk-attachment-card__info">
        <div class="vk-attachment-card__name" :title="item.name">{{ item.name }}</div>
        <div class="vk-attachment-card__meta">
          <span v-if="item.status === 'error'" class="vk-attachment-card__error-text">
            {{ item.errorMessage || '上传失败' }}
          </span>
          <span v-else-if="item.size !== undefined">{{ formatFileSize(item.size) }}</span>
          <button
            v-if="item.status === 'error'"
            type="button"
            class="vk-attachment-card__retry"
            data-testid="attachment-retry-btn"
            @click.stop="$emit('retry', item)"
          >
            {{ retryText }}
          </button>
        </div>
        <div v-if="item.status === 'uploading'" class="vk-attachment-card__progress" data-testid="attachment-progress">
          <div class="vk-attachment-card__progress-bar" :style="{ width: `${Math.min(100, Math.max(0, item.progress ?? 0))}%` }" />
        </div>
      </div>
      <button
        v-if="removable"
        type="button"
        class="vk-attachment-card__remove"
        data-testid="attachment-remove-btn"
        :aria-label="`${removeAriaLabel} ${item.name}`"
        @click.stop="$emit('remove', item)"
      >
        <Icon icon="xmark" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AttachmentProps, AttachmentEmits } from '../../core/components/attachment.types'
import { formatFileSize } from '../../core/components/ai-format'
import { isImageAttachment, getAttachmentIcon } from '../../core/components/attachment.logic'
import Icon from './Icon.vue'
import '../../components/Attachment/style.css'

defineOptions({ name: 'VkAttachment' })

withDefaults(defineProps<AttachmentProps>(), {
  items: () => [],
  layout: 'horizontal',
  removable: true,
  clickable: false,
  removeAriaLabel: '移除',
  retryText: '重试'
})

defineEmits<AttachmentEmits>()
</script>
