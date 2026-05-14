---
title: Modal | Bobo-Element
description: Modal 对话框
---

# Modal 对话框
在保留当前页面状态的情况下，弹出一个对话框来承载用户操作。

## 基础用法
通过 `v-model` 控制弹窗的显示与隐藏，`title` 设置标题。

<preview path="../demo/Modal/Basic.vue" title="基础用法" description="Modal 组件的基础用法"></preview>

## 无底部按钮
设置 `show-footer` 为 `false` 可隐藏底部按钮区域。

<preview path="../demo/Modal/NoFooter.vue" title="无底部按钮" description="Modal 无底部按钮"></preview>

## 自定义底部
通过 `footer` 插槽可以自定义底部内容。

<preview path="../demo/Modal/CustomFooter.vue" title="自定义底部" description="Modal 自定义底部内容"></preview>

## React 用法

```tsx
import { useState } from 'react'
import { Modal } from '@bobocn/element/react'
import '@bobocn/element/style.css'

// 基础用法
function App() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>打开弹窗</button>
      <Modal
        visible={visible}
        title="基础弹窗"
        onClose={() => setVisible(false)}
        onConfirm={() => {
          console.log('确认')
          setVisible(false)
        }}
      >
        <p>这是一段弹窗内容。</p>
      </Modal>
    </>
  )
}

// 自定义底部
<Modal
  visible={visible}
  title="自定义底部"
  onClose={() => setVisible(false)}
  footer={<button onClick={() => setVisible(false)}>我知道了</button>}
>
  <p>自定义底部内容。</p>
</Modal>
```

## API

### 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 是否显示弹窗 | `boolean` | — |
| title | 弹窗标题 | `string` | — |
| width | 弹窗宽度 | `string` | `'520px'` |
| top | 弹窗距顶部距离 | `string` | `'15vh'` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| maskClosable | 点击遮罩层是否关闭 | `boolean` | `true` |
| showFooter | 是否显示底部按钮区域 | `boolean` | `true` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 弹窗打开时触发 | — |
| close | 弹窗关闭时触发 | — |
| confirm | 点击确定按钮时触发 | — |
| cancel | 点击取消按钮时触发 | — |

### 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 弹窗内容 |
| title | 自定义标题 |
| footer | 自定义底部内容 |
