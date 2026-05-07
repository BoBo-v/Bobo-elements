<template>
  <div class="vk-radio-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
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
  get modelValue() { return props.modelValue },
  get name() { return props.name },
  get disabled() { return props.disabled },
  get size() { return props.size },
  handleChange
})
</script>
