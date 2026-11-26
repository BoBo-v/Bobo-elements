---
title: ModelSelector | Bobo-Element
description: ModelSelector AI 模型选择器组件
---

# ModelSelector 模型选择器

专为 AI 模型切换设计的选择器，展示模型名称、上下文窗口、能力标签与描述。

## 基础用法

<preview path="../demo/ModelSelector/Basic.vue" title="基础用法" description="ModelSelector 切换不同 AI 模型"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / value | 当前选中的模型 ID | `string` | — |
| models | 模型选项列表 | `ModelOption[]` | `[]` |
| size | 触发器尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
