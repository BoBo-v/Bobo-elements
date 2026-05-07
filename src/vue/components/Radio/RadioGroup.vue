<template>
  <div class="vk-radio-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, watch, ref } from 'vue'
import type { RadioGroupProps, RadioGroupEmits, RadioValueType } from '../../../core/components/radio/types'
import { radioGroupContextKey } from '../../../core/components/radio/types'

defineOptions({ name: 'VkRadioGroup' })

const props = defineProps<RadioGroupProps>()
const emits = defineEmits<RadioGroupEmits>()

const handleChange = (value: RadioValueType) => {
  emits('update:modelValue', value)
  emits('change', value)
}

provide(radioGroupContextKey, {
  modelValue: props.modelValue,
  name: props.name,
  disabled: props.disabled,
  size: props.size,
  handleChange
})
</script>
