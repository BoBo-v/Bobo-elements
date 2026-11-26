<script setup>
import Welcome from '@/vue/components/Welcome.vue'
import Prompts from '@/vue/components/Prompts.vue'

const items = [
  { key: '1', label: '帮我重构这段代码', description: '提升可读性与类型安全', icon: 'code' },
  { key: '2', label: '总结文档要点', description: '提取关键结论与行动项', icon: 'file-lines' }
]
</script>

<template>
  <Welcome
    title="你好，我是 Bobo AI 助手"
    description="支持代码生成、对话问答、工具调用与参考来源溯源。"
    variant="filled"
  >
    <Prompts :items="items" layout="grid" />
  </Welcome>
</template>
