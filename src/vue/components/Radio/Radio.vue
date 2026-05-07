<template>
  <label
    class="vk-radio"
    :class="{
      'is-checked': isChecked,
      'is-disabled': isDisabled,
      [`vk-radio--${actualSize}`]: actualSize !== 'default'
    }"
  >
    <input
      class="vk-radio__input"
      type="radio"
      :name="actualName"
      :value="value"
      :disabled="isDisabled"
      :checked="isChecked"
      @change="handleChange"
    />
    <span class="vk-radio__inner"></span>
    <span class="vk-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { RadioProps, RadioEmits } from '../../../core/components/radio/types'
import { radioGroupContextKey } from '../../../core/components/radio/types'
import '@/components/Radio/style.css'

defineOptions({ name: 'VkRadio' })

const props = defineProps<RadioProps>()
const emits = defineEmits<RadioEmits>()

const radioGroup = inject(radioGroupContextKey, undefined)

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue === props.value
  }
  return props.modelValue === props.value
})

const isDisabled = computed(() => radioGroup?.disabled || props.disabled)
const actualSize = computed(() => radioGroup?.size || props.size || 'default')
const actualName = computed(() => radioGroup?.name || props.name)

const handleChange = () => {
  if (isDisabled.value) return
  if (radioGroup) {
    radioGroup.handleChange(props.value)
  } else {
    emits('update:modelValue', props.value)
    emits('change', props.value)
  }
}
</script>
