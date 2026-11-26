<template>
  <div
    class="vk-diff-code-block"
    :class="{ 'vk-diff-code-block--light': theme === 'light' }"
    data-testid="diff-code-block"
  >
    <div class="vk-diff-code-block__header">
      <div>
        <span>{{ title || language || 'diff' }}</span>
        <span class="vk-diff-code-block__stats">
          <span class="vk-diff-code-block__stat-add">+{{ addedCount }}</span>
          <span class="vk-diff-code-block__stat-del">-{{ removedCount }}</span>
        </span>
      </div>
      <div v-if="actionable" class="vk-diff-code-block__actions">
        <button
          type="button"
          class="vk-diff-code-block__btn"
          data-testid="diff-reject-btn"
          @click="$emit('reject')"
        >
          {{ rejectText }}
        </button>
        <button
          type="button"
          class="vk-diff-code-block__btn vk-diff-code-block__btn--apply"
          data-testid="diff-apply-btn"
          @click="$emit('apply', newCode)"
        >
          {{ applyText }}
        </button>
      </div>
    </div>

    <div class="vk-diff-code-block__body">
      <div
        v-for="(line, idx) in diffLines"
        :key="idx"
        class="vk-diff-code-block__line"
        :class="`vk-diff-code-block__line--${line.type}`"
        data-testid="diff-code-line"
      >
        <template v-if="showLineNumbers">
          <span class="vk-diff-code-block__ln">{{ line.oldLine ?? '' }}</span>
          <span class="vk-diff-code-block__ln">{{ line.newLine ?? '' }}</span>
        </template>
        <span class="vk-diff-code-block__marker">{{ line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' ' }}</span>
        <span class="vk-diff-code-block__text">{{ line.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DiffCodeBlockProps, DiffCodeBlockEmits } from '../../core/components/diff-code-block.types'
import { computeLineDiff } from '../../core/components/diff-code-block.logic'
import '../../components/DiffCodeBlock/style.css'

defineOptions({ name: 'VkDiffCodeBlock' })

const props = withDefaults(defineProps<DiffCodeBlockProps>(), {
  oldCode: '',
  newCode: '',
  language: '',
  title: '',
  theme: 'dark',
  showLineNumbers: true,
  actionable: false,
  applyText: '应用修改',
  rejectText: '忽略'
})

defineEmits<DiffCodeBlockEmits>()

const diffLines = computed(() => computeLineDiff(props.oldCode, props.newCode))
const addedCount = computed(() => diffLines.value.filter(l => l.type === 'added').length)
const removedCount = computed(() => diffLines.value.filter(l => l.type === 'removed').length)
</script>
