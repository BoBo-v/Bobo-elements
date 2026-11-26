export interface MarkdownRendererProps {
  content?: string
  breaks?: boolean
  /** 流式输出容错模式：自动闭合未结束的代码块、行内代码与加粗标记 */
  streaming?: boolean
  /** 是否为渲染出的代码块提供内置复制按钮与头部栏 */
  codeCopyable?: boolean
  codeCopyText?: string
  codeCopiedText?: string
}
