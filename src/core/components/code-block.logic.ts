export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text)
}

export function generateLineNumbers(code: string): number[] {
  const lines = code.split('\n')
  return lines.map((_, i) => i + 1)
}

const KEYWORDS: Record<string, string[]> = {
  javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'new', 'this', 'try', 'catch', 'throw', 'async', 'await', 'switch', 'case', 'break', 'continue', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'void', 'delete', 'yield', 'extends', 'super', 'static', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'abstract', 'as', 'constructor', 'declare', 'get', 'is', 'module', 'namespace', 'require', 'set', 'type'],
  typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'default', 'new', 'this', 'try', 'catch', 'throw', 'async', 'await', 'switch', 'case', 'break', 'continue', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'void', 'delete', 'yield', 'extends', 'super', 'static', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public', 'abstract', 'as', 'constructor', 'declare', 'get', 'is', 'module', 'namespace', 'require', 'set', 'type'],
  python: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'global', 'nonlocal', 'del', 'assert', 'async', 'await'],
  css: ['@import', '@media', '@keyframes', '@font-face', '@supports', '@layer', '@property', '!important'],
  bash: ['if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case', 'esac', 'function', 'return', 'local', 'export', 'source', 'alias', 'echo', 'exit', 'set', 'unset', 'shift', 'readonly', 'declare', 'typeset'],
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function highlightCode(code: string, language: string): string {
  try {
    const escaped = escapeHtml(code)
    const lang = language.toLowerCase()
    const kws = KEYWORDS[lang] || KEYWORDS.javascript

    let result = escaped

    // comments: // single-line and /* multi-line */
    result = result.replace(/(\/\/.*?)(\n|$)/g, '<span class="vk-code-comment">$1</span>$2')
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="vk-code-comment">$1</span>')
    result = result.replace(/(#.*?)(\n|$)/g, function (match, p1, p2) {
      if (lang === 'python' || lang === 'bash') {
        return '<span class="vk-code-comment">' + p1 + '</span>' + p2
      }
      return match
    })

    // strings: double and single quoted
    result = result.replace(/(&quot;.*?&quot;)/g, '<span class="vk-code-string">$1</span>')
    result = result.replace(/(&#39;.*?&#39;)/g, '<span class="vk-code-string">$1</span>')
    result = result.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="vk-code-string">$1</span>')
    result = result.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="vk-code-string">$1</span>')
    result = result.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="vk-code-string">$1</span>')

    // numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="vk-code-number">$1</span>')

    // keywords
    for (const kw of kws) {
      const regex = new RegExp('\\b(' + kw + ')\\b', 'g')
      result = result.replace(regex, '<span class="vk-code-keyword">$1</span>')
    }

    // function calls
    result = result.replace(/\b([a-zA-Z_]\w*)\s*(?=\()/g, '<span class="vk-code-function">$1</span>')

    return result
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
