---
title: Prompts | Bobo-Element
description: Prompts 推荐提示词组件
---

# Prompts 推荐提示词

用于开屏引导问题或回答后的下一步追问建议。

## 基础用法

<preview path="../demo/Prompts/Basic.vue" title="基础用法" description="Prompts 胶囊模式与选中事件"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 分组标题 | `string` | — |
| items | 提示词条目列表 | `PromptItem[]` | `[]` |
| layout | 排列布局 | `'grid' \| 'horizontal' \| 'vertical'` | `'grid'` |
| variant | 卡片形态 | `'card' \| 'pill'` | `'card'` |
| wrap | 是否自动换行 | `boolean` | `true` |
