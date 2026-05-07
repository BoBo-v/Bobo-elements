<template>
  <label
    class="vk-checkbox"
    :class="{
      'is-checked': isChecked,
      'is-disabled': isDisabled
    }"
  >
    <input
      class="vk-checkbox__input"
      type="checkbox"
      :name="name"
      :disabled="isDisabled"
      :checked="isChecked"
      @change="handleChange"
    />
    <span class="vk-checkbox__inner"></span>
    <span class="vk-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CheckboxProps, CheckboxEmits, CheckboxValueType } from '../../../core/components/checkbox/types'
import { checkboxGroupContextKey } from '../../../core/components/checkbox/types'
import '@/components/Checkbox/style.css'

defineOptions({ name: 'VkCheckbox' })

const props = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxEmits>()

const checkboxGroup = inject(checkboxGroupContextKey, undefined)

const isChecked = computed(() => {
  if (checkboxGroup && props.value !== undefined) {
    return checkboxGroup.modelValue.includes(props.value)
  }
  return props.modelValue ?? props.checked ?? false
})

const isDisabled = computed(() => {
  if (checkboxGroup) {
    if (checkboxGroup.disabled) return true
    if (!isChecked.value && checkboxGroup.max !== undefined && checkboxGroup.modelValue.length >= checkboxGroup.max) return true
    if (isChecked.value && checkboxGroup.min !== undefined && checkboxGroup.modelValue.length <= checkboxGroup.min) return true
  }
  return props.disabled ?? false
})

const handleChange = () => {
  if (isDisabled.value) return
  if (checkboxGroup && props.value !== undefined) {
    checkboxGroup.handleChange(props.value, !isChecked.value)
  } else {
    const newVal = !isChecked.value
    emits('update:modelValue', newVal)
    emits('change', newVal)
  }
}
</script>
