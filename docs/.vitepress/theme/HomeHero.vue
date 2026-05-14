<template>
  <!-- Hero: full-width background -->
  <section class="hero-section">
    <!-- Background layers -->
    <div class="hero-bg">
      <div class="hero-bg-grid"></div>
      <div class="hero-bg-glow glow-left"></div>
      <div class="hero-bg-glow glow-right"></div>
      <div class="hero-bg-glow glow-center"></div>
      <div class="particle" v-for="n in 24" :key="n"
        :style="{
          left: particlePositions[n-1].x + '%',
          top: particlePositions[n-1].y + '%',
          animationDelay: particlePositions[n-1].delay + 's',
          animationDuration: particlePositions[n-1].duration + 's',
          width: particlePositions[n-1].size + 'px',
          height: particlePositions[n-1].size + 'px',
        }"
      ></div>
      <!-- Decorative floating shapes -->
      <div class="deco-shape deco-circle deco-1"></div>
      <div class="deco-shape deco-circle deco-2"></div>
      <div class="deco-shape deco-ring deco-3"></div>
      <div class="deco-shape deco-ring deco-4"></div>
      <div class="deco-shape deco-dot deco-5"></div>
      <div class="deco-shape deco-dot deco-6"></div>
      <div class="deco-shape deco-dot deco-7"></div>
      <div class="deco-shape deco-dot deco-8"></div>
      <!-- Floating mini component cards -->
      <div class="deco-card deco-card-1">
        <span class="deco-card-btn">Button</span>
      </div>
      <div class="deco-card deco-card-2">
        <span class="deco-card-tag">Tag</span>
      </div>
      <div class="deco-card deco-card-3">
        <span class="deco-card-switch"><span class="switch-knob"></span></span>
      </div>
      <div class="deco-card deco-card-4">
        <span class="deco-card-check">&#10003;</span>
      </div>
    </div>

    <!-- Content: two-column layout -->
    <div class="hero-inner">
      <!-- Left: Logo + Dynamic -->
      <div class="hero-left">
        <div class="logo-wrapper">
          <div class="logo-ring"></div>
          <div class="logo-ring ring-2"></div>
          <div class="logo-orbit" v-for="n in 6" :key="n"
            :style="{ animationDelay: (n * 0.5) + 's' }">
            <span class="orbit-dot" :style="{ transform: `rotate(${n * 60}deg) translateX(190px)` }"></span>
          </div>
          <h1 class="hero-logo-text">
            <span class="logo-bobo">Bobo</span><span class="logo-dash">-</span><span class="logo-element">element</span>
          </h1>
          <div class="logo-underline"></div>
        </div>
        <div class="hero-tags">
          <span class="hero-tag" v-for="(tag, i) in heroTags" :key="tag"
            :style="{ animationDelay: (i * 150 + 800) + 'ms' }">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Right: Info -->
      <div class="hero-right">
        <p class="hero-subtitle">Vue3 + React 双框架组件库</p>
        <p class="hero-desc">
          基于 TypeScript 构建，支持 Vue3 和 React 子路径导出<br />
          轻量高效，开箱即用，一套代码两个框架
        </p>
        <div class="hero-actions">
          <a class="btn-primary" href="/Shiyong">
            <span>快速开始</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a class="btn-outline" href="/components/button">浏览组件</a>
          <a class="btn-ghost" href="https://github.com/BoBo-v/Bobo-elements.git" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div class="hero-stats">
          <div class="stat-item" v-for="(stat, i) in stats" :key="stat.label">
            <span class="stat-number">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Install: pinned to bottom of hero -->
    <div class="hero-install">
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
    </div>
  </section>

  <!-- Rest of page: constrained -->
  <div class="home-wrapper">

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

const heroTags = ['TypeScript', 'Vue3', 'React', '轻量']

const stats = [
  { value: '17', label: '组件' },
  { value: '2', label: '框架' },
  { value: '100%', label: 'TypeScript' },
]

// Generate random particle positions
const particlePositions = Array.from({ length: 24 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 4 + Math.random() * 6,
  size: 2 + Math.random() * 4,
}))

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

/* ===== Hero: full-width, full-height ===== */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  pointer-events: none;
}

/* Dot grid background */
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(100, 108, 255, 0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent);
}

.dark .hero-bg-grid {
  background-image: radial-gradient(circle, rgba(100, 108, 255, 0.06) 1px, transparent 1px);
}

