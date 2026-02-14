
# Bobo-Elements 开始使用

Bobo-Elements 是一套基于 TypeScript 的 UI 组件库，同时支持 **Vue3** 和 **React** 双框架。通过子路径导出，Vue 和 React 代码互不干扰，按需选择你所使用的框架即可。

## 安装

```bash
npm i @bobocn/element --save
```


或使用 yarn：

```bash
yarn add @bobocn/element
```

## 按需引入

### Vue 用户

使用 `<script setup>` 写法（推荐）：

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
  <vk-input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const value = ref('')
</script>
```

使用 Options API 写法：

```vue
<template>
  <vk-button>我是 VkButton</vk-button>
</template>

<script>
import { Button } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

export default {
  components: { Button },
}
</script>
```

### React 用户

```tsx
import { Button, Input } from '@bobocn/element/react'
import '@bobocn/element/style.css'

function App() {
  return (
    <div>
      <Button type="primary">按钮</Button>
      <Input placeholder="请输入" />
    </div>
  )
}
```

## CDN 使用

你可以通过 CDN 的方式直接在 HTML 文件中使用 Bobo-Elements。

### Vue 版本

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/@bobocn/element/dist/index.css" />
</head>
<body>
  <div id="app">
    <vk-button type="primary">按钮</vk-button>
  </div>

  <!-- 引入 Vue3 -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <!-- 引入 Bobo-Elements Vue 版 -->
  <script src="https://unpkg.com/@bobocn/element/dist/vue/index.umd.cjs"></script>
  <script>
    const app = Vue.createApp({})
    app.mount('#app')
  </script>
</body>
```

### React 版本

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/@bobocn/element/dist/index.css" />
</head>
<body>
  <div id="root"></div>

  <!-- 引入 React -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <!-- 引入 Bobo-Elements React 版 -->
  <script src="https://unpkg.com/@bobocn/element/dist/react/index.umd.cjs"></script>
</body>
```

## 浏览器兼容性

Bobo-Elements 支持所有现代浏览器：

| 浏览器 | 支持版本 |
| --- | --- |
| Chrome | 最近两个版本 |
| Firefox | 最近两个版本 |
| Safari | 最近两个版本 |
| Edge | 最近两个版本 |
| IE | 不支持 |

::: tip
Vue3 不再支持 IE11，因此 Bobo-Elements 也不支持 IE11 及更早版本。
:::
