---

title: Button | Bobo-Element

description: Alert 提示
---

# Alert 提示
用于页面中展示重要的提示信息。

## 基础用法
Alert 组件提供四种类型，由 type 属性指定，为 success | warning | danger | info，默认值为 info。
<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert 组件的基础用法"></preview>

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | Alert 类型 | `'success' \| 'warning' \| 'danger' \| 'info'` | info |
| content | 提示内容 | `string` | — |
| effect | 主题样式 | `'light' \| 'dark'` | light |
| closable | 是否可关闭 | `boolean` | true |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭时触发 | `() => void` |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | Alert 内容 |

### 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| hide | 隐藏 Alert | `() => void` |
