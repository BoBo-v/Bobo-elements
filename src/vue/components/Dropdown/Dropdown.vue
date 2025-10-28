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
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'
import { useDropdownLogic } from '../../core/components/dropdown.logic'
import type { DropdownProps, DropdownEmits } from '../../core/components/dropdown.types'

const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true })
const emit = defineEmits<DropdownEmits>()

const { tooltipRef, visibleChange, itemClick, expose } = useDropdownLogic(props, emit)

defineExpose(expose)
</script>
