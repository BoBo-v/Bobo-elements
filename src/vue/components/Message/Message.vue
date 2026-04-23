<template>
<Transition
  :name="transitionName"
  @after-leave="destroyComponent"
  @enter="updateHeight"
>
<div
  class="vk-message"
  v-show="visible"
  :class="{
    [`vk-message--${type}`]: type,
    'is-close': showClose
  }"
  role="alert"
  ref="messageRef"
  :style="cssStyle"
  @mouseenter="clearTimer"
  @mouseleave="startTimer"
>
  <div class="vk-message__content">
    <slot>
      <RenderVnode :vNode="message" v-if="message" />
    </slot>
  </div>
  <div class="vk-message__close" v-if="showClose">
    <Icon @click.stop="visible = false" icon="xmark"/>
  </div>
</div>
</Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { MessageProps } from '@/components/Message/types'
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon.vue'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'
import '@/components/Message/style.css'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
  visible.value = true
  startTimer()
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
function destroyComponent() {
  props.onDestory()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>
