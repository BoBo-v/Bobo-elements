---
title: Dropdown | Bobo-Element
description: Dropdown 下拉菜单
---

# Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

## 基础用法
悬停在下拉菜单上以展开更多操作。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>


## 触发方式
可以配置点击激活或者悬停激活。

将 trigger 属性设置为 click 即可， 默认为 hover。

<preview path="../demo/Dropdown/trigger.vue" title="触发方式" description="Dropdown 触发方式"></preview>

## 手动打开关闭
将 manual 属性设置为 true 即可， 然后可以使用实例上面的 show 和 hide 方法打开关闭下拉菜单。
<preview path="../demo/Dropdown/manual.vue" title="手动打开关闭" description="Dropdown 手动打开关闭"></preview>

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menuOptions | 菜单选项 | `MenuOption[]` | [] |
| hideAfterClick | 点击菜单项后是否隐藏 | `boolean` | true |
| trigger | 触发方式 | `'hover' \| 'click'` | hover |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | bottom |
| manual | 是否手动控制 | `boolean` | false |
| popperOptions | Popper.js 配置项 | `object` | — |
| openDelay | 打开延迟（毫秒） | `number` | 0 |
| closeDelay | 关闭延迟（毫秒） | `number` | 200 |
| transition | 过渡动画名 | `string` | — |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| visible-change | 下拉菜单显示/隐藏时触发 | `(visible: boolean) => void` |
| select | 选择菜单项时触发 | `(item: MenuOption) => void` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 触发下拉菜单的元素 |
| content | 自定义下拉菜单内容 |

### 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| show | 手动显示下拉菜单 | `() => void` |
| hide | 手动隐藏下拉菜单 | `() => void` |
