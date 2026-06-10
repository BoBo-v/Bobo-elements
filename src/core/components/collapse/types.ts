import type { InjectionKey, Ref } from 'vue'
import type { ReactNode } from 'react';

export type NameType = string | number

export interface CollapseProps {
    modelValue: NameType[]
    accordion?: boolean
    onChange?: (names: NameType[]) => void
    children?: ReactNode
}

export interface CollapseItemProps {
    name: NameType
    title?: ReactNode
    disabled?: boolean
    children?: ReactNode
}

export interface CollapseContext {
    activeNames: NameType[] | Ref<NameType[]>
    handleItemClick: (name: NameType) => void
}

export interface CollapseEmits {
    (e: 'update:modelValue', values: NameType[]): void
    (e: 'change', values: NameType[]): void
}

export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')
