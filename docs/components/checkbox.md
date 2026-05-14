---
title: Checkbox | Bobo-Element
description: Checkbox 多选框
---

# Checkbox 多选框
在一组备选项中进行多选。

## 基础用法
通过 `CheckboxGroup` 的 `v-model` 绑定选中值数组，`Checkbox` 的 `value` 设置选项值。

<preview path="../demo/Checkbox/Basic.vue" title="基础用法" description="Checkbox 组件的基础用法"></preview>

## 禁用状态
在 `CheckboxGroup` 上设置 `disabled` 可以禁用整组多选框。

<preview path="../demo/Checkbox/Disabled.vue" title="禁用状态" description="Checkbox 禁用状态"></preview>

## 可选数量限制
通过 `min` 和 `max` 属性限制可选的数量范围。

<preview path="../demo/Checkbox/MinMax.vue" title="数量限制" description="Checkbox 可选数量限制"></preview>

## React 用法

```tsx
import { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  const [checked, setChecked] = useState(['上海', '北京'])

  return (
    <CheckboxGroup modelValue={checked} onChange={setChecked}>
      <Checkbox value="上海">上海</Checkbox>
      <Checkbox value="北京">北京</Checkbox>
      <Checkbox value="广州">广州</Checkbox>
      <Checkbox value="深圳">深圳</Checkbox>
    </CheckboxGroup>
  )
}

// 禁用整组
<CheckboxGroup modelValue={checked} disabled onChange={setChecked}>
  <Checkbox value="上海">上海</Checkbox>
  <Checkbox value="北京">北京</Checkbox>
</CheckboxGroup>

// 数量限制（最少1项，最多3项）
<CheckboxGroup modelValue={checked} min={1} max={3} onChange={setChecked}>
  <Checkbox value="上海">上海</Checkbox>
  <Checkbox value="北京">北京</Checkbox>
  <Checkbox value="广州">广州</Checkbox>
  <Checkbox value="深圳">深圳</Checkbox>
</CheckboxGroup>
```

## API

### CheckboxGroup 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `Array<string \| number \| boolean>` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| min | 最少选中数量 | `number` | — |
| max | 最多选中数量 | `number` | — |

### CheckboxGroup 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 绑定值变化时触发 | `(value: Array<string \| number \| boolean>) => void` |

### CheckboxGroup 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | Checkbox 组件 |

---

### Checkbox 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 多选框的值（配合 CheckboxGroup 使用） | `string \| number \| boolean` | — |
| label | 标签文字 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| checked | 是否选中（独立使用时） | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |

### Checkbox 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义标签内容 |
