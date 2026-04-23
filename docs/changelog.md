# 更新日志

## v1.2.0

_2026-04-23_

### 工具链升级

- **TypeScript** 4.7 → 5.7，支持 `satisfies`、`const` 类型参数、装饰器等新特性
- **Vite** 4.x → 6.x，基于 Rollup 4 的构建引擎，显著提升构建速度
- **Vitest** 0.29 → 3.x，测试框架全面升级，支持更丰富的测试 API
- **@vitejs/plugin-vue** 4.x → 5.x
- **@vitejs/plugin-vue-jsx** 3.x → 4.x
- **@vitejs/plugin-react** 3.x → 4.x
- **vite-plugin-dts** 3.x → 4.x
- **vue-tsc** 1.x → 2.x

### Vue 组件补齐

Vue 侧新增以下组件，与 React 侧完全对等：

- **Input 输入框** — 支持 clearable、showPassword、textarea 模式、prepend/append/prefix/suffix 插槽
- **Switch 开关** — 支持 activeText/inactiveText、size 变体、自定义 activeValue/inactiveValue
- **Form 表单** — 基于 provide/inject 的表单上下文管理，暴露 validate / resetFields / clearValidate
- **FormItem 表单项** — 集成 async-validator 校验引擎，支持 required 标记、error/success 状态
- **Select 选择器** — 键盘导航（ArrowUp/Down/Enter/Escape）、filterable 筛选、remote 远程搜索、clearable
- **Message 消息提示** — 组件 + `createMessage()` 命令式 API，支持多实例堆叠定位、自动关闭
- **Notification 通知** — 组件 + `createNotification()` 命令式 API，支持 title、icon、类型图标映射
- **Tooltip 文字提示** — 补全之前的空壳实现，支持 Popper.js 定位、hover/click 触发、延迟控制

### 修复

- 修复 Dropdown 组件引用不存在的 core 文件导致构建失败的问题
- 修复 VitePress 文档配置中引用已移除插件的问题

### 清理

- 移除 `unplugin-vue-macros` —— `defineOptions` 已内置于 Vue 3.3+，无需额外插件
- 移除 `@vue-macros/volar` —— 同上
- 移除 `vite-plugin-eslint` —— 已停止维护，不兼容 Vite 6
- 移除 `@vue/tsconfig` —— 旧版使用已废弃的 TS 选项，改为独立 tsconfig 配置
- 移除 `jest-environment-jsdom` —— Vitest 自带 jsdom 支持
- tsconfig 迁移：`preserveValueImports` + `importsNotUsedAsValues` → `verbatimModuleSyntax`
- tsconfig 迁移：`moduleResolution: "Node"` → `"bundler"`

---

## v1.1.0

_2025-12-20_

### 新增

- 新增 React 组件支持（Button、Collapse、Alert、Icon、Tooltip、Dropdown 等）
- 支持子路径导出：`@bobocn/element/vue` 和 `@bobocn/element/react`
- 样式统一通过 `@bobocn/element/style.css` 引入

### 变更

- 重构打包方案：Vue 和 React 独立打包，互不干扰
- 框架依赖（vue、react）改为可选 peerDependencies，按需安装
- 移除全局注册（`app.use()`）方式，改为按需引入

---

## v1.0.2

_2025-10-15_

### 新增

- Select 组件新增远程搜索功能（`remote` / `remote-method`）
- Select 组件新增自定义渲染（`renderLabel`）
- Input 组件新增复合型输入框（prepend / append 插槽）

### 修复

- 修复 Message 组件 offset 计算偏移问题
- 修复 Tooltip 在手动模式下快速切换导致的闪烁
- 修复 Switch 组件自定义 value 类型时绑定值异常

### 优化

- 优化 Dropdown 组件动画过渡效果
- 优化 Form 表单校验错误信息展示

---

## v1.0.1

_2024-06-05_

### 新增

- 新增 Notification 通知组件
- 新增 Alert 提示组件
- Dropdown 组件新增手动控制模式（`manual`）
- Tooltip 组件新增 `click-outside` 事件

### 修复

- 修复 Collapse 手风琴模式下展开异常
- 修复 Button 组件 loading 状态下仍可点击的问题
- 修复 Input 密码框切换时光标位置重置

### 优化

- 优化 Message 组件的层级管理
- 优化组件库整体 TypeScript 类型导出

---

## v1.0.0

_2024-01-20_

### 新增

- 发布 Bobo-Elements 组件库首个正式版本
- 支持 Button 按钮组件（type / size / plain / round / circle / loading / disabled / icon）
- 支持 Form 表单组件（model / rules / validate / resetFields）
- 支持 FormItem 表单项组件（label / prop / 校验）
- 支持 Input 输入框组件（text / textarea / password / clearable / size）
- 支持 Select 选择器组件（options / clearable / filterable）
- 支持 Switch 开关组件（activeValue / inactiveValue / size / disabled）
- 支持 Collapse 折叠面板组件（accordion / modelValue）
- 支持 Tooltip 文字提示组件（trigger / placement / content）
- 支持 Dropdown 下拉菜单组件（menuOptions / trigger / placement）
- 支持 Message 消息提示组件（type / duration / showClose / closeAll）
- 支持全局注册和按需引入（Tree Shaking）
- 基于 Vue3 Composition API + TypeScript 开发
- 提供完整的类型定义文件
