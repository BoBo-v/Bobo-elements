---
title: Radio | Bobo-Element
description: Radio 单选框
---

# Radio 单选框
在一组备选项中进行单选。

## 基础用法
通过 `RadioGroup` 的 `v-model` 绑定选中值，`Radio` 的 `value` 设置选项值。

<preview path="../demo/Radio/Basic.vue" title="基础用法" description="Radio 组件的基础用法"></preview>

## 禁用状态
在 `RadioGroup` 上设置 `disabled` 可以禁用整组单选框。

<preview path="../demo/Radio/Disabled.vue" title="禁用状态" description="Radio 禁用状态"></preview>

## 不同尺寸
通过 `size` 属性设置单选框的大小。

<preview path="../demo/Radio/Size.vue" title="不同尺寸" description="Radio 不同尺寸"></preview>

## React 用法

```tsx
import { useState } from 'react'
import { Radio, RadioGroup } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  const [value, setValue] = useState('1')

  return (
    <RadioGroup modelValue={value} onChange={setValue}>
      <Radio value="1">选项一</Radio>
      <Radio value="2">选项二</Radio>
      <Radio value="3">选项三</Radio>
    </RadioGroup>
  )
}

// 禁用整组
<RadioGroup modelValue={value} disabled onChange={setValue}>
  <Radio value="1">选项一</Radio>
  <Radio value="2">选项二</Radio>
</RadioGroup>

// 不同尺寸
<RadioGroup modelValue={value} size="large" onChange={setValue}>
  <Radio value="1">大尺寸</Radio>
  <Radio value="2">选项二</Radio>
</RadioGroup>
```

## API

### RadioGroup 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string \| number \| boolean` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |
| size | 单选框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |

### RadioGroup 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `(value: string \| number \| boolean) => void` |

### RadioGroup 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | Radio 组件 |

---

### Radio 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 单选框的值 | `string \| number \| boolean` | — |
| label | 标签文字 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |

### Radio 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义标签内容 |
