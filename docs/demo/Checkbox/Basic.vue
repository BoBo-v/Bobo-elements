<script setup>
import { ref } from 'vue'
import Checkbox from '@/vue/components/Checkbox/Checkbox.vue'
import CheckboxGroup from '@/vue/components/Checkbox/CheckboxGroup.vue'
const checked = ref(['上海', '北京'])
</script>
<template>
  <CheckboxGroup v-model="checked">
    <Checkbox value="上海" label="上海" />
    <Checkbox value="北京" label="北京" />
    <Checkbox value="广州" label="广州" />
    <Checkbox value="深圳" label="深圳" />
  </CheckboxGroup>
  <p style="margin-top: 10px; color: #606266;">当前选中：{{ checked }}</p>
</template>
