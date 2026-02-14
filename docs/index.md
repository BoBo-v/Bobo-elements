---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:

  name: "Bobo-elements"
  text: "Vue3 + React 组件库"
  tagline: 基于 TypeScript 构建，支持 Vue3 和 React 双框架子路径导出，轻量高效，开箱即用
  actions:
    - theme: brand
      text: 快速开始
      link: /Shiyong
    - theme: alt
      text: 浏览组件
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/BoBo-v/Bobo-elements.git

features:
  - icon: "\U0001F680"
    title: Vue3 + React 双框架支持
    details: 同时支持 Vue3 和 React，通过子路径导出（@bobocn/element/vue、@bobocn/element/react）按需选择框架，互不干扰。
  - icon: "\U0001F3A8"
    title: 丰富的组件
    details: 涵盖 Button、Form、Input、Select、Switch 等 11 个常用组件，覆盖表单、数据展示、反馈等场景。
  - icon: "\U0001F4E6"
    title: 子路径导出，互不干扰
    details: Vue 和 React 独立打包，各自 Tree Shaking，不会引入另一个框架的代码，有效减小打包体积。
  - icon: "\U0001F527"
    title: 表单验证
    details: 内置 Form 表单组件，集成 async-validator，轻松实现复杂表单校验逻辑。
  - icon: "\U0001F4AC"
    title: 反馈组件
    details: 提供 Message、Notification、Alert 等反馈组件，支持多种类型、自动关闭和手动控制。
  - icon: "\U0001F9E9"
    title: 数据展示
    details: Collapse 折叠面板、Tooltip 文字提示、Dropdown 下拉菜单，灵活展示内容与交互。
---
