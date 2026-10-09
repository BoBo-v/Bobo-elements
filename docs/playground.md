# Playground 在线演练

在这里你可以通过在线沙箱直接体验 Bobo-Elements 组件库。

<iframe
  src="https://stackblitz.com/edit/vitejs-vite-vue3?embed=1&file=src%2FApp.vue&terminal=dev"
  style="width: 100%; height: 600px; border: 1px solid var(--vp-c-divider); border-radius: 8px;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## 在线快速创建沙箱

你也可以直接在 StackBlitz 或 CodeSandbox 中创建支持 Bobo-Elements 的前端项目：

- [在 StackBlitz 中打开 Vue3 模板](https://stackblitz.com/edit/vitejs-vite-vue3)
- [在 StackBlitz 中打开 React 模板](https://stackblitz.com/edit/vitejs-vite-react)

### 快速配置指引

1. 打开上方模板后，在终端运行依赖安装：

```bash
npm i @bobocn/element
```

2. 引入组件与样式：

::: code-group
```vue [Vue 3 (App.vue)]
<template>
  <div class="playground-demo">
    <Button type="primary">Hello Bobo-Elements!</Button>
    <Input v-model="value" placeholder="输入些什么..." />
    <Switch v-model="checked" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Switch } from '@bobocn/element/vue'
import '@bobocn/element/style.css'

const value = ref('')
const checked = ref(false)
</script>

<style scoped>
.playground-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  padding: 24px;
}
</style>
```

```tsx [React (App.tsx)]
import React, { useState } from 'react'
import { Button, Input, Switch } from '@bobocn/element/react'
import '@bobocn/element/style.css'

export default function App() {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, padding: 24 }}>
      <Button type="primary">Hello Bobo-Elements!</Button>
      <Input value={value} onChange={setValue} placeholder="输入些什么..." />
      <Switch checked={checked} onChange={setChecked} />
    </div>
  )
}
```
:::
