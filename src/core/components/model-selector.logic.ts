export interface MenuPlacementInput {
  rootLeft: number
  rootRight: number
  rootTop: number
  rootBottom: number
  menuWidth: number
  menuHeight: number
  viewportWidth: number
  viewportHeight: number
  margin?: number
}

export interface MenuPlacementResult {
  alignRight: boolean
  dropUp: boolean
  shiftX: number
}

/**
 * 计算模型选择器下拉菜单的视口防溢出定位：
 * 优先左对齐；右侧空间不足且右对齐可容纳时切换为右对齐；
 * 若在超窄屏下仍超出左右视口边距，则通过水平偏移量钳制在安全视口区间内。
 */
export function computeMenuPlacement(input: MenuPlacementInput): MenuPlacementResult {
  const {
    rootLeft,
    rootRight,
    rootTop,
    rootBottom,
    menuWidth,
    menuHeight,
    viewportWidth,
    viewportHeight,
    margin = 12,
  } = input

  if (viewportWidth <= 0 || menuWidth <= 0) {
    return { alignRight: false, dropUp: false, shiftX: 0 }
  }

  const maxLeft = Math.max(margin, viewportWidth - margin - menuWidth)
  const leftFits = rootLeft >= margin && rootLeft + menuWidth <= viewportWidth - margin
  const rightAlignedLeft = rootRight - menuWidth
  const rightFits = rightAlignedLeft >= margin && rootRight <= viewportWidth - margin

  let alignRight = false
  let shiftX = 0

  if (!leftFits) {
    if (rightFits) {
      alignRight = true
    } else {
      const clampedLeft = Math.max(margin, Math.min(rootLeft, maxLeft))
      shiftX = Math.round(clampedLeft - rootLeft)
    }
  }

  const spaceBelow = viewportHeight - rootBottom - margin
  const spaceAbove = rootTop - margin
  const dropUp =
    viewportHeight > 0 &&
    menuHeight > 0 &&
    spaceBelow < menuHeight &&
    spaceAbove > spaceBelow

  return { alignRight, dropUp, shiftX }
}
