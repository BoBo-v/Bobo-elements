<template>
  <Transition name="vk-alert-fade">
    <div
        class="vk-alert"
        v-if="visible"
        :class="{
        [`vk-alert__${type}`]: type,
        [`vk-alert__${effect}`]: effect,
      }"
    >
      <div class="vk-alert__content">
        {{content}}
        <span>
          <slot />
        </span>
      </div>
      <div class="vk-alert__close" v-if="closable">
        <Icon @click.stop="visible = false" icon="xmark"/>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps, AlertEmits } from './types'

import Icon from '../Icon/Icon.vue'
defineOptions({
  name: 'VkAlert'
})

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true
})
const emits = defineEmits<AlertEmits>()
const visible = ref(true)

const hideAlert = () => {
  visible.value = false
  emits('close')
}
defineExpose({
  hide: () => hideAlert()
})
</script>
