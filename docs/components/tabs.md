---
title: Tabs | Bobo-Element
description: Tabs 标签页
---

# Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

## 基础用法
通过 `v-model` 绑定当前激活的标签页，`label` 设置标签标题。

<preview path="../demo/Tabs/Basic.vue" title="基础用法" description="Tabs 组件的基础用法"></preview>

## 卡片风格
设置 `type` 为 `card` 可以使标签页以卡片风格展示。

<preview path="../demo/Tabs/Card.vue" title="卡片风格" description="Tabs 卡片风格"></preview>

## 禁用某一项
在 `TabPane` 上设置 `disabled` 可禁用该标签页。

<preview path="../demo/Tabs/Disabled.vue" title="禁用标签" description="Tabs 禁用某一标签"></preview>

## React 用法

```tsx
import { useState } from 'react'
import { Tabs, TabPane } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  const [active, setActive] = useState('first')

  return (
    <Tabs modelValue={active} onChange={setActive}>
      <TabPane name="first" label="用户管理">用户管理的内容</TabPane>
      <TabPane name="second" label="配置管理">配置管理的内容</TabPane>
      <TabPane name="third" label="角色管理">角色管理的内容</TabPane>
    </Tabs>
  )
}

// 卡片风格
<Tabs modelValue={active} type="card" onChange={setActive}>
  <TabPane name="first" label="用户管理">内容一</TabPane>
  <TabPane name="second" label="配置管理">内容二</TabPane>
</Tabs>

// 禁用标签
<TabPane name="disabled" label="已禁用" disabled>不可点击</TabPane>
```

## API

### Tabs 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活的标签页 name | `string \| number` | — |
| type | 标签页风格 | `'line' \| 'card'` | `'line'` |

### Tabs 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签页时触发 | `(name: string \| number) => void` |

### Tabs 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | TabPane 组件 |

---

### TabPane 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标签页唯一标识 | `string \| number` | — |
| label | 标签页标题 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |

### TabPane 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 标签页内容 |
