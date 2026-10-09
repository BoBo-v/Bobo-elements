---
title: PromptInput | Bobo-Element
description: PromptInput 提示词输入框
---

# PromptInput 提示词输入框

AI 应用专用的输入框组件，支持自适应高度、Enter 发送、流式状态指示、无障碍访问及自定义操作栏。

## 基础用法

Enter 发送消息，Shift+Enter 换行。

<preview path="../demo/PromptInput/Basic.vue" title="基础用法" description="PromptInput 组件的基础用法"></preview>

## 流式状态

设置 `streaming` 属性禁用输入并显示流式状态，配合 `stoppable` 可显示中断按钮。

<preview path="../demo/PromptInput/Streaming.vue" title="流式状态" description="PromptInput 流式状态"></preview>

## 字数限制

设置 `maxLength` 和 `showCount` 显示字数统计。

<preview path="../demo/PromptInput/MaxLength.vue" title="字数限制" description="PromptInput 字数限制"></preview>

## 双框架使用示例

::: code-group
```vue [Vue 3]
<template>
  <PromptInput
    v-model="value"
    placeholder="输入提示词..."
    :streaming="isStreaming"
    :stoppable="true"
    hint-text="内容由 AI 生成，请注意甄别"
    @submit="handleSubmit"
    @stop="handleStop"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PromptInput } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const value = ref('')
const isStreaming = ref(false)

const handleSubmit = (text: string) => {
  console.log('提交:', text)
  isStreaming.value = true
}

const handleStop = () => {
  isStreaming.value = false
}
</script>
```

```tsx [React]
import React, { useState } from 'react'
import { PromptInput } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const [value, setValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const handleSubmit = (text: string) => {
    console.log('Submitted:', text)
    setValue('')
    setIsStreaming(true)
  }

  const handleStop = () => {
    setIsStreaming(false)
  }

  return (
    <PromptInput
      value={value}
      onChange={setValue}
      placeholder="输入提示词..."
      streaming={isStreaming}
      stoppable
      hintText="内容由 AI 生成，请注意甄别"
      onSubmit={handleSubmit}
      onStop={handleStop}
    />
  )
}
```
:::

## API

### 属性 (Attributes / Props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 输入值（Vue `v-model` / React `value`） | `string` | `''` |
| placeholder | 占位符文本 | `string` | `'输入消息...'` |
| disabled | 是否禁用 | `boolean` | `false` |
| maxLength | 最大字数 | `number` | — |
| rows | 初始行数 | `number` | `1` |
| autoResize | 是否开启高度自适应 | `boolean` | `true` |
| maxRows | 最大自适应行数 | `number` | `6` |
| showCount | 是否显示字数统计 | `boolean` | `false` |
| streaming | 是否处于流式响应中 | `boolean` | `false` |
| stoppable | streaming 时是否显示停止生成按钮（旧 `stopable` 已弃用但兼容） | `boolean` | `false` |
| stopText | 停止按钮文案 | `string` | `'停止'` |
| streamingText | 停止生成悬浮文案 | `string` | `'停止生成'` |
| hintText | 底部辅助说明 / 免责声明提示文案 | `string` | — |
| size | 输入框尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| variant | 输入框风格变体 | `'default' \| 'filled'` | `'default'` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| id | 原生 textarea id 标识 | `string` | — |
| ariaLabel | textarea 无障碍标签 | `string` | — |
| ariaLabelledby | textarea 无障碍关联标签 ID | `string` | — |
| stopAriaLabel | 停止按钮无障碍标签 | `string` | `'停止生成'` |
| sendAriaLabel | 发送按钮无障碍标签 | `string` | `'发送消息'` |
| clearAriaLabel | 清空按钮无障碍标签 | `string` | `'清空输入内容'` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue / onChange | 输入内容变更时触发 | `(value: string)` |
| submit / onSubmit | 按 Enter 键提交时触发（支持外部 `e.preventDefault()` 拦截） | `(value: string)` |
| stop / onStop | 点击停止生成按钮时触发 | — |
| keydown | 键盘按键原生事件 | `(event: KeyboardEvent)` |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 聚焦输入框 | `() => void` |
| blur | 失焦输入框 | `() => void` |
| clear | 清空内容 | `() => void` |
| textareaRef | textarea 原生 DOM 引用 | `HTMLTextAreaElement` |

### 插槽 / Children

| 名称 | 说明 |
| --- | --- |
| actions / children | 自定义底部右侧操作栏按钮 |
