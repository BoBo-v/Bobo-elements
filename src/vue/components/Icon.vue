<template>
  <i class="vk-icon" :class="{[`vk-icon--${type}`] : type }" :style="customStyles" v-bind="$attrs">
    <svg
      v-if="icon === 'sparkles'"
      class="vk-icon__svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.5 2.5L11.2 7.8L16.5 9.5L11.2 11.2L9.5 16.5L7.8 11.2L2.5 9.5L7.8 7.8L9.5 2.5Z" />
      <path d="M18 13.5L19 16.5L22 17.5L19 18.5L18 21.5L17 18.5L14 17.5L17 16.5L18 13.5Z" />
    </svg>
    <font-awesome-icon v-else v-bind="filteredProps"/>
  </i>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from '../../core/components/icon.types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'VkIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>
