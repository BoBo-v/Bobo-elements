<template>
  <button :class="classes" :disabled="isDisabled" @click="$emit('click')">
    <Icon v-if="iconName" :icon="iconName"/>
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '../../core/components/button.types';
import { useButtonLogic } from '../../core/components/button.logic';
import Icon from './Icon.vue';
import '../../core/styles/button.css';

const props = defineProps<ButtonProps>();
const { isDisabled, iconName, classes } = useButtonLogic(props);
</script>
