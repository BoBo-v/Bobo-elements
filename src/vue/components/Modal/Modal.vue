<template>
  <Teleport to="body">
    <Transition name="vk-modal-fade">
      <div
        v-if="modelValue"
        class="vk-overlay"
        @click.self="handleMaskClick"
      >
        <div
          class="vk-modal"
          :style="{ width: width, marginTop: top }"
        >
          <div class="vk-modal__header">
            <span class="vk-modal__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button
              v-if="closable"
              class="vk-modal__close"
              @click="handleClose"
            >
              <Icon icon="xmark" />
            </button>
          </div>
          <div class="vk-modal__body">
            <slot />
          </div>
          <div v-if="showFooter" class="vk-modal__footer">
            <slot name="footer">
              <Button @click="handleCancel">取消</Button>
              <Button type="primary" @click="handleConfirm">确定</Button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import type { ModalProps, ModalEmits } from '../../../core/components/modal.types'
import Icon from '../Icon.vue'
import Button from '../Button.vue'
import '../../../components/Modal/style.css'

defineOptions({ name: 'VkModal' })

const props = withDefaults(defineProps<ModalProps>(), {
  width: '520px',
  top: '15vh',
  closable: true,
  maskClosable: true,
  showFooter: true
})

const emits = defineEmits<ModalEmits>()

watch(() => props.modelValue, (val) => {
  if (val) {
    emits('open')
  }
})

const handleClose = () => {
  emits('update:modelValue', false)
  emits('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

const handleConfirm = () => {
  emits('confirm')
  handleClose()
}

const handleCancel = () => {
  emits('cancel')
  handleClose()
}
</script>
