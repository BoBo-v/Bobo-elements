<template>
  <div
    ref="rootRef"
    class="vk-model-selector"
    :class="`vk-model-selector--${size}`"
    data-testid="model-selector"
  >
    <button
      type="button"
      class="vk-model-selector__trigger"
      :disabled="disabled"
      :aria-expanded="open"
      data-testid="model-selector-trigger"
      @click="open = !open"
    >
      <span class="vk-model-selector__current">
        <Icon v-if="selectedModel?.icon" :icon="selectedModel.icon" />
        <span>{{ selectedModel?.name || placeholder }}</span>
        <span v-if="selectedModel?.contextLength" class="vk-model-selector__ctx">
          {{ selectedModel.contextLength }}
        </span>
      </span>
      <Icon icon="chevron-down" />
    </button>

    <div v-if="open" class="vk-model-selector__menu" data-testid="model-selector-menu">
      <button
        v-for="model in models"
        :key="model.id"
        type="button"
        class="vk-model-selector__option"
        :class="{ 'is-selected': model.id === modelValue }"
        :disabled="model.disabled"
        data-testid="model-selector-option"
        @click="selectModel(model)"
      >
        <div class="vk-model-selector__option-head">
          <span>{{ model.name }}</span>
          <span v-if="model.contextLength" class="vk-model-selector__ctx">{{ model.contextLength }}</span>
        </div>
        <div v-if="model.description" class="vk-model-selector__option-desc">{{ model.description }}</div>
        <div v-if="model.tags?.length" class="vk-model-selector__tags">
          <span v-for="tag in model.tags" :key="tag" class="vk-model-selector__tag">{{ tag }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ModelSelectorProps, ModelSelectorEmits, ModelOption } from '../../core/components/model-selector.types'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from './Icon.vue'
import '../../components/ModelSelector/style.css'

defineOptions({ name: 'VkModelSelector' })

const props = withDefaults(defineProps<ModelSelectorProps>(), {
  models: () => [],
  placeholder: '选择模型',
  disabled: false,
  size: 'default'
})

const emits = defineEmits<ModelSelectorEmits>()
const rootRef = ref<HTMLElement | undefined>(undefined)
const open = ref(false)

useClickOutside(rootRef, () => {
  open.value = false
})

const selectedModel = computed(() => props.models.find(m => m.id === props.modelValue))

function selectModel(model: ModelOption) {
  if (model.disabled) return
  emits('update:modelValue', model.id)
  emits('change', model)
  open.value = false
}
</script>
