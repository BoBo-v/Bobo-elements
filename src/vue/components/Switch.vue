<template>
  <div
    class="vk-switch"
    :class="{
      [`vk-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked
    }"
  >
    <input
      v-if="name"
      class="vk-switch__input"
      type="hidden"
      :name="name"
      :value="String(innerValue)"
    />
    <button
      :id="id"
      type="button"
      role="switch"
      class="vk-switch__core"
      :aria-checked="checked"
      :disabled="disabled"
      @click="switchValue"
    >
      <span v-if="activeText || inactiveText" class="vk-switch__core-inner">
        <span class="vk-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </span>
      <span class="vk-switch__core-action" aria-hidden="true" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from '../../components/Switch/types'
import '../../components/Switch/style.css'

defineOptions({
  name: 'VkSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})

const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const checked = computed(() => innerValue.value === props.activeValue)

const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})
</script>
