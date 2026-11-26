---
title: Sources | Bobo-Element
description: Sources RAG 参考来源组件
---

# Sources 参考来源

用于检索增强生成（RAG）回答底部的来源溯源与引用列表展示。

## 基础用法

<preview path="../demo/Sources/Basic.vue" title="基础用法" description="Sources 卡片模式展开参考来源"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 来源条目 | `SourceItem[]` | `[]` |
| title | 标题文案 | `string` | `参考来源 (N)` |
| variant | 展示形态 | `'list' \| 'cards' \| 'compact'` | `'list'` |
| collapsible | 是否支持折叠 | `boolean` | `true` |
| defaultExpanded | 默认是否展开 | `boolean` | `false` |
