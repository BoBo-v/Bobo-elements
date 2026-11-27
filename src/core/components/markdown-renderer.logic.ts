import MarkdownIt from 'markdown-it'
import { highlightCode } from './code-block.logic'

export interface ParseMarkdownOptions {
  breaks?: boolean
  streaming?: boolean
  codeCopyable?: boolean
  codeCopyText?: string
}

function sanitizeUrl(rawUrl: string): string {
  const url = rawUrl.trim()
  // eslint-disable-next-line no-control-regex
  const lower = url.replace(/[\u0000-\u001F\u007F\s]+/g, '').toLowerCase()
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../') ||
    lower.startsWith('#')
  ) {
    return url
  }
  return '#'
}

function sanitizeImageUrl(rawUrl: string): string {
  const url = rawUrl.trim()
  // eslint-disable-next-line no-control-regex
  const lower = url.replace(/[\u0000-\u001F\u007F\s]+/g, '').toLowerCase()
  // 显式拦截 SVG data URL，防止内嵌脚本执行
  if (lower.startsWith('data:image/svg')) {
    return ''
  }
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../')
  ) {
    return url
  }
  // 仅放行安全的光栅图片 data URL
  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(lower)) {
    return url
  }
  return ''
}

/**
 * 流式输出容错补全：在 Markdown 尚未吐完时自动闭合未成对的围栏代码块、行内代码与加粗标记，
 * 避免半截语法导致渲染闪烁或整段误判为纯文本。
 */
