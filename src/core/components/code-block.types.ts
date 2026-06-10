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
}
