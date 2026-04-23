<template>
  <Transition
    :name="`vk-notification-${transitionName}`"
    @after-leave="destroyComponent"
    @enter="updateHeight"
  >
    <div
      class="vk-notification"
      v-show="visible"
      :class="{
        [`vk-notification--${type}`]: type,
        'is-close': showClose
      }"
      role="alert"
      ref="notifyRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <Icon :icon="iconName" v-if="iconName" class="vk-notification__icon"/>
      <div class="vk-notification__text">
        <div class="vk-notification__title">
          {{title}}
        </div>
        <div class="vk-notification__content">
          <slot>
            <RenderVnode :vNode="message" v-if="message" />
          </slot>
        </div>
      </div>
      <div class="vk-notification__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark"/>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { NotificationProps } from '@/components/Notification/types'
import { getLastBottomOffset } from './method'
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon.vue'
import useEventListener from '@/hooks/useEventListener'
import { typeIconNameMap } from '../../../../utils'
import '@/components/Notification/style.css'

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade',
  showClose: true
})
const visible = ref(false)
const notifyRef = ref<HTMLDivElement>()
const iconName = computed(() => {
  if (!props.type) return props.icon
  return typeIconNameMap[props.type] || props.icon
})

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
  height.value = notifyRef.value!.getBoundingClientRect().height
}
defineExpose({
  visible,
  bottomOffset
})
</script>
