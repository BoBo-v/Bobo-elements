<script setup>
import { ref } from 'vue'
import ModelSelector from '@/vue/components/ModelSelector.vue'

const modelId = ref('gpt-4o')
const models = [
  { id: 'gpt-4o', name: 'GPT-4o', contextLength: '128K', description: '通用多模态旗舰模型', tags: ['Vision', 'Tools'] },
  { id: 'deepseek-r1', name: 'DeepSeek-R1', contextLength: '64K', description: '深度推理模型', tags: ['Thinking'] },
  { id: 'claude-3-7', name: 'Claude 3.7', contextLength: '200K', description: '代码生成与架构分析', tags: ['Coding', 'Agent'] }
]
</script>

<template>
  <ModelSelector v-model="modelId" :models="models" />
</template>
