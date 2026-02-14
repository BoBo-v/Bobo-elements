---
title: Collapse | Bobo-Element

description: Collapse 折叠面板
---

# Collapse 折叠面板
通过折叠面板收纳内容区域

## 基础用法
可同时展开多个面板，面板之间不影响
<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴效果
每次只能展开一个面板

通过 accordion 属性来设置是否以手风琴模式显示。
<preview path="../demo/Collapse/accordion.vue" title="手风琴效果" description="Collapse 手风琴效果"></preview>

## React 用法

```tsx
import { useState } from 'react'
import { Collapse, CollapseItem } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  const [activeNames, setActiveNames] = useState(['1'])

  return (
    <Collapse
      modelValue={activeNames}
      onChange={(val) => setActiveNames(val)}
    >
      <CollapseItem name="1" title="面板一">
        内容一
      </CollapseItem>
      <CollapseItem name="2" title="面板二">
        内容二
      </CollapseItem>
      <CollapseItem name="3" title="面板三" disabled>
        内容三（禁用）
      </CollapseItem>
    </Collapse>
  )
}

// 手风琴模式
<Collapse modelValue={activeNames} accordion onChange={setActiveNames}>
  <CollapseItem name="1" title="面板一">内容一</CollapseItem>
  <CollapseItem name="2" title="面板二">内容二</CollapseItem>
</Collapse>
```

## API

### Collapse 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活的面板 | `string[]` | — |
| accordion | 是否手风琴模式 | `boolean` | false |

### Collapse 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 激活面板改变时触发 | `(value: string[]) => void` |
| change | 激活面板改变时触发 | `(value: string[]) => void` |

### Collapse 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | CollapseItem 组件 |

---

### CollapseItem 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 面板唯一标识 | `string` | — |
| title | 面板标题 | `string` | — |
| disabled | 是否禁用 | `boolean` | false |

### CollapseItem 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 面板内容 |
| title | 自定义标题内容 |
