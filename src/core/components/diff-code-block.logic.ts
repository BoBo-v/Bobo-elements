import type { DiffLine } from './diff-code-block.types'

/**
 * 基于行级 LCS 计算两段代码的差异行，生成带旧/新行号的 DiffLine 序列
 */
export function computeLineDiff(oldCode = '', newCode = ''): DiffLine[] {
  const oldLines = oldCode ? oldCode.split('\n') : []
  const newLines = newCode ? newCode.split('\n') : []
  const m = oldLines.length
  const n = newLines.length

  // 对于极大文本回退为简化对比，避免 DP 表内存过高
  if (m * n > 200_000) {
    return [
      ...oldLines.map((content, idx) => ({ type: 'removed' as const, content, oldLine: idx + 1 })),
      ...newLines.map((content, idx) => ({ type: 'added' as const, content, newLine: idx + 1 })),
    ]
  }

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (oldLines[i] === newLines[j]) {
        dp[i][j] = dp[i + 1][j + 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1])
      }
    }
  }

  const result: DiffLine[] = []
  let i = 0
  let j = 0
  while (i < m && j < n) {
    if (oldLines[i] === newLines[j]) {
      result.push({ type: 'unchanged', content: oldLines[i], oldLine: i + 1, newLine: j + 1 })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: 'removed', content: oldLines[i], oldLine: i + 1 })
      i++
    } else {
      result.push({ type: 'added', content: newLines[j], newLine: j + 1 })
      j++
    }
  }
  while (i < m) {
    result.push({ type: 'removed', content: oldLines[i], oldLine: i + 1 })
    i++
  }
  while (j < n) {
    result.push({ type: 'added', content: newLines[j], newLine: j + 1 })
    j++
  }
  return result
}
