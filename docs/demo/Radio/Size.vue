<script setup>
import { ref } from 'vue'
import Radio from '@/vue/components/Radio/Radio.vue'
import RadioGroup from '@/vue/components/Radio/RadioGroup.vue'
const picked = ref('1')
</script>
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <RadioGroup v-model="picked" size="large">
      <Radio value="1" label="大尺寸" />
      <Radio value="2" label="选项二" />
    </RadioGroup>
    <RadioGroup v-model="picked">
      <Radio value="1" label="默认尺寸" />
      <Radio value="2" label="选项二" />
    </RadioGroup>
    <RadioGroup v-model="picked" size="small">
      <Radio value="1" label="小尺寸" />
      <Radio value="2" label="选项二" />
    </RadioGroup>
  </div>
</template>
