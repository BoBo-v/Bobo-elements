## Bobo-element

**Bobo-element** — Vue3 + React 双框架 UI 组件库，使用 TypeScript 开发，提供完整的类型定义。

### 安装

```bash
npm i @bobocn/element --save
```

### 演示网站
www.bobocn.bond/

### 开始使用

**Vue 用户**

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
</template>

<script setup lang="ts">
import { Button } from '@bobocn/element/vue'
import '@bobocn/element/style.css'
</script>
```

**React 用户**

```tsx
import { Button } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return <Button type="primary">按钮</Button>
}
```
