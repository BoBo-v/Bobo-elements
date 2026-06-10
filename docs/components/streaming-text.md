---
title: StreamingText | Bobo-Element
description: StreamingText 流式文本
---

# StreamingText 流式文本

逐字显示文本的打字机效果组件，适用于 AI 流式输出场景。

## 基础用法

通过 `text` 传入累积文本，组件自动检测追加和重置。

<preview path="../demo/StreamingText/Basic.vue" title="基础用法" description="StreamingText 组件的基础用法"></preview>

## 不同速度

通过 `speed` 控制每 tick 显示的字符数。

<preview path="../demo/StreamingText/Speed.vue" title="不同速度" description="StreamingText 不同速度"></preview>

## React 用法

```tsx
import { StreamingText } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  const [text, setText] = useState('')

  // 模拟流式输出
  useEffect(() => {
    const full = 'Hello, I am an AI assistant.'
    let i = 0
    const timer = setInterval(() => {
      i++
      setText(full.slice(0, i))
      if (i >= full.length) clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return <StreamingText text={text} speed={2} />
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 累积全文 | `string` | `''` |
| speed | 每 tick 显示字符数 | `number` | `1` |
| interval | 每 tick 间隔 (ms) | `number` | `50` |
| showCursor | 是否显示光标 | `boolean` | `true` |
| cursorChar | 光标字符 | `string` | `'│'` |
| cursorStyle | 光标样式 | `'line' \| 'block' \| 'underline'` | `'line'` |
| paused | 是否暂停打字动画 | `boolean` | `false` |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| reset | 重置到初始状态 | `() => void` |
| finish | 立即完成输出 | `() => void` |
| pause | 暂停输出动画 | `() => void` |
| resume | 继续输出动画 | `() => void` |
| isComplete | 是否已完成输出 | `boolean` |
