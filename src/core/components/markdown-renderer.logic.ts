import MarkdownIt from 'markdown-it'

function sanitizeUrl(rawUrl: string): string {
  const url = rawUrl.trim()
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
  const lower = url.replace(/[\u0000-\u001F\u007F\s]+/g, '').toLowerCase()
  // Explicitly block SVG data URLs to prevent script execution inside SVG
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
  // Allow only safe raster image data URLs
  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(lower)) {
    return url
  }
  return ''
}

function createMarkdownParser(breaks: boolean): MarkdownIt {
  const md = new MarkdownIt({
    html: false, // Strictly disable raw HTML to prevent XSS
    xhtmlOut: true,
    breaks,
    langPrefix: 'vk-md-lang-',
    linkify: false,
    typographer: false
  })

  // Allow custom sanitizers in renderer rules to inspect and sanitize all URLs
  md.validateLink = () => true

  // Headings
  md.renderer.rules.heading_open = (tokens, idx) => {
    const level = tokens[idx].tag
    return `<${level} class="vk-md-${level}">`
  }

  // Paragraphs
  md.renderer.rules.paragraph_open = () => '<p class="vk-md-p">'

  // Lists
  md.renderer.rules.bullet_list_open = () => '<ul class="vk-md-ul">\n'
  md.renderer.rules.ordered_list_open = (tokens, idx) => {
    const token = tokens[idx]
    const start = token.attrGet('start')
    const startAttr = start ? ` start="${start}"` : ''
    return `<ol class="vk-md-ol"${startAttr}>\n`
  }
  md.renderer.rules.list_item_open = () => '<li class="vk-md-li">'

  // Blockquote
  md.renderer.rules.blockquote_open = () => '<blockquote class="vk-md-blockquote">\n'

  // Horizontal Rule
  md.renderer.rules.hr = () => '<hr class="vk-md-hr" />\n'

  // Text formatting
  md.renderer.rules.strong_open = () => '<strong class="vk-md-bold">'
  md.renderer.rules.strong_close = () => '</strong>'
  md.renderer.rules.em_open = () => '<em class="vk-md-italic">'
  md.renderer.rules.em_close = () => '</em>'
  md.renderer.rules.s_open = () => '<del class="vk-md-del">'
  md.renderer.rules.s_close = () => '</del>'

  // Inline Code
  md.renderer.rules.code_inline = (tokens, idx) => {
    return `<code class="vk-md-inline-code">${md.utils.escapeHtml(tokens[idx].content)}</code>`
  }

  // Code Block (Fenced)
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
    const langName = info ? info.split(/\s+/)[0] : ''
    const langClass = langName ? ` vk-md-lang-${md.utils.escapeHtml(langName)}` : ''
    const code = md.utils.escapeHtml(token.content.trim())
    return `<pre class="vk-md-pre"><code class="vk-md-code${langClass}">${code}</code></pre>\n`
  }

  // Code Block (Indented)
  md.renderer.rules.code_block = (tokens, idx) => {
    const token = tokens[idx]
    const code = md.utils.escapeHtml(token.content.trim())
    return `<pre class="vk-md-pre"><code class="vk-md-code">${code}</code></pre>\n`
  }

  // Links
  md.renderer.rules.link_open = (tokens, idx) => {
    const token = tokens[idx]
    const rawHref = token.attrGet('href') || ''
    const safeHref = sanitizeUrl(rawHref)
    return `<a class="vk-md-link" href="${md.utils.escapeHtml(safeHref)}" target="_blank" rel="noopener noreferrer">`
  }

  // Images
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

  // Tables
  md.renderer.rules.table_open = () => '<table class="vk-md-table">\n'
  md.renderer.rules.th_open = () => '<th class="vk-md-th">'
  md.renderer.rules.td_open = () => '<td class="vk-md-td">'
  md.renderer.rules.tr_open = () => '<tr class="vk-md-tr">'

  return md
}

const parserWithBreaks = createMarkdownParser(true)
const parserWithoutBreaks = createMarkdownParser(false)

export function parseMarkdown(md: string, breaks = true): string {
  if (!md || !md.trim()) return ''
  const parser = breaks ? parserWithBreaks : parserWithoutBreaks
  return parser.render(md).trim()
}
