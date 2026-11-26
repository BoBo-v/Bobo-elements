export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}

export function generateLineNumbers(code: string): number[] {
  const lines = code.split('\n')
  return lines.map((_, i) => i + 1)
}

const JS_TS_KEYWORDS = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'class', 'import', 'export', 'from', 'default', 'new', 'this', 'try', 'catch', 'finally',
  'throw', 'async', 'await', 'switch', 'case', 'break', 'continue', 'typeof', 'instanceof',
  'in', 'of', 'null', 'undefined', 'true', 'false', 'void', 'delete', 'yield', 'extends',
  'super', 'static', 'enum', 'implements', 'interface', 'package', 'private', 'protected',
  'public', 'abstract', 'as', 'constructor', 'declare', 'get', 'is', 'module', 'namespace',
  'require', 'set', 'type', 'satisfies', 'readonly', 'keyof', 'infer'
]

const KEYWORDS: Record<string, Set<string>> = {
  javascript: new Set(JS_TS_KEYWORDS),
  js: new Set(JS_TS_KEYWORDS),
  jsx: new Set(JS_TS_KEYWORDS),
  typescript: new Set(JS_TS_KEYWORDS),
  ts: new Set(JS_TS_KEYWORDS),
  tsx: new Set(JS_TS_KEYWORDS),
  python: new Set([
    'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from',
    'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'pass', 'break',
    'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'global',
    'nonlocal', 'del', 'assert', 'async', 'await', 'match', 'case'
  ]),
  py: new Set([
    'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from',
    'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'pass', 'break',
    'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'global',
    'nonlocal', 'del', 'assert', 'async', 'await', 'match', 'case'
  ]),
  bash: new Set([
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac',
    'function', 'return', 'local', 'export', 'source', 'alias', 'echo', 'exit', 'set',
    'unset', 'shift', 'readonly', 'declare', 'typeset', 'in', 'true', 'false'
  ]),
  sh: new Set([
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac',
    'function', 'return', 'local', 'export', 'source', 'alias', 'echo', 'exit', 'set',
    'unset', 'shift', 'readonly', 'declare', 'typeset', 'in', 'true', 'false'
  ]),
  shell: new Set([
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac',
    'function', 'return', 'local', 'export', 'source', 'alias', 'echo', 'exit', 'set',
    'unset', 'shift', 'readonly', 'declare', 'typeset', 'in', 'true', 'false'
  ]),
  json: new Set(['true', 'false', 'null']),
  sql: new Set([
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'CREATE', 'TABLE', 'ALTER', 'DROP', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON',
    'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'HAVING', 'AS', 'AND', 'OR',
    'NOT', 'NULL', 'IS', 'IN', 'LIKE', 'DISTINCT', 'UNION', 'ALL', 'CASE', 'WHEN', 'THEN',
    'ELSE', 'END', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
    'select', 'from', 'where', 'insert', 'into', 'values', 'update', 'set', 'delete',
    'create', 'table', 'alter', 'drop', 'join', 'left', 'right', 'inner', 'outer', 'on',
    'group', 'by', 'order', 'asc', 'desc', 'limit', 'offset', 'having', 'as', 'and', 'or',
    'not', 'null', 'is', 'in', 'like', 'distinct', 'union', 'all', 'case', 'when', 'then',
    'else', 'end', 'count', 'sum', 'avg', 'min', 'max'
  ]),
  go: new Set([
    'package', 'import', 'func', 'return', 'var', 'const', 'type', 'struct', 'interface',
    'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'go',
    'defer', 'select', 'chan', 'map', 'make', 'new', 'nil', 'true', 'false', 'iota', 'err'
  ]),
  rust: new Set([
    'fn', 'let', 'mut', 'const', 'static', 'pub', 'use', 'mod', 'struct', 'enum', 'impl',
    'trait', 'for', 'in', 'while', 'loop', 'if', 'else', 'match', 'return', 'break',
    'continue', 'async', 'await', 'move', 'ref', 'where', 'as', 'type', 'crate', 'self',
    'super', 'true', 'false', 'Some', 'None', 'Ok', 'Err'
  ]),
  rs: new Set([
    'fn', 'let', 'mut', 'const', 'static', 'pub', 'use', 'mod', 'struct', 'enum', 'impl',
    'trait', 'for', 'in', 'while', 'loop', 'if', 'else', 'match', 'return', 'break',
    'continue', 'async', 'await', 'move', 'ref', 'where', 'as', 'type', 'crate', 'self',
    'super', 'true', 'false', 'Some', 'None', 'Ok', 'Err'
  ]),
  yaml: new Set(['true', 'false', 'null', 'yes', 'no', 'on', 'off']),
  yml: new Set(['true', 'false', 'null', 'yes', 'no', 'on', 'off']),
  css: new Set(['!important']),
  scss: new Set(['!important', '@include', '@mixin', '@extend', '@if', '@else', '@each', '@for']),
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 将带 class 的多行 token 按换行拆分为独立闭合的 span，
 * 确保后续按行分割渲染时不会产生跨行未闭合的 HTML 标签。
 */
function wrapToken(text: string, className: string): string {
  const escaped = escapeHtml(text)
  if (!escaped.includes('\n')) {
    return `<span class="${className}">${escaped}</span>`
  }
  return escaped
    .split('\n')
    .map(part => (part ? `<span class="${className}">${part}</span>` : ''))
    .join('\n')
}

function highlightDiff(code: string): string {
  return code
    .split('\n')
    .map((line) => {
      if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
        return `<span class="vk-code-operator">${escapeHtml(line)}</span>`
      }
      if (line.startsWith('+')) {
        return `<span class="vk-code-diff-add">${escapeHtml(line)}</span>`
      }
      if (line.startsWith('-')) {
        return `<span class="vk-code-diff-del">${escapeHtml(line)}</span>`
      }
      return escapeHtml(line)
    })
    .join('\n')
}

