function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttribute(str: string): string {
  return escapeHtml(str).replace(/`/g, '&#96;')
}

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
    return escapeAttribute(url)
  }
  return '#'
}

function sanitizeImageUrl(rawUrl: string): string {
  const url = rawUrl.trim()
  const lower = url.replace(/[\u0000-\u001F\u007F\s]+/g, '').toLowerCase()
  if (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('/') ||
    lower.startsWith('./') ||
    lower.startsWith('../') ||
    lower.startsWith('data:image/')
  ) {
    return escapeAttribute(url)
  }
  return ''
}

export function parseMarkdown(md: string, breaks = true): string {
  if (!md) return ''

  let html = escapeHtml(md)

  // code blocks: ```...```
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    return `<pre class="vk-md-pre"><code class="vk-md-code${lang ? ' vk-md-lang-' + lang : ''}">${code.trim()}</code></pre>`
  })

  // inline code: `...`
  html = html.replace(/`([^`]+)`/g, '<code class="vk-md-inline-code">$1</code>')

  // headings: # ## ### etc.
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="vk-md-h6">$1</h6>')
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="vk-md-h5">$1</h5>')
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="vk-md-h4">$1</h4>')
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="vk-md-h3">$1</h3>')
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="vk-md-h2">$1</h2>')
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="vk-md-h1">$1</h1>')

  // bold: **...**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="vk-md-bold">$1</strong>')

  // italic: *...*
  html = html.replace(/\*(.+?)\*/g, '<em class="vk-md-italic">$1</em>')

  // strikethrough: ~~...~~
  html = html.replace(/~~(.+?)~~/g, '<del class="vk-md-del">$1</del>')

  // blockquote: > ...
  html = html.replace(/^&gt;\s+(.+)$/gm, '<blockquote class="vk-md-blockquote">$1</blockquote>')

  // unordered list: - ...
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li class="vk-md-li">$1</li>')
  html = html.replace(/(<li class="vk-md-li">.*<\/li>\n?)+/g, '<ul class="vk-md-ul">$&</ul>')

  // ordered list: 1. ...
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="vk-md-li">$1</li>')

  // images: ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    const src = sanitizeImageUrl(url)
    if (!src) return escapeHtml(alt)
    return `<img class="vk-md-img" src="${src}" alt="${escapeAttribute(alt)}" />`
  })

  // links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `<a class="vk-md-link" href="${sanitizeUrl(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`
  })

  // horizontal rule: ---
  html = html.replace(/^---+$/gm, '<hr class="vk-md-hr" />')

  // line breaks
  if (breaks) {
    html = html.replace(/\n/g, '<br />')
  }

  // paragraphs: wrap remaining loose text
  // (simple approach: don't wrap lines that already start with an HTML tag)
  html = html.replace(/^(?!<)(.+)$/gm, '<p class="vk-md-p">$1</p>')

  // clean up empty paragraphs
  html = html.replace(/<p class="vk-md-p"><\/p>/g, '')

  return html
}
