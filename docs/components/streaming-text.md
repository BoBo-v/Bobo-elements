---
title: StreamingText | Bobo-Element
description: StreamingText 流式文本
---

# StreamingText 流式文本

逐字显示文本的打字机效果组件，支持 Unicode 完整字素簇（防止 Emoji 表情截断）、速度调节与暂停/完成控制，专为 AI 流式响应设计。

## 基础用法

通过 `text` 传入累积文本，组件自动检测追加和重置。

<preview path="../demo/StreamingText/Basic.vue" title="基础用法" description="StreamingText 组件的基础用法"></preview>

## 不同速度

通过 `speed` 控制每 tick 显示的字符数。

<preview path="../demo/StreamingText/Speed.vue" title="不同速度" description="StreamingText 不同速度"></preview>

## 双框架使用示例

::: code-group
```vue [Vue 3]
<template>
  <div class="stream-box">
    <StreamingText
      :text="fullText"
      :speed="2"
      :show-cursor="true"
      cursor-style="line"
      @complete="handleComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { StreamingText } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const fullText = ref('')

onMounted(() => {
  const content = '你好！我是基于 Bobo-Elements 构建的 AI 助手。'
  let index = 0
  const timer = setInterval(() => {
    index += 2
    fullText.value = content.slice(0, index)
    if (index >= content.length) clearInterval(timer)
  }, 100)
})

const handleComplete = () => {
  console.log('打字动画全部播放完毕')
}
</script>
```

```tsx [React]
import React, { useState, useEffect } from 'react'
import { StreamingText } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    const full = '你好！我是基于 Bobo-Elements 构建的 AI 助手。'
    let index = 0
    const timer = setInterval(() => {
      index += 2
      setText(full.slice(0, index))
      if (index >= full.length) clearInterval(timer)
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <StreamingText
      text={text}
      speed={2}
      showCursor
      cursorStyle="line"
      onComplete={() => console.log('打字动画全部播放完毕')}
    />
  )
}
```
:::

## API

### 属性 (Attributes / Props)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 累积全文内容（组件自动比对增量并打字输出） | `string` | `''` |
| speed | 每次触发推进的字素/字符数 | `number` | `1` |
| interval | 每 tick 渲染时间间隔 (ms) | `number` | `50` |
| showCursor | 是否显示打字光标 | `boolean` | `true` |
| cursorChar | 光标自定义符号 | `string` | `'│'` |
| cursorStyle | 光标样式形态 | `'line' \| 'block' \| 'underline'` | `'line'` |
| paused | 是否暂停打字动画播放 | `boolean` | `false` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| complete / onComplete | 当文本完全呈现且队列消费完毕时触发 | — |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| reset | 重置回到初始空状态 | `() => void` |
| finish | 立即跳过动画呈现全文 | `() => void` |
| pause | 暂停打字渲染输出 | `() => void` |
| resume | 恢复继续打字输出 | `() => void` |
| isComplete | 当前是否已全部输出完毕 | `boolean` |
