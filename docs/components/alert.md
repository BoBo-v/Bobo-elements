---

title: Button | Bobo-Element

description: Alert 提示
---

# Alert 提示
用于页面中展示重要的提示信息。

## 基础用法
Alert 组件提供四种类型，由 type 属性指定，为 success | warning | danger | info，默认值为 info。
<preview path="../demo/Alert/Basic.vue" title="基础用法" description="Alert 组件的基础用法"></preview>

## React 用法

```tsx
import { Alert } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  return (
    <div>
      <Alert type="success">成功提示</Alert>
      <Alert type="warning">警告提示</Alert>
      <Alert type="danger">错误提示</Alert>
      <Alert type="info">信息提示</Alert>
    </div>
  )
}

// 可关闭
<Alert type="success" closable onClose={() => console.log('closed')}>
  可关闭的提示
</Alert>

// 通过 ref 手动隐藏
import { useRef } from 'react'
import type { AlertRef } from '@bobocn/element/react'

const alertRef = useRef<AlertRef>(null)
<Alert ref={alertRef} type="info">提示内容</Alert>
alertRef.current?.hide()
```

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
