<template>
  <Transition name="vk-alert-fade">
    <div
        class="vk-alert"
        v-if="visible"
        :class="{
        [`vk-alert__${type}`]: type,
        [`vk-alert__${effect}`]: effect
      }"
    >
      <div class="vk-alert__content">
        {{ content }}
        <span><slot /></span>
      </div>
      <div class="vk-alert__close" v-if="closable">
        <!-- 点击调用 hideAlert，触发 emits -->
        <Icon @click.stop="hideAlert" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AlertProps, AlertEmits, AlertInstance } from '../../core/components/alert.types'
import Icon from './Icon.vue'
import '../../core/styles/alert.css'

defineOptions({ name: 'VkAlert' })

withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  closable: true
})

const emits = defineEmits<AlertEmits>()
const visible = ref(true)

// 隐藏 Alert 并触发 close 事件
const hideAlert = () => {
  visible.value = false
  emits('close')
}

defineExpose<AlertInstance>({
  hide: hideAlert
})
</script>