/* Glow blobs */
.hero-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.glow-left {
  width: 500px;
  height: 500px;
  left: -10%;
  top: -20%;
  background: rgba(52, 81, 178, 0.1);
  animation: glow-drift 8s ease-in-out infinite;
}

.glow-right {
  width: 400px;
  height: 400px;
  right: -5%;
  bottom: -10%;
  background: rgba(66, 184, 131, 0.08);
  animation: glow-drift 10s ease-in-out infinite reverse;
}

.glow-center {
  width: 600px;
  height: 300px;
  left: 30%;
  top: 10%;
  background: rgba(100, 108, 255, 0.06);
  animation: glow-drift 12s ease-in-out infinite 2s;
}

.dark .glow-left { background: rgba(100, 108, 255, 0.08); }
.dark .glow-right { background: rgba(66, 184, 131, 0.06); }
.dark .glow-center { background: rgba(100, 108, 255, 0.05); }

@keyframes glow-drift {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(20px, -15px); }
  66% { transform: translate(-15px, 10px); }
}

/* Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0;
  animation: particle-float linear infinite;
  pointer-events: none;
}

@keyframes particle-float {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  10% { opacity: 0.5; transform: translateY(-10px) scale(1); }
  90% { opacity: 0.2; transform: translateY(-100px) scale(0.5); }
  100% { opacity: 0; transform: translateY(-120px) scale(0); }
}

/* Decorative shapes */
.deco-shape {
  position: absolute;
  pointer-events: none;
}

.deco-circle {
  border-radius: 50%;
  background: rgba(100, 108, 255, 0.06);
}

.deco-ring {
  border-radius: 50%;
  border: 1px solid rgba(100, 108, 255, 0.08);
  background: transparent;
}

.deco-dot {
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  opacity: 0.15;
}

.deco-1 { width: 180px; height: 180px; left: 3%; top: 15%; animation: deco-float 7s ease-in-out infinite; }
.deco-2 { width: 120px; height: 120px; right: 5%; bottom: 20%; animation: deco-float 9s ease-in-out infinite reverse; }
.deco-3 { width: 200px; height: 200px; left: 8%; bottom: 10%; border-style: dashed; animation: ring-spin 20s linear infinite; }
.deco-4 { width: 160px; height: 160px; right: 8%; top: 10%; animation: ring-spin 15s linear infinite reverse; }
.deco-5 { width: 8px; height: 8px; left: 15%; top: 30%; animation: deco-blink 4s ease-in-out infinite; }
.deco-6 { width: 6px; height: 6px; right: 18%; top: 45%; animation: deco-blink 5s ease-in-out infinite 1s; }
.deco-7 { width: 10px; height: 10px; left: 20%; bottom: 30%; animation: deco-blink 6s ease-in-out infinite 2s; }
.deco-8 { width: 5px; height: 5px; right: 22%; bottom: 35%; animation: deco-blink 4.5s ease-in-out infinite 0.5s; }

@keyframes deco-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes deco-blink {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.5); }
}

/* Floating mini component cards */
.deco-card {
  position: absolute;
  padding: 10px 18px;
  border-radius: 10px;
  border: 1px solid rgba(100, 108, 255, 0.1);
  background: var(--vp-c-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  opacity: 0.5;
  pointer-events: none;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

.dark .deco-card {
  background: rgba(30, 30, 40, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.deco-card-1 { left: 4%; top: 25%; animation: card-float 6s ease-in-out infinite; }
.deco-card-2 { right: 5%; top: 20%; animation: card-float 7s ease-in-out infinite 1s; }
.deco-card-3 { left: 6%; bottom: 25%; animation: card-float 8s ease-in-out infinite 2s; }
.deco-card-4 { right: 7%; bottom: 30%; animation: card-float 6.5s ease-in-out infinite 0.5s; }

@keyframes card-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

.deco-card-btn {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 6px;
  background: linear-gradient(135deg, #3451b2, #646cff);
  color: #fff;
  font-size: 12px;
}

.deco-card-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  font-size: 12px;
}

.deco-card-switch {
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: var(--vp-c-brand-1);
  position: relative;
}

.switch-knob {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  right: 2px;
  top: 2px;
}

.deco-card-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #42b883;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

/* ===== Two-column layout ===== */
.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: safe center;
  justify-content: center;
  gap: 80px;
  flex: 1;
}

.hero-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* ===== Logo ===== */
.logo-wrapper {
  position: relative;
  display: inline-block;
  padding: 20px 60px;
  margin-bottom: 20px;
}

.logo-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(100, 108, 255, 0.15);
  border-radius: 50%;
  animation: logo-ring-spin 12s linear infinite;
}

.ring-2 {
  width: 500px;
  height: 500px;
  border-style: dashed;
  border-color: rgba(66, 184, 131, 0.12);
  animation-direction: reverse;
  animation-duration: 18s;
}

@keyframes logo-ring-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.logo-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  animation: orbit-spin 8s linear infinite;
}

.orbit-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  box-shadow: 0 0 12px rgba(100, 108, 255, 0.5);
}

