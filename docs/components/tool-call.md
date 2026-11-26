---
title: ToolCall | Bobo-Element
description: ToolCall 工具调用与审批卡片组件
---

# ToolCall 工具调用

用于展示 Agent / MCP 工具调用状态、耗时、入参出参详情及人工确认审批。

## 基础用法

<preview path="../demo/ToolCall/Basic.vue" title="基础用法" description="ToolCall 折叠详情与人工确认"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | `string` | — |
| toolName | 工具标识名 | `string` | — |
| status | 执行状态 | `'pending' \| 'running' \| 'success' \| 'error' \| 'awaiting-approval'` | `'pending'` |
| duration | 耗时（毫秒） | `number` | — |
| args | 输入参数 | `string \| Record<string, unknown>` | — |
| result | 执行结果 | `string \| Record<string, unknown>` | — |
| errorMessage | 错误说明 | `string` | — |
