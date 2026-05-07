<template>
  <span
    v-if="visible"
    class="vk-tag"
    :class="[
      type ? `vk-tag--${type}` : '',
      size && size !== 'default' ? `vk-tag--${size}` : '',
      effect ? `vk-tag--${effect}` : 'vk-tag--light',
      { 'is-round': round }
    ]"
    :style="color ? { backgroundColor: color, borderColor: color, color: '#fff' } : {}"
    @click="handleClick"
  >
    <span class="vk-tag__content">
      <slot />
    </span>
    <button
      v-if="closable"
      class="vk-tag__close"
      @click.stop="handleClose"
    >
      <Icon icon="xmark" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TagProps, TagEmits } from '../../../core/components/tag.types'
import Icon from '../Icon.vue'
import '@/components/Tag/style.css'

defineOptions({ name: 'VkTag' })

withDefaults(defineProps<TagProps>(), {
  type: 'primary',
  size: 'default',
  effect: 'light',
  closable: false,
  round: false
})

const emits = defineEmits<TagEmits>()
const visible = ref(true)

const handleClose = () => {
  visible.value = false
  emits('close')
}

const handleClick = () => {
  emits('click')
}
</script>