export function repairStreamingMarkdown(md: string): string {
  if (!md) return md
  let result = md

  // 检测围栏代码块（``` 或 ~~~）是否处于未闭合状态
  const lines = result.split('\n')
  let activeFence: string | null = null
  for (const line of lines) {
    const trimmed = line.trimStart()
    const fenceMatch = trimmed.match(/^(```+|~~~+)/)
    if (fenceMatch) {
      const marker = fenceMatch[1][0]
      if (!activeFence) {
        activeFence = fenceMatch[1]
      } else if (trimmed.startsWith(marker.repeat(activeFence.length))) {
        activeFence = null
      }
    }
  }
  if (activeFence) {
    return `${result}\n${activeFence}`
  }

  // 若未处于围栏代码块中，检查末尾未闭合的行内反引号与加粗标记
  const withoutEscapes = result.replace(/\\./g, '')
  const inlineCodeTicks = (withoutEscapes.match(/`/g) || []).length
  if (inlineCodeTicks % 2 === 1) {
    result += '`'
  } else {
    const boldMarkers = (withoutEscapes.match(/\*\*/g) || []).length
    if (boldMarkers % 2 === 1) {
      result += '**'
    }
  }

  return result
}

function createMarkdownParser(breaks: boolean, codeCopyable: boolean, codeCopyText: string): MarkdownIt {
  const md = new MarkdownIt({
    html: false, // 严格禁用原生 HTML，防范 XSS
    xhtmlOut: true,
    breaks,
    langPrefix: 'vk-md-lang-',
    linkify: false,
    typographer: false
  })

  // 放行自定义规则对所有 URL 进行安全校验与清洗
  md.validateLink = () => true

  md.renderer.rules.heading_open = (tokens, idx) => {
    const level = tokens[idx].tag
    return `<${level} class="vk-md-${level}">`
  }

  md.renderer.rules.paragraph_open = () => '<p class="vk-md-p">'
  md.renderer.rules.bullet_list_open = () => '<ul class="vk-md-ul">\n'
  md.renderer.rules.ordered_list_open = (tokens, idx) => {
    const token = tokens[idx]
    const start = token.attrGet('start')
    const startAttr = start ? ` start="${start}"` : ''
    return `<ol class="vk-md-ol"${startAttr}>\n`
  }
  md.renderer.rules.list_item_open = () => '<li class="vk-md-li">'
  md.renderer.rules.blockquote_open = () => '<blockquote class="vk-md-blockquote">\n'
  md.renderer.rules.hr = () => '<hr class="vk-md-hr" />\n'

  md.renderer.rules.strong_open = () => '<strong class="vk-md-bold">'
  md.renderer.rules.strong_close = () => '</strong>'
  md.renderer.rules.em_open = () => '<em class="vk-md-italic">'
  md.renderer.rules.em_close = () => '</em>'
  md.renderer.rules.s_open = () => '<del class="vk-md-del">'
  md.renderer.rules.s_close = () => '</del>'

  md.renderer.rules.code_inline = (tokens, idx) => {
    return `<code class="vk-md-inline-code">${md.utils.escapeHtml(tokens[idx].content)}</code>`
  }

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
    const langName = info ? info.split(/\s+/)[0] : ''
    const safeLang = md.utils.escapeHtml(langName)
    const langClass = safeLang ? ` vk-md-lang-${safeLang}` : ''
    const rawCode = token.content.replace(/\n$/, '')
    const highlighted = highlightCode(rawCode, langName)

    if (!codeCopyable) {
      return `<pre class="vk-md-pre"><code class="vk-md-code${langClass}">${highlighted}</code></pre>\n`
    }

    const encodedCode = encodeURIComponent(rawCode)
    const labelHtml = safeLang ? `<span class="vk-md-code-lang">${safeLang}</span>` : '<span />'
    const btnHtml = `<button type="button" class="vk-md-code-copy" data-md-copy="${encodedCode}" aria-label="${md.utils.escapeHtml(codeCopyText)}">${md.utils.escapeHtml(codeCopyText)}</button>`
    return (
      `<div class="vk-md-code-block">` +
      `<div class="vk-md-code-header">${labelHtml}${btnHtml}</div>` +
      `<pre class="vk-md-pre"><code class="vk-md-code${langClass}">${highlighted}</code></pre>` +
      `</div>\n`
    )
  }

  md.renderer.rules.code_block = (tokens, idx) => {
    const token = tokens[idx]
    const code = md.utils.escapeHtml(token.content.trim())
    return `<pre class="vk-md-pre"><code class="vk-md-code">${code}</code></pre>\n`
  }

  md.renderer.rules.link_open = (tokens, idx) => {
    const token = tokens[idx]
    const rawHref = token.attrGet('href') || ''
    const safeHref = sanitizeUrl(rawHref)
    return `<a class="vk-md-link" href="${md.utils.escapeHtml(safeHref)}" target="_blank" rel="noopener noreferrer">`
  }

  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx]
    const rawSrc = token.attrGet('src') || ''
    const alt = token.content || ''
    const safeSrc = sanitizeImageUrl(rawSrc)
    if (!safeSrc) {
      return md.utils.escapeHtml(alt)
    }
    return `<img class="vk-md-img" src="${md.utils.escapeHtml(safeSrc)}" alt="${md.utils.escapeHtml(alt)}" />`
  }

  md.renderer.rules.table_open = () => '<div class="vk-md-table-wrap"><table class="vk-md-table">\n'
  md.renderer.rules.table_close = () => '</table></div>\n'
  md.renderer.rules.th_open = () => '<th class="vk-md-th">'
  md.renderer.rules.td_open = () => '<td class="vk-md-td">'
  md.renderer.rules.tr_open = () => '<tr class="vk-md-tr">'

  return md
}

const parserCache = new Map<string, MarkdownIt>()

function getMarkdownParser(breaks: boolean, codeCopyable: boolean, codeCopyText: string): MarkdownIt {
  const key = `${breaks}:${codeCopyable}:${codeCopyText}`
  let parser = parserCache.get(key)
  if (!parser) {
    parser = createMarkdownParser(breaks, codeCopyable, codeCopyText)
    parserCache.set(key, parser)
  }
  return parser
}

export function parseMarkdown(md: string, breaksOrOptions: boolean | ParseMarkdownOptions = true): string {
  if (!md || !md.trim()) return ''
  const options: ParseMarkdownOptions =
    typeof breaksOrOptions === 'boolean' ? { breaks: breaksOrOptions } : breaksOrOptions
  const breaks = options.breaks ?? true
  const streaming = options.streaming ?? false
  const codeCopyable = options.codeCopyable ?? true
  const codeCopyText = options.codeCopyText ?? '复制'

  const source = streaming ? repairStreamingMarkdown(md) : md
  const parser = getMarkdownParser(breaks, codeCopyable, codeCopyText)
  return parser.render(source).trim()
}
