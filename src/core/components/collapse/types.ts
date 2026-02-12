import type {InjectionKey} from "vue";
import type {CollapseContext} from "@/components/Collapse";

export type NameType = string | number

export interface CollapseProps {
    modelValue: NameType[]
    accordion?: boolean
}

export interface CollapseItemProps {
    name: NameType
    title?: string
    disabled?: boolean
}

export interface CollapseEmits {
    (e: 'update:modelValue', values: NameType[]): void
    (e: 'change', values: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
// 注意：Vue 特有的 InjectionKey 不应在 core 内
// Vue 相关的 key 移到 vue 层的 types 或 Collapse.vue 内部定义