function highlightMarkup(code: string): string {
  // 匹配 HTML/XML 注释、标签与属性，单遍扫描避免二次破坏 HTML 结构
  const tokenRegex = /(<!--[\s\S]*?-->)|(<\/?[a-zA-Z][\w:-]*)|(\s[a-zA-Z_:][\w:.-]*(?=\s*=))|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\/?>)/g
  let out = ''
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = tokenRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      out += escapeHtml(code.slice(lastIndex, match.index))
    }
    const [full, comment, tag, attr, str, close] = match
    if (comment) out += wrapToken(comment, 'vk-code-comment')
    else if (tag) out += `<span class="vk-code-keyword">${escapeHtml(tag)}</span>`
    else if (attr) out += `<span class="vk-code-function">${escapeHtml(attr)}</span>`
    else if (str) out += wrapToken(str, 'vk-code-string')
    else if (close) out += `<span class="vk-code-keyword">${escapeHtml(close)}</span>`
    else out += escapeHtml(full)
    lastIndex = tokenRegex.lastIndex
  }
  if (lastIndex < code.length) {
    out += escapeHtml(code.slice(lastIndex))
  }
  return out
}

/**
 * 单遍词法扫描高亮器：避免多轮正则 replace 对已生成的 <span> 属性做二次替换
 */
export function highlightCode(code: string, language = ''): string {
  if (!code) return ''
  try {
    const lang = language.trim().toLowerCase()
    if (lang === 'diff' || lang === 'patch') {
      return highlightDiff(code)
    }
    if (lang === 'html' || lang === 'xml' || lang === 'svg' || lang === 'vue') {
      return highlightMarkup(code)
    }

    const kws = KEYWORDS[lang] || KEYWORDS.javascript
    const supportsHashComment = lang === 'python' || lang === 'py' || lang === 'bash' || lang === 'sh' || lang === 'shell' || lang === 'yaml' || lang === 'yml'
    const supportsSqlComment = lang === 'sql'
    const isCss = lang === 'css' || lang === 'scss'

    // 使用具名捕获组单遍匹配，避免可选分支导致组序号偏移
    const branches: string[] = [
      supportsSqlComment ? '(?<sqlComment>--[^\\n]*)' : '(?<lineComment>\\/\\/[^\\n]*)',
      '(?<blockComment>\\/\\*[\\s\\S]*?\\*\\/)',
    ]
    if (supportsHashComment) {
      branches.push('(?<hashComment>#[^\\n]*)')
    }
    branches.push('(?<str>"(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)')
    if (isCss) {
      branches.push('(?<cssDirective>@[a-zA-Z-]+|!important)')
    }
    branches.push('\\b(?<num>\\d+(?:\\.\\d+)?)\\b')
    branches.push('(?<ident>[a-zA-Z_$][\\w$]*)')

    const regex = new RegExp(branches.join('|'), 'g')
    let out = ''
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(code)) !== null) {
      if (match.index > lastIndex) {
        out += escapeHtml(code.slice(lastIndex, match.index))
      }
      const full = match[0]
      const groups = match.groups || {}

      if (groups.lineComment || groups.sqlComment || groups.blockComment || groups.hashComment) {
        out += wrapToken(full, 'vk-code-comment')
      } else if (groups.str) {
        // JSON 属性键（后紧跟冒号）使用函数色以提升可读性
        if (lang === 'json' && /^\s*:/.test(code.slice(regex.lastIndex))) {
          out += wrapToken(full, 'vk-code-function')
        } else {
          out += wrapToken(full, 'vk-code-string')
        }
      } else if (groups.cssDirective) {
        out += `<span class="vk-code-keyword">${escapeHtml(full)}</span>`
      } else if (groups.num) {
        out += `<span class="vk-code-number">${escapeHtml(full)}</span>`
      } else if (groups.ident) {
        if (kws.has(full)) {
          out += `<span class="vk-code-keyword">${escapeHtml(full)}</span>`
        } else if (/^\s*\(/.test(code.slice(regex.lastIndex))) {
          out += `<span class="vk-code-function">${escapeHtml(full)}</span>`
        } else {
          out += escapeHtml(full)
        }
      } else {
        out += escapeHtml(full)
      }

      lastIndex = regex.lastIndex
    }

    if (lastIndex < code.length) {
      out += escapeHtml(code.slice(lastIndex))
    }
    return out
  } catch {
    return escapeHtml(code)
  }
}

export function wrapLines(html: string, highlightLines: number[]): string {
  const lines = html.split('\n')
  return lines
    .map((line, i) => {
      const lineNum = i + 1
      const cls = highlightLines.includes(lineNum)
        ? 'vk-code-block__line vk-code-block__line--highlighted'
        : 'vk-code-block__line'
      return `<span class="${cls}">${line}</span>`
    })
    .join('\n')
}
