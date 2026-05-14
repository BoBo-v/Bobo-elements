<template>
  <div class="home-wrapper">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <span class="hero-badge">v1.0 · MIT License</span>
        <h1 class="hero-title">
          <span class="gradient-text">Bobo</span>-elements
        </h1>
        <p class="hero-subtitle">Vue3 + React 双框架组件库</p>
        <p class="hero-desc">
          基于 TypeScript 构建，支持 Vue3 和 React 子路径导出<br />
          轻量高效，开箱即用，一套代码两个框架
        </p>
        <div class="hero-actions">
          <a class="btn-primary" href="/Shiyong">快速开始</a>
          <a class="btn-outline" href="/components/button">浏览组件</a>
          <a class="btn-ghost" href="https://github.com/BoBo-v/Bobo-elements.git" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">17</span>
            <span class="stat-label">组件</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">2</span>
            <span class="stat-label">框架</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">TypeScript</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">MIT</span>
            <span class="stat-label">开源协议</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Install -->
    <section class="install-section">
      <div class="install-card">
        <div class="install-tabs">
          <button
            :class="['install-tab', { active: pkgManager === 'npm' }]"
            @click="pkgManager = 'npm'"
          >npm</button>
          <button
            :class="['install-tab', { active: pkgManager === 'yarn' }]"
            @click="pkgManager = 'yarn'"
          >yarn</button>
          <button
            :class="['install-tab', { active: pkgManager === 'pnpm' }]"
            @click="pkgManager = 'pnpm'"
          >pnpm</button>
        </div>
        <div class="install-code">
          <code>{{ installCmd }}</code>
          <button class="copy-btn" @click="copyInstall" :title="copied ? '已复制' : '复制'">
            <svg v-if="!copied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section">
      <h2 class="section-title">为什么选择 Bobo-elements</h2>
      <p class="section-desc">专为现代前端开发设计，兼顾灵活性与开发体验</p>
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.title">
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.details }}</p>
        </div>
      </div>
    </section>

    <!-- Components -->
    <section class="components-section">
      <h2 class="section-title">组件总览</h2>
      <p class="section-desc">涵盖基础、表单、数据展示、反馈四大类别，满足日常开发需求</p>
      <div class="component-groups">
        <div class="component-group" v-for="g in componentGroups" :key="g.name">
          <h3 class="group-title">
            <span class="group-icon">{{ g.icon }}</span>
            {{ g.name }}
          </h3>
          <div class="group-items">
            <a
              v-for="c in g.items"
              :key="c.name"
              :href="'/components/' + c.link"
              class="component-item"
            >
              <span class="item-name">{{ c.name }}</span>
              <span class="item-label">{{ c.label }}</span>
              <span class="item-frameworks">
                <span class="fw-tag vue" v-if="c.vue">Vue</span>
                <span class="fw-tag react" v-if="c.react">React</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage -->
    <section class="usage-section">
      <h2 class="section-title">快速上手</h2>
      <p class="section-desc">两行代码即可在你的项目中使用</p>
      <div class="usage-grid">
        <div class="usage-card">
          <div class="usage-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M2 6l10.5-4L23 6v12l-10.5 4L2 18V6z" stroke="#42b883" stroke-width="2"/>
              <path d="M12.5 2v20" stroke="#42b883" stroke-width="2"/>
              <path d="M2 6l10.5 4L23 6" stroke="#42b883" stroke-width="2"/>
            </svg>
            <span>Vue3</span>
          </div>
          <div class="usage-code">
            <pre><code><span class="code-keyword">import</span> { BButton } <span class="code-keyword">from</span> <span class="code-string">'@bobocn/element/vue'</span>

<span class="code-comment">&lt;template&gt;</span>
  <span class="code-tag">&lt;BButton</span> <span class="code-attr">type</span>=<span class="code-string">"primary"</span><span class="code-tag">&gt;</span>
    点击我
  <span class="code-tag">&lt;/BButton&gt;</span>
