---
title: Button | Bobo-Element
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮。



## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/BasicTop.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态
使用 disabled 属性来定义按钮是否被禁用

<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button 组件禁用状态"></preview>

## 图标按钮
使用 icon 属性来为按钮添加图标。图标名称请看 fontawesome 官网 https://fontawesome.com/icons
<preview path="../demo/Button/Selecticon.vue" title="图标按钮" description="Button 图标按钮"></preview>

## 加载状态按钮
通过设置 loading 属性为 true 来显示正在加载的状态。
<preview path="../demo/Button/Loadings.vue" title="加载状态" description="Button 加载状态"></preview>

## 不同大小的按钮
通过设置 size 属性为 small | large 来调整图标的大小。
<preview path="../demo/Button/Sizes.vue" title="不同大小" description="Button 不同大小"></preview>

## React 用法

```tsx
import { Button } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  return (
    <div>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button type="info">信息按钮</Button>
    </div>
  )
}

// 禁用状态
<Button type="primary" disabled>禁用按钮</Button>

// 图标按钮
<Button type="primary" icon="search">搜索</Button>

// 加载状态
<Button type="primary" loading>加载中</Button>
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 按钮尺寸 | `'large' \| 'small'` | — |
| type | 按钮类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| plain | 是否为朴素按钮 | `boolean` | false |
| round | 是否为圆角按钮 | `boolean` | false |
| circle | 是否为圆形按钮 | `boolean` | false |
| loading | 是否为加载中状态 | `boolean` | false |
| disabled | 是否禁用 | `boolean` | false |
| icon | 图标名称 | `string` | — |
| autofocus | 同原生 `autofocus` | `boolean` | false |
| native-type | 同原生 `type` | `'button' \| 'submit' \| 'reset'` | button |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

### 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 原生按钮元素引用 | `Ref<HTMLButtonElement>` |

