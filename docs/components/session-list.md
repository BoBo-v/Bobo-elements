---
title: SessionList | Bobo-Element
description: SessionList 多会话历史列表组件
---

# SessionList 会话历史

用于管理多个 AI 历史会话，支持时间自动分组、搜索过滤、置顶、重命名与删除。

## 基础用法

<preview path="../demo/SessionList/Basic.vue" title="基础用法" description="SessionList 历史会话侧边栏"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 会话列表 | `SessionItem[]` | `[]` |
| activeId | 当前选中会话 ID | `string` | — |
| searchable | 是否显示搜索框 | `boolean` | `false` |
| creatable | 是否显示新建按钮 | `boolean` | `true` |
| groupByTime | 是否按时间自动分组 | `boolean` | `true` |
