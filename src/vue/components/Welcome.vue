<template>
  <div
    class="vk-welcome"
    :class="[
      `vk-welcome--${variant}`,
      align === 'center' ? 'vk-welcome--center' : ''
    ]"
    data-testid="welcome"
  >
    <div v-if="$slots.icon || icon" class="vk-welcome__icon" data-testid="welcome-icon">
      <slot name="icon">
        <Icon :icon="icon!" />
      </slot>
    </div>
    <div class="vk-welcome__body">
      <div class="vk-welcome__header">
        <div>
          <h2 v-if="$slots.title || title" class="vk-welcome__title" data-testid="welcome-title">
            <slot name="title">{{ title }}</slot>
          </h2>
          <p v-if="$slots.description || description" class="vk-welcome__description" data-testid="welcome-description">
            <slot name="description">{{ description }}</slot>
          </p>
        </div>
        <div v-if="$slots.extra" class="vk-welcome__extra" data-testid="welcome-extra">
          <slot name="extra" />
        </div>
      </div>
      <div v-if="$slots.default" class="vk-welcome__footer">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WelcomeProps } from '../../core/components/welcome.types'
import Icon from './Icon.vue'
import '../../components/Welcome/style.css'

defineOptions({ name: 'VkWelcome' })

withDefaults(defineProps<WelcomeProps>(), {
  variant: 'borderless',
  align: 'left',
  icon: 'robot'
})
</script>
