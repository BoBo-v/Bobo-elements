<template>
  <div class="vk-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="vk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.divided" role="separator" class="divided-placeholder" />
            <li
              class="vk-dropdown__item"
              @click="itemClick(item)"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'
import type { DropdownProps, DropdownEmits, MenuOption } from '@/components/Dropdown/types'
import type { TooltipInstance } from '@/components/Tooltip/types'
import '@/components/Dropdown/style.css'

defineOptions({ name: 'VkDropdown' })
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emit = defineEmits<DropdownEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>

const visibleChange = (e: boolean) => {
  emit('visible-change', e)
}
const itemClick = (item: MenuOption) => {
  if (item.disabled) return
  emit('select', item)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

defineExpose({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})
</script>
