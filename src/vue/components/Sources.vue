<template>
  <div class="vk-sources" data-testid="sources">
    <button
      v-if="collapsible"
      type="button"
      class="vk-sources__toggle"
      data-testid="sources-toggle"
      :aria-expanded="isExpanded"
      @click="toggleExpand"
    >
      <Icon icon="book-open" />
      <span>{{ displayTitle }}</span>
    </button>
    <div v-else-if="items.length > 0" class="vk-sources__title" data-testid="sources-title">
      {{ displayTitle }}
    </div>

    <div
      v-if="isExpanded && items.length > 0"
      class="vk-sources__list"
      :class="`vk-sources__list--${variant}`"
      data-testid="sources-list"
    >
      <component
        :is="getSafeSourceUrl(item.url) ? 'a' : 'div'"
        v-for="(item, idx) in items"
        :key="item.id"
        class="vk-sources__item"
        :href="getSafeSourceUrl(item.url)"
        :target="getSafeSourceUrl(item.url) ? '_blank' : undefined"
        :rel="getSafeSourceUrl(item.url) ? 'noopener noreferrer' : undefined"
        data-testid="sources-item"
        @click="$emit('select', item)"
      >
        <span class="vk-sources__index">{{ item.index ?? idx + 1 }}</span>
        <span class="vk-sources__body">
          <span class="vk-sources__item-title">{{ item.title }}</span>
          <span v-if="item.domain" class="vk-sources__domain">{{ item.domain }}</span>
          <span v-if="variant !== 'compact' && item.snippet" class="vk-sources__snippet">{{ item.snippet }}</span>
        </span>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SourcesProps, SourcesEmits } from '../../core/components/sources.types'
import { getSafeSourceUrl } from '../../core/components/sources.types'
import Icon from './Icon.vue'
import '../../components/Sources/style.css'

defineOptions({ name: 'VkSources' })

const props = withDefaults(defineProps<SourcesProps>(), {
  items: () => [],
  variant: 'list',
  collapsible: true,
  expanded: undefined,
  defaultExpanded: false
})

const emits = defineEmits<SourcesEmits>()

const innerExpanded = ref(props.expanded ?? (props.collapsible ? props.defaultExpanded : true))

watch(() => props.expanded, (val) => {
  if (val !== undefined) {
    innerExpanded.value = val
  }
})

const isExpanded = computed(() => (props.collapsible ? (props.expanded ?? innerExpanded.value) : true))
const displayTitle = computed(() => props.title || `参考来源 (${props.items.length})`)

function toggleExpand() {
  const next = !isExpanded.value
  innerExpanded.value = next
  emits('update:expanded', next)
}
</script>
