import type { VNode, ComponentInternalInstance } from 'vue'
export interface NotificationProps {
    title: string;
    message?: string | VNode;
    duration?: number;
    showClose?: boolean;
    type?: 'success'| 'info'| 'warning'| 'danger';
    onDestory: () => void;
    id: string;
    zIndex: number;
    offset?: number;
    transitionName?: string;
    icon?: string;
}
export interface NotificationContext {
    id: string;
    vnode: VNode;
    vm: ComponentInternalInstance;
    props: NotificationProps;
    destory: () => void;
}
export type CreateNotificationProps = Omit<NotificationProps, 'onDestory' | 'id' | 'zIndex'>
