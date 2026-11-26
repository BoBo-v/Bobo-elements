export interface CodeBlockProps {
  code?: string
  language?: string
  showLineNumbers?: boolean
  copyable?: boolean
  maxHeight?: string
  scrollable?: boolean
  wrap?: boolean
  theme?: 'dark' | 'light'
  highlightLines?: number[]
  title?: string
  copyText?: string
  copiedText?: string
  /** 自定义语法高亮函数，返回高亮后的 HTML（按行或完整片段） */
  highlighter?: (code: string, language: string) => string
  /** 是否允许在头部切换自动换行 */
  showWrapToggle?: boolean
  /** 是否允许折叠长代码块 */
  collapsible?: boolean
  /** 初始是否折叠 */
  defaultCollapsed?: boolean
  wrapText?: string
  unwrapText?: string
  expandText?: string
  collapseText?: string
}
