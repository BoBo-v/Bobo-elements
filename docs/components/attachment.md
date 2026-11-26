---
title: Attachment | Bobo-Element
description: Attachment 多模态附件卡片组件
---

# Attachment 附件卡片

用于 `PromptInput` 待发送文件预览与 `ChatMessage` 历史附件展示，支持图片缩略图、上传进度与失败重试。

## 基础用法

<preview path="../demo/Attachment/Basic.vue" title="基础用法" description="展示完成、上传中与失败态附件"></preview>

## API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 附件列表 | `AttachmentItem[]` | `[]` |
| layout | 布局方式 | `'horizontal' \| 'grid'` | `'horizontal'` |
| removable | 是否显示移除按钮 | `boolean` | `true` |
| clickable | 卡片是否可点击 | `boolean` | `false` |
