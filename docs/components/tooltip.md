---
title: Tooltip | Bobo-Element
description: Tooltip 文字提示
---

# Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

## 基本用法
使用 content 属性来决定 hover 时的提示信息。

<preview path="../demo/Tooltip/Basic.vue" title="基本用法" description="Tooltip 基础用例"></preview>

## 不同位置
由 placement 属性决定展示效果： placement属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。
<preview path="../demo/Tooltip/placement.vue" title="不同位置" description="Tooltip 不同位置"></preview>

## 触发方式
由 trigger 属性决定触发方式： hover | click, 默认为 hover
<preview path="../demo/Tooltip/trigger.vue" title="触发方式" description="Tooltip 触发方式"></preview>


## 更多内容的文字提示
展示多行文本或者是设置文本内容的格式

用具名 slot content，替代tooltip中的content属性。

<preview path="../demo/Tooltip/All.vue" title="更多内容" description="Tooltip 更多内容"></preview>

## 手动触发
将 manual 属性设置为 true 即可， 然后可以使用实例上面的 show 和 hide 方法打开关闭下拉菜单。
<preview path="../demo/Tooltip/manual.vue" title="手动触发" description="Tooltip 手动触发"></preview>

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 显示的内容 | `string` | — |
| trigger | 触发方式 | `'hover' \| 'click'` | hover |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | bottom |
| manual | 是否手动控制 | `boolean` | false |
| popperOptions | Popper.js 配置项 | `object` | — |
| transition | 过渡动画名 | `string` | — |
| openDelay | 打开延迟（毫秒） | `number` | 0 |
| closeDelay | 关闭延迟（毫秒） | `number` | 200 |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | Tooltip 显示/隐藏时触发 | `(visible: boolean) => void` |
| click-outside | 点击 Tooltip 外部时触发 | `() => void` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 触发 Tooltip 的元素 |
| content | 自定义 Tooltip 内容 |

### 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| show | 手动显示 Tooltip | `() => void` |
| hide | 手动隐藏 Tooltip | `() => void` |