<span class="code-comment">&lt;/template&gt;</span></code></pre>
          </div>
        </div>
        <div class="usage-card">
          <div class="usage-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#61dafb" stroke-width="2"/>
              <circle cx="12" cy="12" r="2" fill="#61dafb"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" stroke-width="2" transform="rotate(30 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" stroke-width="2" transform="rotate(-30 12 12)"/>
            </svg>
            <span>React</span>
          </div>
          <div class="usage-code">
            <pre><code><span class="code-keyword">import</span> { Button } <span class="code-keyword">from</span> <span class="code-string">'@bobocn/element/react'</span>

<span class="code-keyword">function</span> <span class="code-func">App</span>() {
  <span class="code-keyword">return</span> (
    <span class="code-tag">&lt;Button</span> <span class="code-attr">type</span>=<span class="code-string">"primary"</span><span class="code-tag">&gt;</span>
      Click Me
    <span class="code-tag">&lt;/Button&gt;</span>
  )
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2 class="cta-title">开始使用 Bobo-elements</h2>
      <p class="cta-desc">快速集成到你的 Vue3 或 React 项目中</p>
      <div class="cta-actions">
        <a class="btn-primary" href="/Shiyong">阅读文档</a>
        <a class="btn-outline" href="https://github.com/BoBo-v/Bobo-elements.git" target="_blank">Star on GitHub</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const pkgManager = ref('npm')
const copied = ref(false)

const installCmd = computed(() => {
  const cmds: Record<string, string> = {
    npm: 'npm install @bobocn/element',
    yarn: 'yarn add @bobocn/element',
    pnpm: 'pnpm add @bobocn/element',
  }
  return cmds[pkgManager.value]
})

function copyInstall() {
  navigator.clipboard.writeText(installCmd.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

const features = [
  {
    icon: '⚡',
    title: '双框架 · 一套核心',
    details: 'Vue3 和 React 共享类型定义与核心逻辑，API 风格统一，切换框架零学习成本。',
  },
  {
    icon: '📦',
    title: '子路径导出 · 按需引入',
    details: '通过 @bobocn/element/vue 和 /react 独立导出，Tree Shaking 友好，不引入多余代码。',
  },
  {
    icon: '🔷',
    title: 'TypeScript · 类型安全',
    details: '100% TypeScript 编写，完整的类型推导与智能提示，开发体验拉满。',
  },
  {
    icon: '🎨',
    title: 'CSS 共享 · 风格统一',
    details: '两个框架共用一套 CSS 样式，确保视觉一致性，维护成本减半。',
  },
  {
    icon: '✅',
    title: '表单验证 · 开箱即用',
    details: '内置 async-validator 集成，支持复杂校验规则、异步验证、自定义校验函数。',
  },
  {
    icon: '🧩',
    title: '17 个组件 · 覆盖全场景',
    details: '从按钮到弹窗，从表单到通知，涵盖日常开发中最常用的 UI 组件。',
  },
]

const componentGroups = [
  {
    name: '基础组件',
    icon: '🧱',
    items: [
      { name: 'Button', label: '按钮', link: 'button', vue: true, react: false },
      { name: 'Icon', label: '图标', link: 'button', vue: true, react: false },
      { name: 'Alert', label: '提示', link: 'alert', vue: true, react: false },
      { name: 'Tag', label: '标签', link: 'tag', vue: true, react: true },
    ],
  },
  {
    name: '表单组件',
    icon: '📝',
    items: [
      { name: 'Form', label: '表单', link: 'form', vue: true, react: true },
      { name: 'Input', label: '输入框', link: 'input', vue: true, react: false },
      { name: 'Select', label: '选择器', link: 'select', vue: true, react: true },
      { name: 'Switch', label: '开关', link: 'switch', vue: true, react: false },
      { name: 'Radio', label: '单选框', link: 'radio', vue: true, react: true },
      { name: 'Checkbox', label: '多选框', link: 'checkbox', vue: true, react: true },
    ],
  },
  {
    name: '数据展示',
    icon: '📊',
    items: [
      { name: 'Collapse', label: '折叠面板', link: 'collapse', vue: true, react: true },
      { name: 'Tabs', label: '标签页', link: 'tabs', vue: true, react: true },
      { name: 'Tooltip', label: '文字提示', link: 'tooltip', vue: true, react: true },
      { name: 'Dropdown', label: '下拉菜单', link: 'dropdown', vue: true, react: true },
    ],
  },
  {
    name: '反馈组件',
    icon: '💬',
    items: [
      { name: 'Modal', label: '对话框', link: 'modal', vue: true, react: true },
      { name: 'Message', label: '消息', link: 'message', vue: true, react: true },
      { name: 'Notification', label: '通知', link: 'notification', vue: true, react: true },
    ],
  },
]
</script>

<style scoped>
.home-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== Hero ===== */
.hero-section {
  position: relative;
  text-align: center;
  padding: 80px 0 60px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(52, 81, 178, 0.15), transparent);
  pointer-events: none;
}

.dark .hero-bg {
  background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(100, 108, 255, 0.1), transparent);
}

.hero-content {
  position: relative;
}

.hero-badge {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  margin-bottom: 24px;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin: 0 0 16px;
}

.gradient-text {
  background: linear-gradient(135deg, #3451b2, #646cff, #42b883);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
}

.hero-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0 0 32px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  background: var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.25s;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(52, 81, 178, 0.3);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.25s;
}

.btn-outline:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.25s;
}

.btn-ghost:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: var(--vp-c-divider);
}

