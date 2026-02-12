<<<<<<< HEAD
# Bobo-Element 开始使用
基于Vue 和 typescript，组件项目

## 安装
=======
# Bobo-Elements 开始使用

Bobo-Elements 是一套基于 Vue3 和 TypeScript 的企业级 UI 组件库，提供了 Button、Form、Input、Select、Switch、Collapse、Tooltip、Dropdown、Message、Notification、Alert 等常用组件，帮助开发者快速构建高质量的 Web 应用。

## 安装

>>>>>>> master
```bash
npm i @bobocn/element --save
```

<<<<<<< HEAD
## 开始使用
全局使用
```js
=======
或使用 yarn：

```bash
yarn add @bobocn/element
```

## 全局使用

```js
import { createApp } from 'vue'
>>>>>>> master
// 引入所有组件
import VElement from '@bobocn/element'
// 引入样式
import '@bobocn/element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(VElement).mount('#app')
```
<<<<<<< HEAD
=======

>>>>>>> master
```vue
<template>
  <vk-button>我是 VkButton</vk-button>
</template>
```
<<<<<<< HEAD
单个导入
V Element 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。
```vue
<template>
  <Button>我是 VkButton</Button>
</template>
<script>
  import { Button } from ' @bobocn/element'
  export default {
    components: { Button },
  }
</script>
```
=======

## 按需引入

Bobo-Elements 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

使用 `<script setup>` 写法（推荐）：

```vue
<template>
  <vk-button type="primary">按钮</vk-button>
  <vk-input v-model="value" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input } from '@bobocn/element'
import '@bobocn/element/dist/index.css'

const value = ref('')
</script>
```

使用 Options API 写法：

```vue
<template>
  <vk-button>我是 VkButton</vk-button>
</template>

<script>
import { Button } from '@bobocn/element'
import '@bobocn/element/dist/index.css'

export default {
  components: { Button },
}
</script>
```

## CDN 使用

你可以通过 CDN 的方式直接在 HTML 文件中使用 Bobo-Elements：

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
  <!-- 引入 Bobo-Elements -->
  <script src="https://unpkg.com/@bobocn/element"></script>
  <script>
    const app = Vue.createApp({})
    app.use(VElement)
    app.mount('#app')
  </script>
</body>
```

## 浏览器兼容性

Bobo-Elements 基于 Vue3 开发，支持所有现代浏览器：

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
>>>>>>> master
