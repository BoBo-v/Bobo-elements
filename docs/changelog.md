# 更新日志

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
