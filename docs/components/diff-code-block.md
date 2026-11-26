---
title: DiffCodeBlock | Bobo-Element
description: DiffCodeBlock 代码差异对比组件
---

# DiffCodeBlock 代码对比

面向 AI 代码助手的变更审查组件，自动计算行级增删差异并支持应用/忽略回调。

## 基础用法

<preview path="../demo/DiffCodeBlock/Basic.vue" title="基础用法" description="DiffCodeBlock 行级差异对比"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| oldCode | 修改前代码 | `string` | `''` |
| newCode | 修改后代码 | `string` | `''` |
| title | 标题 / 文件名 | `string` | `''` |
| theme | 主题 | `'dark' \| 'light'` | `'dark'` |
| actionable | 是否显示应用/忽略按钮 | `boolean` | `false` |
