<template>
  <div class="vk-checkbox-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { CheckboxGroupProps, CheckboxGroupEmits, CheckboxValueType } from '../../../core/components/checkbox/types'
import { checkboxGroupContextKey } from '../../../core/components/checkbox/types'

defineOptions({ name: 'VkCheckboxGroup' })

const props = defineProps<CheckboxGroupProps>()
const emits = defineEmits<CheckboxGroupEmits>()

const handleChange = (value: CheckboxValueType, checked: boolean) => {
  const newVal = [...props.modelValue]
  if (checked) {
    if (props.max !== undefined && newVal.length >= props.max) return
    newVal.push(value)
  } else {
    if (props.min !== undefined && newVal.length <= props.min) return
    const idx = newVal.indexOf(value)
    if (idx > -1) newVal.splice(idx, 1)
  }
  emits('update:modelValue', newVal)
  emits('change', newVal)
}

provide(checkboxGroupContextKey, {
  get modelValue() { return props.modelValue },
  get disabled() { return props.disabled },
  get min() { return props.min },
  get max() { return props.max },
  handleChange
})
</script>