@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-logo-text {
  font-size: 80px;
  font-weight: 900;
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  position: relative;
  letter-spacing: -2px;
}

.logo-bobo {
  background: linear-gradient(135deg, #3451b2, #646cff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

.logo-dash {
  color: var(--vp-c-text-3);
  margin: 0 2px;
  font-weight: 300;
}

.logo-element {
  background: linear-gradient(135deg, #42b883, #646cff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
  animation-delay: 0.5s;
}

@keyframes shimmer {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

.logo-underline {
  height: 5px;
  margin: 12px auto 0;
  width: 0;
  background: linear-gradient(90deg, #3451b2, #646cff, #42b883);
  border-radius: 3px;
  animation: underline-grow 1s ease forwards 0.3s;
}

@keyframes underline-grow {
  to { width: 100%; }
}

/* ===== Tags ===== */
.hero-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-tag {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border: 1px solid rgba(100, 108, 255, 0.15);
  opacity: 0;
  animation: tag-pop 0.4s ease forwards;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hero-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.2);
}

@keyframes tag-pop {
  0% { opacity: 0; transform: scale(0.8) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

/* ===== Right side text ===== */
.hero-subtitle {
  font-size: 48px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
  line-height: 1.4;
  animation: fade-up 0.6s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.hero-desc {
  font-size: 22px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin: 0 0 28px;
  animation: fade-up 0.6s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===== Actions ===== */
.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  animation: fade-up 0.6s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #3451b2, #646cff);
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.15), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.btn-primary:hover::after {
  transform: translateX(100%);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(52, 81, 178, 0.35);
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-outline:hover {
  background: var(--vp-c-brand-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(100, 108, 255, 0.15);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 18px 40px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.3s;
}

.btn-ghost:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  transform: translateY(-2px);
}

/* ===== Stats ===== */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 48px;
  animation: fade-up 0.6s ease forwards;
  animation-delay: 0.7s;
  opacity: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 40px;
  background: var(--vp-c-divider);
}

.stat-number {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #3451b2, #646cff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 16px;
  color: var(--vp-c-text-3);
  line-height: 1.4;
  margin-top: 6px;
}

/* ===== Install (inside hero, bottom) ===== */
.hero-install {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 0 24px 40px;
  animation: fade-up 0.6s ease forwards;
  animation-delay: 0.8s;
  opacity: 0;
}

.install-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  min-width: 420px;
  max-width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(12px);
}

.dark .install-card {
  background: rgba(30, 30, 40, 0.7);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
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
@media (max-width: 1200px) {
  .deco-card { display: none; }
  .deco-1, .deco-2 { display: none; }
}

@media (max-width: 960px) {
  .hero-inner {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }

  .hero-right {
    align-items: center;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .stat-item {
    align-items: center;
  }

  .deco-shape { display: none; }
}

@media (max-width: 768px) {
  .hero-inner {
    padding-top: 30px;
    gap: 40px;
  }

  .hero-install {
    padding-bottom: 30px;
  }

  .hero-logo-text {
    font-size: 48px;
  }

  .logo-ring {
    width: 300px;
    height: 300px;
  }

  .ring-2 {
    width: 380px;
    height: 380px;
  }

  .hero-subtitle {
    font-size: 32px;
  }

  .hero-desc {
    font-size: 18px;
  }

  .btn-primary,
  .btn-outline,
  .btn-ghost {
    padding: 14px 32px;
    font-size: 16px;
  }

  .stat-number {
    font-size: 36px;
  }

  .stat-label {
    font-size: 14px;
  }

  .hero-tag {
    padding: 8px 18px;
    font-size: 14px;
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
  .hero-logo-text {
    font-size: 36px;
  }

  .logo-ring {
    width: 220px;
    height: 220px;
  }

  .ring-2 {
    width: 280px;
    height: 280px;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .stat-item:not(:last-child)::after {
    display: none;
  }
}
</style>
