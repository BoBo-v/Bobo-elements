## Bobo-element

**Bobo-element**组件库，使用最新的 Vue3.3 和 TS，为了提高自己的 Vue 和 typescript 水平

### 安装


```bash
npm i @bobocn/element --save
```

### 演示网站
https://static-mp-ce1f918a-35f0-4886-9b3a-99f72513a4a4.next.bspapp.com/

### 开始使用

**全局使用**


```js
// 引入所有组件
import VElement from '@bobocn/element'
// 引入样式
import '@bobocn/element/dist/index.css'

import App from './App.vue'
// 全局使用
createApp(App).use(VElement).mount('#app')
```

```vue
<template>
  <vk-button>我是 VkButton</vk-button>
</template>
```

**单个导入**

Bobo-Elements 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。


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

