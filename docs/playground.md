# Playground 在线编辑

在这里你可以在线体验 Bobo-Elements 组件库。

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-vue3?embed=1&file=src%2FApp.vue&terminal=dev"
  style="width: 100%; height: 600px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## 组件快速体验

你也可以直接打开以下链接，在 StackBlitz 中创建一个使用 Bobo-Elements 的项目：

- [在 StackBlitz 中打开](https://stackblitz.com/edit/vitejs-vite-vue3) - 基于 Vue3 + Vite 的模板项目

### 使用步骤

1. 打开上方链接或 iframe 编辑器
2. 在终端中安装 Bobo-Elements：

```bash
npm i @bobocn/element
```

3. 在 `src/main.ts` 中引入：

```ts
import VElement from '@bobocn/element'
import '@bobocn/element/dist/index.css'

app.use(VElement)
```

4. 在 `src/App.vue` 中使用组件：

```vue
<template>
  <vk-button type="primary">Hello Bobo-Elements!</vk-button>
  <vk-input v-model="value" placeholder="输入些什么..." />
  <vk-switch v-model="checked" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const checked = ref(false)
</script>
```
