<script setup>
import { ref } from 'vue'
import Radio from '@/vue/components/Radio/Radio.vue'
import RadioGroup from '@/vue/components/Radio/RadioGroup.vue'
const picked = ref('1')
</script>
<template>
  <RadioGroup v-model="picked">
    <Radio value="1" label="选项一" />
    <Radio value="2" label="选项二" />
    <Radio value="3" label="选项三" />
  </RadioGroup>
  <p style="margin-top: 10px; color: #606266;">当前选中：{{ picked }}</p>
</template>
