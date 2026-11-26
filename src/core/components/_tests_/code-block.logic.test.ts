import { describe, test, expect } from 'vitest'
import { highlightCode } from '../code-block.logic'

describe('code-block.logic highlightCode', () => {
  test('does not corrupt generated HTML attributes when keywords like class or type appear in comments or strings', () => {
    const code = `// class Foo type Bar\nconst url = "https://example.com/class/type"\nclass Demo {}`
    const html = highlightCode(code, 'typescript')
    expect(html).not.toContain('<span <span')
    expect(html).toContain('<span class="vk-code-comment">// class Foo type Bar</span>')
    expect(html).toContain('<span class="vk-code-string">&quot;https://example.com/class/type&quot;</span>')
    expect(html).toContain('<span class="vk-code-keyword">class</span>')
  })

  test('supports json, sql, and diff highlighting', () => {
    const jsonHtml = highlightCode('{"name": "bobo", "count": 10}', 'json')
    expect(jsonHtml).toContain('vk-code-function')
    expect(jsonHtml).toContain('vk-code-string')
    expect(jsonHtml).toContain('vk-code-number')

    const sqlHtml = highlightCode('SELECT id FROM users -- fetch ids', 'sql')
    expect(sqlHtml).toContain('<span class="vk-code-keyword">SELECT</span>')
    expect(sqlHtml).toContain('<span class="vk-code-comment">-- fetch ids</span>')

    const diffHtml = highlightCode('@@ -1,2 +1,2 @@\n-old\n+new', 'diff')
    expect(diffHtml).toContain('vk-code-diff-del')
    expect(diffHtml).toContain('vk-code-diff-add')
  })
})
