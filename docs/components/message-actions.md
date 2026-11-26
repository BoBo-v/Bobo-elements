---
title: MessageActions | Bobo-Element
description: MessageActions 消息操作与反馈栏组件
---

# MessageActions 消息操作栏

用于配合 `ChatMessage` 的 `#actions` 插槽，提供复制、重新生成、点赞/点踩、编辑及多版本分支切换。

## 基础用法

<preview path="../demo/MessageActions/Basic.vue" title="基础用法" description="MessageActions 反馈与多版本切换"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 待复制文本 | `string` | `''` |
| copyable | 显示复制按钮 | `boolean` | `true` |
| regenerable | 显示重新生成按钮 | `boolean` | `false` |
| editable | 显示编辑按钮 | `boolean` | `false` |
| feedbackable | 显示点赞/点踩按钮 | `boolean` | `true` |
| branchIndex / branchTotal | 当前分支序号 / 总数 | `number` | `1` / `0` |
