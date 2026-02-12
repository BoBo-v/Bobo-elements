---
title: Form | Bobo-Element
description: Form 组件的文档
---

# Form 表单

<<<<<<< HEAD
表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 
=======
表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。
>>>>>>> master
使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<preview path="../demo/Form/Basic.vue" title="典型表单" description="Form 典型表单"></preview>

## 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

Form 组件提供了表单验证的功能，只需为 rules 属性传入约定的验证规则，并将 form-Item 的 prop 属性设置为需要验证的特殊键值即可。
更多高级用法可参考 async-validator。

<<<<<<< HEAD
<preview path="../demo/Form/Rules.vue" title="典型表单" description="Form 典型表单"></preview>
=======
<preview path="../demo/Form/Rules.vue" title="表单校验" description="Form 表单校验"></preview>

## API

### Form 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, any>` | — |
| rules | 表单验证规则 | `FormRules` | — |

### Form 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | FormItem 组件 |

### Form 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| validate | 对整个表单进行校验 | `() => Promise<boolean>` |
| resetFields | 重置表单项并移除校验结果 | `() => void` |
| clearValidate | 清除校验结果 | `(props?: string[]) => void` |

---

### FormItem 属性 (Attributes)

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | — |
| prop | 对应 model 中的字段名，用于验证 | `string` | — |

### FormItem 插槽 (Slots)

| 插槽名 | 说明 |
| --- | --- |
| default | 表单输入组件 |
| label | 自定义标签内容 |

### FormItem 方法 (Exposes)

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| validate | 对该表单项进行校验 | `() => Promise<boolean>` |
| resetField | 重置该表单项并移除校验结果 | `() => void` |
| clearValidate | 清除该表单项的校验结果 | `() => void` |
>>>>>>> master
