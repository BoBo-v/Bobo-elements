---
title: PromptInput | Bobo-Element
description: PromptInput 提示词输入框
---

# PromptInput 提示词输入框

AI 应用专用的输入框组件，支持自适应高度、Enter 发送、流式状态指示。

## 基础用法

Enter 发送消息，Shift+Enter 换行。

<preview path="../demo/PromptInput/Basic.vue" title="基础用法" description="PromptInput 组件的基础用法"></preview>

## 流式状态

设置 `streaming` 属性禁用输入并显示流式状态。

<preview path="../demo/PromptInput/Streaming.vue" title="流式状态" description="PromptInput 流式状态"></preview>

## 字数限制

设置 `maxLength` 和 `showCount` 显示字数统计。

<preview path="../demo/PromptInput/MaxLength.vue" title="字数限制" description="PromptInput 字数限制"></preview>

## React 用法

```tsx
import { PromptInput } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  const [value, setValue] = useState('')

  return (
    <PromptInput
      value={value}
      onChange={setValue}
      onSubmit={(text) => {
        console.log('Submitted:', text)
        setValue('')
      }}
    />
  )
}
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 输入值 | `string` | `''` |
| placeholder | 占位符 | `string` | `'输入消息...'` |
| disabled | 是否禁用 | `boolean` | `false` |
| maxLength | 最大字数 | `number` | — |
| rows | 初始行数 | `number` | `1` |
| autoResize | 自适应高度 | `boolean` | `true` |
| maxRows | 最大行数 | `number` | `6` |
| showCount | 显示字数统计 | `boolean` | `false` |
| streaming | 流式输出中 | `boolean` | `false` |
| stopable | streaming 时是否显示停止按钮 | `boolean` | `false` |
| stopText | 停止按钮文案 | `string` | `'停止'` |
| size | 输入框尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| variant | 输入框样式 | `'default' \| 'filled'` | `'default'` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue / onChange | 输入时触发 | `(value: string)` |
| submit / onSubmit | Enter 提交时触发 | `(value: string)` |
| stop / onStop | 点击停止生成时触发 | — |
| keydown | 按键时触发 | `(event: KeyboardEvent)` |

### 方法 (Exposes / Ref)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 聚焦输入框 | `() => void` |
| blur | 失焦 | `() => void` |
| clear | 清空内容 | `() => void` |
| textareaRef | textarea DOM 引用 | `HTMLTextAreaElement` |

### 插槽 / Children

| 名称 | 说明 |
| --- | --- |
| actions / children | 自定义右侧操作按钮 |
