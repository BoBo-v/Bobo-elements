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
        <p class="hero-subtitle">为 AI 应用而生的双框架组件库</p>
        <p class="hero-desc">
          9 个 AI 原生组件 + 17 个基础组件，Vue3 与 React 共享核心<br />
          覆盖流式对话、代码展示、思维链、聊天气泡等智能应用场景
        </p>
        <div class="hero-actions">
          <a class="btn-primary" href="/Shiyong">
            <span>快速开始</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a class="btn-outline" href="/components/thinking-indicator">浏览 AI 组件</a>
          <a class="btn-ghost" href="https://github.com/BoBo-v/Bobo-elements.git" target="_blank">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div class="hero-stats">
          <div
            class="stat-item"
            :class="{ 'stat-item--ai': stat.highlight }"
            v-for="stat in stats"
            :key="stat.label"
          >
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

  <!-- AI Showcase -->
  <section class="ai-showcase">
    <div class="ai-showcase__inner">
      <div class="ai-showcase__header">
        <h2 class="ai-showcase__title">AI 原生组件，开箱即用</h2>
        <p class="ai-showcase__subtitle">为智能对话、流式输出、代码展示等 AI 应用场景而生</p>
      </div>

      <div class="ai-showcase__content">
        <!-- Left: Live Chat Demo -->
        <div class="ai-demo">
          <div class="ai-demo__window">
            <!-- Header -->
            <div class="ai-demo__titlebar">
              <div class="ai-demo__dots">
                <span /><span /><span />
              </div>
              <span class="ai-demo__title-text">AI Assistant</span>
            </div>

            <!-- Messages -->
            <div class="ai-demo__messages">
              <!-- User Message -->
              <div class="ai-demo__msg ai-demo__msg--user">
                <div class="ai-demo__bubble ai-demo__bubble--user">
                  {{ demoUserMsg }}
                </div>
              </div>

              <!-- Assistant Message -->
              <div v-if="demoStreamText" class="ai-demo__msg ai-demo__msg--assistant">
                <div class="ai-demo__bubble ai-demo__bubble--assistant">
                  <!-- Thinking Phase -->
                  <ThinkingIndicator
                    v-if="demoStreamText === '__thinking__'"
                    color="primary"
                    text="正在分析..."
                    size="small"
                  />
                  <!-- Streaming + Content Phases -->
                  <template v-else>
                    <StreamingText
                      :text="displayStreamText"
                      :speed="2"
                      :interval="30"
                      :show-cursor="demoStreamText !== '__done__' && !demoStreamText.endsWith('__')"
                    />

                    <!-- ReasoningBlock -->
                    <div v-if="showReasoning" class="ai-demo__section">
                      <ReasoningBlock
                        title="推理过程"
                        :duration="currentScenario.duration"
                        :expanded="demoReasonExpanded"
                      >
                        <p style="margin:0;font-size:13px;color:var(--vk-text-color-secondary);line-height:1.7">
                          {{ currentScenario.reasoning }}
                        </p>
                      </ReasoningBlock>
                    </div>

                    <!-- CodeBlock -->
                    <div v-if="showCode" class="ai-demo__section">
                      <CodeBlock
                        :code="currentScenario.code"
                        language="typescript"
                        :show-line-numbers="true"
                        theme="dark"
                        :max-height="'220px'"
                        title="solution.ts"
                      />
                    </div>

                    <!-- TokenBadge -->
                    <div v-if="showTokens" class="ai-demo__tokens">
                      <TokenBadge :used="currentScenario.tokens" :total="4096" />
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <!-- Input Bar -->
            <div class="ai-demo__input-bar">
              <span class="ai-demo__input-text">输入消息...</span>
              <div class="ai-demo__send-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Capability List -->
        <div class="ai-caps">
          <a
            v-for="cap in aiCapabilities"
            :key="cap.name"
            :href="cap.link"
            class="ai-cap-card"
          >
            <div class="ai-cap-card__icon" v-html="cap.icon" />
            <div class="ai-cap-card__info">
              <div class="ai-cap-card__head">
                <span class="ai-cap-card__name">{{ cap.name }}</span>
                <span class="ai-cap-card__label">{{ cap.label }}</span>
              </div>
              <p class="ai-cap-card__desc">{{ cap.desc }}</p>
              <div class="ai-cap-card__tags">
                <span v-for="tag in cap.tags" :key="tag" class="ai-cap-card__tag">{{ tag }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Tech Tags -->
      <div class="ai-tech-tags">
        <span v-for="tag in aiTechTags" :key="tag" class="ai-tech-tag">{{ tag }}</span>
      </div>

      <!-- CTA Button -->
      <div class="ai-showcase__cta">
        <a class="btn-primary" href="/components/thinking-indicator">
          <span>查看 AI 组件</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- Rest of page: constrained -->
  <div class="home-wrapper">

    <!-- Features -->
    <section class="features-section">
      <h2 class="section-title">为什么选择 Bobo-elements</h2>
      <p class="section-desc">围绕 AI 应用界面补齐高频交互，同时保留双框架基础组件能力</p>
      <div class="features-grid">
        <div class="feature-card" :class="{ 'feature-card--ai': f.highlight }" v-for="f in features" :key="f.title">
          <div class="feature-icon">{{ f.icon }}</div>
          <h3 class="feature-title">{{ f.title }}</h3>
          <p class="feature-desc">{{ f.details }}</p>
        </div>
      </div>
    </section>

    <!-- Components -->
    <section class="components-section">
      <h2 class="section-title">组件总览</h2>
      <p class="section-desc">9 个 AI 原生组件 + 17 个基础组件，覆盖全场景开发需求</p>
      <div class="component-groups">
        <div class="component-group" :class="{ 'component-group--ai': g.isAI }" v-for="g in componentGroups" :key="g.name">
          <h3 class="group-title">
            <span class="group-icon">{{ g.icon }}</span>
            {{ g.name }}
            <span v-if="g.isAI" class="group-badge">AI</span>
          </h3>
          <p v-if="g.desc" class="group-desc">{{ g.desc }}</p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import StreamingText from '../../../src/vue/components/StreamingText.vue'
import ThinkingIndicator from '../../../src/vue/components/ThinkingIndicator.vue'
import CodeBlock from '../../../src/vue/components/CodeBlock.vue'
import ReasoningBlock from '../../../src/vue/components/ReasoningBlock.vue'
import TokenBadge from '../../../src/vue/components/TokenBadge.vue'

const heroTags = ['AI 原生', 'Vue3', 'React', 'TypeScript', '流式输出']

const stats = [
  { value: '9', label: 'AI 组件', highlight: true },
  { value: '17', label: '基础组件' },
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

// ===== AI Showcase Demo =====
const demoPhase = ref(0)
const demoUserMsg = ref('')
const demoStreamText = ref('')
const demoReasonExpanded = ref(false)
const demoTimers: ReturnType<typeof setTimeout>[] = []

const demoScenarios = [
  {
    user: '帮我写一个防抖函数',
    thinking: 1200,
    streamText: '好的，这是一个通用的 TypeScript 防抖函数，支持自定义延迟和取消操作：',
    reasoning: '用户需要一个防抖函数，我需要考虑：泛型支持、返回值类型、cancel 和 flush 方法，以及正确的 this 绑定和定时器管理。',
    duration: 856,
    code: `type AnyFn = (...args: any[]) => any

function debounce<T extends AnyFn>(
  fn: T,
  delay: number
): T & { cancel: () => void; flush: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
      lastArgs = null
    }, delay)
  }) as T & { cancel: () => void; flush: () => void }

  debounced.cancel = () => {
    if (timer) { clearTimeout(timer); timer = null }
    lastArgs = null
  }

  debounced.flush = () => {
    if (timer && lastArgs) {
      fn(...lastArgs)
      clearTimeout(timer)
      timer = null
      lastArgs = null
    }
  }

  return debounced
}`,
    tokens: 1247,
    pause: 4000,
  },
  {
    user: '写一个 Python 快速排序',
    thinking: 980,
    streamText: '这是一个简洁的 Python 快速排序实现，使用列表推导式使代码更 Pythonic：',
    reasoning: '快速排序核心是分治思想：选基准值，分三部分（小于、等于、大于），递归拼接。列表推导式可以让实现更简洁。',
    duration: 620,
    code: `from typing import List

def quicksort(arr: List[int]) -> List[int]:
    """简洁的快速排序实现"""
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quicksort(left) + middle + quicksort(right)

# 使用示例
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))
# 输出: [1, 1, 2, 3, 6, 8, 10]`,
    tokens: 892,
    pause: 3500,
  },
]

const aiCapabilities = [
  { icon: '&#9889;', name: 'StreamingText', label: '流式文本', desc: '逐字流式输出，3 种光标样式，自动检测追加与重置', tags: ['逐字输出', '光标样式'], link: '/components/streaming-text' },
  { icon: '&#128187;', name: 'CodeBlock', label: '代码块', desc: '语法高亮 + 行号 + 一键复制，亮色 / 暗色主题切换', tags: ['语法高亮', '亮暗主题'], link: '/components/code-block' },
  { icon: '&#129504;', name: 'ReasoningBlock', label: '思维链', desc: '可折叠面板展示推理过程，附带耗时与 Token 元信息', tags: ['折叠展示', '元信息'], link: '/components/reasoning-block' },
  { icon: '&#128172;', name: 'ChatMessage', label: '聊天气泡', desc: '区分 user / assistant / system 角色，支持状态指示与重试', tags: ['多角色', '状态指示'], link: '/components/chat-message' },
  { icon: '&#9997;', name: 'PromptInput', label: '提示词输入', desc: '自适应高度，Enter 发送，流式输出时自动禁用', tags: ['自适应', '流式感知'], link: '/components/prompt-input' },
  { icon: '&#128203;', name: 'TokenBadge', label: 'Token 标签', desc: '显示 Token 消耗量，支持正常 / 警告 / 危险三种状态', tags: ['自动格式化', '状态色'], link: '/components/token-badge' },
]

function scheduleNext(fn: () => void, delay: number) {
  const t = setTimeout(fn, delay)
  demoTimers.push(t)
  return t
}

function runDemo() {
  const scenario = demoScenarios[demoPhase.value % demoScenarios.length]

  // Reset
  demoStreamText.value = ''
  demoReasonExpanded.value = false
  demoUserMsg.value = scenario.user

  // Phase 1: Thinking
  scheduleNext(() => {
    demoStreamText.value = '__thinking__'
  }, 600)

  // Phase 2: Streaming text
  scheduleNext(() => {
    demoStreamText.value = scenario.streamText
  }, 600 + scenario.thinking)

  // Phase 3: Reasoning + Code
  const streamDelay = scenario.streamText.length * 40 + 400
  scheduleNext(() => {
    demoStreamText.value = scenario.streamText + '__done__'
  }, 600 + scenario.thinking + streamDelay)

  scheduleNext(() => {
    demoStreamText.value = scenario.streamText + '__reasoning__'
  }, 600 + scenario.thinking + streamDelay + 400)

  scheduleNext(() => {
    demoStreamText.value = scenario.streamText + '__code__'
  }, 600 + scenario.thinking + streamDelay + 1800)

  scheduleNext(() => {
    demoStreamText.value = scenario.streamText + '__tokens__'
  }, 600 + scenario.thinking + streamDelay + 2200)

  // Next round
  const totalDelay = 600 + scenario.thinking + streamDelay + 2200 + scenario.pause
  scheduleNext(() => {
    demoPhase.value++
    runDemo()
  }, totalDelay)
}

onMounted(() => {
  scheduleNext(runDemo, 1500)
})

onUnmounted(() => {
  demoTimers.forEach(clearTimeout)
})

const currentScenario = computed(() => demoScenarios[demoPhase.value % demoScenarios.length])

const displayStreamText = computed(() => {
  const v = demoStreamText.value
  if (v === '__thinking__') return ''
  return v.replace(/__(done|reasoning|code|tokens)__$/, '')
})

const showReasoning = computed(() =>
  demoStreamText.value.endsWith('__reasoning__') ||
  demoStreamText.value.endsWith('__code__') ||
  demoStreamText.value.endsWith('__tokens__')
)
const showCode = computed(() =>
  demoStreamText.value.endsWith('__code__') || demoStreamText.value.endsWith('__tokens__')
)
const showTokens = computed(() => demoStreamText.value.endsWith('__tokens__'))

const aiTechTags = ['流式输出', '代码高亮', '思维链', '多轮对话', 'Token 统计', '自适应输入', '自动滚底', '亮暗主题', '无障碍', 'TypeScript']

const features = [
  {
    icon: '⚡',
    title: 'AI 原生 · 直接组合',
    details: '内置流式文本、思维链、代码块、聊天消息、Token 信息和对话列表，适合快速搭建智能应用界面。',
    highlight: true,
  },
  {
    icon: '📦',
    title: '双框架 · 一套体验',
    details: 'Vue3 与 React 组件目录独立，API 和视觉体验保持一致，团队切换框架时不用重学一套组件。',
  },
  {
    icon: '🔷',
    title: 'TypeScript · 类型安全',
    details: '100% TypeScript 编写，完整的类型推导与智能提示，开发体验拉满。',
  },
  {
    icon: '🎨',
    title: '样式共享 · 视觉统一',
    details: '基础组件和 AI 组件共用样式体系，Vue 与 React 项目可以保持一致的产品界面。',
  },
  {
    icon: '✅',
    title: '交互细节 · 开箱即用',
    details: '对复制、加载、自动滚动、清除按钮、光标状态等常见 AI 产品交互做了内置处理。',
  },
  {
    icon: '🧩',
    title: '26 个组件 · 覆盖全场景',
    details: '9 个 AI 原生组件配合 17 个基础组件，从对话体验到表单、反馈和数据展示都能衔接使用。',
  },
]

const componentGroups = [
  {
    name: 'AI 组件',
    icon: '🤖',
    isAI: true,
    desc: '面向 AI 对话、流式输出、代码解释、Markdown 渲染和历史消息列表的高频组件。',
    items: [
      { name: 'ThinkingIndicator', label: '思考指示器', link: 'thinking-indicator', vue: true, react: true },
      { name: 'StreamingText', label: '流式文本', link: 'streaming-text', vue: true, react: true },
      { name: 'CodeBlock', label: '代码块', link: 'code-block', vue: true, react: true },
      { name: 'PromptInput', label: '提示词输入', link: 'prompt-input', vue: true, react: true },
      { name: 'ReasoningBlock', label: '思维链', link: 'reasoning-block', vue: true, react: true },
      { name: 'ChatMessage', label: '聊天气泡', link: 'chat-message', vue: true, react: true },
      { name: 'TokenBadge', label: 'Token 标签', link: 'token-badge', vue: true, react: true },
      { name: 'MarkdownRenderer', label: 'Markdown 渲染', link: 'markdown-renderer', vue: true, react: true },
      { name: 'ConversationList', label: '对话列表', link: 'conversation-list', vue: true, react: true },
    ],
  },
  {
    name: '基础组件',
    icon: '🧱',
    items: [
      { name: 'Button', label: '按钮', link: 'button', vue: true, react: true },
      { name: 'Icon', label: '图标', link: 'button', vue: true, react: true },
      { name: 'Alert', label: '提示', link: 'alert', vue: true, react: true },
      { name: 'Tag', label: '标签', link: 'tag', vue: true, react: true },
    ],
  },
  {
    name: '表单组件',
    icon: '📝',
    items: [
      { name: 'Form', label: '表单', link: 'form', vue: true, react: true },
      { name: 'Input', label: '输入框', link: 'input', vue: true, react: true },
      { name: 'Select', label: '选择器', link: 'select', vue: true, react: true },
      { name: 'Switch', label: '开关', link: 'switch', vue: true, react: true },
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
  align-items: center;
  min-width: 64px;
  text-align: center;
  position: relative;
  padding: 4px 0;
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

.stat-item--ai {
  min-width: 108px;
  padding: 10px 16px;
  border: 1px solid rgba(100, 108, 255, 0.18);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(100, 108, 255, 0.1), rgba(66, 184, 131, 0.08));
  box-shadow: 0 12px 28px rgba(100, 108, 255, 0.12);
}

.stat-item--ai .stat-number {
  background: linear-gradient(135deg, #646cff, #42b883);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-item--ai .stat-label {
  color: var(--vp-c-text-1);
  font-weight: 700;
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

.feature-card--ai {
  border-color: rgba(100, 108, 255, 0.2);
  background:
    linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
    linear-gradient(135deg, rgba(100, 108, 255, 0.32), rgba(66, 184, 131, 0.24)) border-box;
  box-shadow: 0 12px 30px rgba(100, 108, 255, 0.08);
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
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.component-group:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.dark .component-group:hover {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
}

.component-group--ai {
  grid-column: 1 / -1;
  position: relative;
  overflow: hidden;
  border-color: transparent;
  background:
    linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
    linear-gradient(135deg, rgba(100, 108, 255, 0.45), rgba(66, 184, 131, 0.38)) border-box;
  box-shadow: 0 18px 48px rgba(100, 108, 255, 0.1);
}

.component-group--ai::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(100, 108, 255, 0.08), rgba(66, 184, 131, 0.06));
  pointer-events: none;
}

.component-group--ai > * {
  position: relative;
}

.component-group--ai .group-items {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.component-group--ai .component-item {
  border: 1px solid rgba(100, 108, 255, 0.12);
  background: rgba(100, 108, 255, 0.06);
}

.component-group--ai .component-item:hover {
  border-color: rgba(100, 108, 255, 0.32);
  background: rgba(100, 108, 255, 0.11);
}

.dark .component-group--ai {
  background:
    linear-gradient(rgba(25, 25, 40, 0.88), rgba(25, 25, 40, 0.88)) padding-box,
    linear-gradient(135deg, rgba(100, 108, 255, 0.55), rgba(66, 184, 131, 0.42)) border-box;
}

.group-badge {
  margin-left: auto;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
  color: #fff;
  background: linear-gradient(135deg, #646cff, #42b883);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.28);
}

.group-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-desc {
  margin: -4px 0 18px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.7;
}

.component-group--ai .group-desc {
  max-width: 720px;
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
  min-width: 0;
  min-height: 44px;
}

.component-item:hover {
  background: var(--vp-c-brand-soft);
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  min-width: 100px;
  overflow-wrap: anywhere;
}

.item-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  flex: 1;
  min-width: 0;
  white-space: nowrap;
}

.item-frameworks {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
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

/* ===== AI Showcase ===== */
.ai-showcase {
  --ai-bg: #f5f5fa;
  --ai-bg-deep: #eaeaf2;
  --ai-text: #1a1a2e;
  --ai-text-muted: #6a6a8a;
  --ai-text-dim: #9a9ab0;
  --ai-border: rgba(0, 0, 0, 0.08);
  --ai-card-bg: #ffffff;
  --ai-card-hover: rgba(100, 108, 255, 0.04);
  --ai-accent: #646cff;
  --ai-accent-soft: rgba(100, 108, 255, 0.08);
  --ai-green: #42b883;
  --ai-chat-bg: #ffffff;
  --ai-chat-header: #f8f8fc;
  --ai-chat-input-bg: #f5f5fa;
  --ai-bubble-user: linear-gradient(135deg, #3451b2, #646cff);
  --ai-bubble-assistant-bg: #f0f0f8;
  --ai-bubble-assistant-text: #2a2a4a;
  --ai-tag-bg: rgba(100, 108, 255, 0.08);
  --ai-tag-text: #5a5a8a;

  position: relative;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  background: linear-gradient(to bottom, var(--vp-c-bg) 0px, var(--ai-bg) 140px);
  padding: 80px 0;
  overflow: hidden;
}

.dark .ai-showcase {
  --ai-bg: #0f0f1a;
  --ai-bg-deep: #0a0a14;
  --ai-text: rgba(255, 255, 255, 0.9);
  --ai-text-muted: rgba(255, 255, 255, 0.5);
  --ai-text-dim: rgba(255, 255, 255, 0.35);
  --ai-border: rgba(255, 255, 255, 0.06);
  --ai-card-bg: rgba(255, 255, 255, 0.03);
  --ai-card-hover: rgba(100, 108, 255, 0.08);
  --ai-accent-soft: rgba(100, 108, 255, 0.1);
  --ai-chat-bg: #1a1a2e;
  --ai-chat-header: rgba(255, 255, 255, 0.03);
  --ai-chat-input-bg: rgba(255, 255, 255, 0.02);
  --ai-bubble-assistant-bg: rgba(255, 255, 255, 0.06);
  --ai-bubble-assistant-text: rgba(255, 255, 255, 0.9);
  --ai-tag-bg: rgba(100, 108, 255, 0.1);
  --ai-tag-text: rgba(255, 255, 255, 0.5);

  background: linear-gradient(to bottom, var(--vp-c-bg) 0px, var(--ai-bg) 140px);
}

.ai-showcase::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 20%, rgba(100, 108, 255, 0.04), transparent),
    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(66, 184, 131, 0.03), transparent);
  pointer-events: none;
}

.dark .ai-showcase::before {
  background:
    radial-gradient(ellipse 60% 50% at 20% 20%, rgba(100, 108, 255, 0.06), transparent),
    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(66, 184, 131, 0.04), transparent);
}

.ai-showcase__inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ai-showcase__header {
  text-align: center;
  margin-bottom: 48px;
}

.ai-showcase__title {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 12px;
  background: linear-gradient(135deg, #646cff, #42b883);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-showcase__subtitle {
  font-size: 18px;
  color: var(--ai-text-muted);
  margin: 0;
}

.ai-showcase__content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* Chat Demo Window */
.ai-demo {
  flex: 1.2;
  min-width: 0;
}

.ai-demo__window {
  background: var(--ai-chat-bg);
  border-radius: 16px;
  border: 1px solid var(--ai-border);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  min-width: 0;
  max-width: 100%;
}

.dark .ai-demo__window {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.ai-demo__titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: var(--ai-chat-header);
  border-bottom: 1px solid var(--ai-border);
}

.ai-demo__dots {
  display: flex;
  gap: 6px;
}

.ai-demo__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.ai-demo__dots span:nth-child(1) { background: #ff5f57; }
.ai-demo__dots span:nth-child(2) { background: #febc2e; }
.ai-demo__dots span:nth-child(3) { background: #28c840; }

.ai-demo__title-text {
  font-size: 13px;
  color: var(--ai-text-dim);
  font-weight: 500;
}

.ai-demo__messages {
  padding: 24px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  overflow-x: hidden;
}

.ai-demo__msg {
  display: flex;
  min-width: 0;
  max-width: 100%;
  animation: demo-msg-in 0.35s ease;
}

.ai-demo__msg--user {
  justify-content: flex-end;
}

.ai-demo__msg--assistant {
  justify-content: flex-start;
}

@keyframes demo-msg-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ai-demo__bubble {
  max-width: 85%;
  min-width: 0;
  overflow-wrap: anywhere;
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.7;
}

.ai-demo__bubble > * {
  max-width: 100%;
}

.ai-demo__bubble--user {
  background: linear-gradient(135deg, #3451b2, #646cff);
  color: #fff;
  border-top-right-radius: 4px;
}

.ai-demo__bubble--assistant {
  background: var(--ai-bubble-assistant-bg);
  color: var(--ai-bubble-assistant-text);
  border-top-left-radius: 4px;
}

.ai-demo__section {
  margin-top: 12px;
}

.ai-demo__tokens {
  margin-top: 12px;
  display: flex;
}

.ai-demo__input-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid var(--ai-border);
  background: var(--ai-chat-input-bg);
}

.ai-demo__input-text {
  font-size: 14px;
  color: var(--ai-text-dim);
}

.ai-demo__send-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3451b2, #646cff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

/* Capability Cards */
.ai-caps {
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-cap-card {
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--ai-border);
  background: var(--ai-card-bg);
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.ai-cap-card:hover {
  border-color: rgba(100, 108, 255, 0.3);
  background: var(--ai-card-hover);
  transform: translateX(-4px);
}

.ai-cap-card__icon {
  font-size: 22px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--ai-accent-soft);
}

.ai-cap-card__info {
  flex: 1;
  min-width: 0;
}

.ai-cap-card__head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.ai-cap-card__name {
  font-size: 14px;
  font-weight: 700;
  color: var(--ai-text);
  font-family: var(--vp-font-family-mono);
}

.ai-cap-card__label {
  font-size: 12px;
  color: var(--ai-text-dim);
}

.ai-cap-card__desc {
  font-size: 13px;
  color: var(--ai-text-muted);
  line-height: 1.5;
  margin: 0 0 8px;
}

.ai-cap-card__tags {
  display: flex;
  gap: 6px;
}

.ai-cap-card__tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--ai-tag-bg);
  color: var(--ai-tag-text);
}

/* Tech Tags */
.ai-tech-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--ai-border);
}

.ai-tech-tag {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  color: var(--ai-text-muted);
  border: 1px solid var(--ai-border);
  transition: all 0.2s;
}

.ai-tech-tag:hover {
  color: var(--ai-accent);
  border-color: rgba(100, 108, 255, 0.3);
  background: var(--ai-accent-soft);
}

.ai-showcase__cta {
  display: flex;
  justify-content: center;
  margin-top: 32px;
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

  .ai-showcase__content {
    flex-direction: column;
  }

  .ai-caps {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .component-group--ai .group-items {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  .component-group--ai .group-items {
    grid-template-columns: 1fr;
  }

  .usage-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .ai-showcase {
    padding: 50px 0;
  }

  .ai-showcase__title {
    font-size: 28px;
  }

  .ai-showcase__subtitle {
    font-size: 15px;
  }

  .ai-demo__messages {
    min-height: 300px;
    padding: 16px;
  }

  .ai-caps {
    grid-template-columns: 1fr;
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