/* ===== Install ===== */
.install-section {
  display: flex;
  justify-content: center;
  padding: 20px 0 60px;
}

.install-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  min-width: 420px;
  max-width: 100%;
}

.install-tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
}

.install-tab {
  flex: 1;
  padding: 10px 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.install-tab.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.install-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.copy-btn {
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.copy-btn:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

/* ===== Section Common ===== */
.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.section-desc {
  text-align: center;
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 40px;
}

/* ===== Features ===== */
.features-section {
  padding: 60px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 28px 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.dark .feature-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 28px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.feature-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

/* ===== Components ===== */
.components-section {
  padding: 60px 0;
}

.component-groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.component-group {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg);
}

.group-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-icon {
  font-size: 20px;
}

.group-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  background: var(--vp-c-bg-soft);
}

.component-item:hover {
  background: var(--vp-c-brand-soft);
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 100px;
}

.item-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  flex: 1;
}

.item-frameworks {
  display: flex;
  gap: 6px;
}

.fw-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.fw-tag.vue {
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
}

.fw-tag.react {
  color: #61dafb;
  background: rgba(97, 218, 251, 0.1);
}

/* ===== Usage ===== */
.usage-section {
  padding: 60px 0;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.usage-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.usage-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.usage-code {
  padding: 20px;
  background: var(--vp-c-bg-soft);
}

.usage-code pre {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  font-family: var(--vp-font-family-mono);
}

.usage-code code {
  color: var(--vp-c-text-1);
}

.code-keyword { color: #c678dd; }
.code-string { color: #98c379; }
.code-comment { color: #5c6370; }
.code-tag { color: #e06c75; }
.code-attr { color: #d19a66; }
.code-func { color: #61afef; }

/* ===== CTA ===== */
.cta-section {
  text-align: center;
  padding: 80px 0;
  margin: 40px 0 0;
  border-top: 1px solid var(--vp-c-divider);
}

.cta-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.cta-desc {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 32px;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }

  .hero-subtitle {
    font-size: 20px;
  }

  .hero-stats {
    gap: 20px;
  }

  .stat-number {
    font-size: 22px;
  }

  .install-card {
    min-width: auto;
    width: 100%;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .component-groups {
    grid-template-columns: 1fr;
  }

  .usage-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 16px;
  }

  .stat-divider {
    display: none;
  }
}
</style>
