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
          18 个 AI 原生组件 + 17 个基础组件，Vue3 与 React 共享核心<br />
          覆盖流式对话、代码展示、思维链、工具调用、RAG 溯源等智能应用场景
        </p>
        <div class="hero-actions">
          <a class="btn-primary" href="/guide/quickstart">
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

  <!-- AI Showcase：全真实组件组合的交互式 AI Workspace -->
  <section class="ai-showcase">
    <div class="ai-showcase__inner">
      <div class="ai-showcase__header">
        <div class="ai-showcase__eyebrow">18 个 AI 原生组件 + 双端流式 Hooks</div>
        <h2 class="ai-showcase__title">交互式 AI 工作台，开箱即用</h2>
        <p class="ai-showcase__subtitle">
          下面整个演示窗口均由 Bobo-elements 真实组件直接组合而成——可切换场景、审批工具调用、体验流式发送与明暗主题切换
        </p>
      </div>

      <!-- 交互式 AI Workspace 窗口 -->
      <div
        class="ai-workspace"
        :class="[
          workspaceDark ? 'dark ai-workspace--dark' : 'ai-workspace--light'
        ]"
        :data-theme="workspaceDark ? 'dark' : 'light'"
      >
        <!-- 窗口标题栏 + 明暗主题切换 -->
        <div class="ai-workspace__titlebar">
          <div class="ai-workspace__dots">
            <span /><span /><span />
          </div>
          <span class="ai-workspace__title-text">Bobo AI Workspace</span>
          <div class="ai-workspace__theme-switch" role="group" aria-label="演示区明暗主题切换">
            <button
              type="button"
              class="ws-theme-btn"
              :class="{ 'is-active': workspaceThemeMode === 'auto' }"
              @click="workspaceThemeMode = 'auto'"
            >
              跟随站点
            </button>
            <button
              type="button"
              class="ws-theme-btn"
              :class="{ 'is-active': workspaceThemeMode === 'light' }"
              @click="workspaceThemeMode = 'light'"
            >
              浅色
            </button>
            <button
              type="button"
              class="ws-theme-btn"
              :class="{ 'is-active': workspaceThemeMode === 'dark' }"
              @click="workspaceThemeMode = 'dark'"
            >
              深色
            </button>
          </div>
        </div>

        <!-- 移动端场景切换栏 -->
        <div class="ai-workspace__mobile-tabs">
          <button
            v-for="s in workspaceSessions"
            :key="s.id"
            type="button"
            class="ws-mobile-tab"
            :class="{ 'is-active': activeSceneId === s.id }"
            @click="selectScene(s.id)"
          >
            {{ s.title }}
          </button>
        </div>

        <div class="ai-workspace__body">
          <!-- 左侧会话侧栏：真实 SessionList -->
          <div class="ai-workspace__sidebar">
            <SessionList
              :items="workspaceSessions"
              :active-id="activeSceneId"
              searchable
              search-placeholder="筛选演示场景..."
              create-text="开屏引导"
              @select="(item) => selectScene(item.id)"
              @create="selectScene('welcome')"
            />
          </div>

          <!-- 右侧对话主区 -->
          <div class="ai-workspace__main">
            <!-- 顶部栏：真实 ModelSelector + TokenBadge -->
            <div class="ai-workspace__topbar">
              <ModelSelector v-model="selectedModelId" :models="workspaceModels" size="small" />
              <TokenBadge
                :used="currentTokenStats.used"
                :total="128000"
                :input-tokens="currentTokenStats.input"
                :output-tokens="currentTokenStats.output"
                auto-status
                show-progress
                size="small"
              />
            </div>

            <!-- 对话消息区：真实 ConversationList -->
            <ConversationList ref="workspaceListRef" height="430px" :show-scroll-to-bottom="true">
              <!-- 场景 1：Welcome + Prompts（空状态引导） -->
              <template v-if="activeSceneId === 'welcome' && liveMessages.length === 0" #empty>
                <div class="ws-welcome-wrap">
                  <Welcome
                    align="center"
                    variant="filled"
                    title="你好，我是 Bobo AI 助手"
                    description="点击下方任意推荐词，立即体验流式回复、思维链与代码块组合效果。"
                  >
                    <Prompts
                      :items="welcomePrompts"
                      layout="grid"
                      variant="card"
                      @select="handlePromptSelect"
                    />
                  </Welcome>
                </div>
              </template>

              <!-- 场景 2：流式推理 + 代码块 + MessageActions -->
              <template v-if="activeSceneId === 'streaming'">
                <ChatMessage role="user" :timestamp="demoTime1">
                  帮我写一个支持 cancel 和 flush 的 TypeScript 防抖函数
                </ChatMessage>
                <ChatMessage
                  role="assistant"
                  sender-name="Bobo AI"
                  :timestamp="demoTime2"
                >
                  <div class="ws-msg-stack">
                    <ReasoningBlock
                      title="深度推理过程"
                      status="done"
                      :duration="856"
                      :token-count="320"
                    >
                      1. 定义通用函数泛型签名，保留原参数推导；2. 维护 timer 与 lastArgs 闭包状态；3. 补充 cancel 清理定时器与 flush 立即执行能力。
                    </ReasoningBlock>
                    <MarkdownRenderer :content="streamingAnswerIntro" :code-copyable="false" />
                    <div class="ws-streaming-note">
                      <StreamingText
                        text="流式输出就绪 · 可点击下方分支切换或重新生成对比不同实现"
                        :speed="2"
                        :interval="32"
                      />
                    </div>
                    <CodeBlock
                      :code="currentBranchCode"
                      language="typescript"
                      title="debounce.ts"
                      :theme="workspaceDark ? 'dark' : 'light'"
                      show-line-numbers
                      collapsible
                      show-wrap-toggle
                      max-height="210px"
                    />
                    <MessageActions
                      :content="currentBranchCode"
                      regenerable
                      :feedback="msgFeedback"
                      :branch-index="msgBranch"
                      :branch-total="3"
                      @feedback="(val) => (msgFeedback = val)"
                      @branch-change="(idx) => (msgBranch = idx)"
                      @regenerate="handleRegenerateDemo"
                    />
                  </div>
                </ChatMessage>
              </template>

              <!-- 场景 3：Agent 工具调用审批 + RAG 参考来源 -->
              <template v-else-if="activeSceneId === 'agent'">
                <ChatMessage role="user" :timestamp="demoTime1">
                  帮我排查订单表慢查询，并给出索引优化依据
                </ChatMessage>
                <ChatMessage role="assistant" sender-name="SQL Agent" :timestamp="demoTime2">
                  <div class="ws-msg-stack">
                    <ToolCall
                      title="执行 SQL 诊断分析"
                      tool-name="run_sql"
                      :status="toolStatus"
                      :duration="toolStatus === 'success' ? 184 : undefined"
                      :default-expanded="true"
                      :args="{ table: 'orders', analyze: true }"
                      :result="toolStatus === 'success' ? { scanType: 'Seq Scan', suggestIndex: 'idx_orders_created_at' } : undefined"
                      :error-message="toolStatus === 'error' ? '用户已拒绝执行该数据库诊断操作' : undefined"
                      @approve="toolStatus = 'success'"
                      @reject="toolStatus = 'error'"
                    />
                    <MarkdownRenderer
                      content="建议为 `orders(created_at)` 添加联合索引，可将全表扫描耗时从 **1.4s** 降至 **12ms**。"
                      :code-copyable="false"
                    />
                    <Sources :items="ragSources" variant="cards" :default-expanded="true" />
                  </div>
                </ChatMessage>
              </template>

              <!-- 场景 4：AI 代码重构 Diff 对比 -->
              <template v-else-if="activeSceneId === 'diff'">
                <ChatMessage role="user" :timestamp="demoTime1">
                  帮我把 greet 函数重构为模板字符串并支持默认参数
                </ChatMessage>
                <ChatMessage role="assistant" sender-name="Code Reviewer" :timestamp="demoTime2">
                  <div class="ws-msg-stack">
                    <DiffCodeBlock
                      title="src/utils/greet.ts"
                      :old-code="diffOldCode"
                      :new-code="diffNewCode"
                      :theme="workspaceDark ? 'dark' : 'light'"
                      actionable
                      @apply="diffDecision = 'applied'"
                      @reject="diffDecision = 'rejected'"
                    />
                    <div v-if="diffDecision" class="ws-diff-feedback">
                      {{ diffDecision === 'applied' ? '✓ 已将修改应用到工作区' : '✕ 已忽略本次变更建议' }}
                    </div>
                  </div>
                </ChatMessage>
              </template>

              <!-- 用户在演示框发送或点击推荐词产生的实时模拟对话 -->
              <template v-for="msg in liveMessages" :key="msg.id">
                <ChatMessage
                  :role="msg.role"
                  :sender-name="msg.role === 'assistant' ? currentModelLabel : undefined"
                  :status="msg.status"
                  :timestamp="msg.timestamp"
                >
                  <template v-if="msg.role === 'user'">
                    {{ msg.content }}
                  </template>
                  <template v-else>
                    <div class="ws-msg-stack">
                      <ThinkingIndicator
                        v-if="msg.status === 'streaming' && !msg.content"
                        variant="wave"
                        size="small"
                        text="正在生成回答..."
                      />
                      <template v-else>
                        <ReasoningBlock
                          v-if="msg.reasoning"
                          title="深度思考"
                          :status="msg.status === 'streaming' ? 'thinking' : 'done'"
                          :duration="640"
                          :token-count="128"
                        >
                          {{ msg.reasoning }}
                        </ReasoningBlock>
                        <MarkdownRenderer
                          :content="msg.content"
                          :streaming="msg.status === 'streaming'"
                        />
                        <MessageActions
                          v-if="msg.status === 'sent'"
                          :content="msg.content"
                          :feedback="null"
                        />
                      </template>
                    </div>
                  </template>
                </ChatMessage>
              </template>
            </ConversationList>

            <!-- 底部输入区：真实 PromptInput + Attachment -->
            <div class="ai-workspace__composer">
              <PromptInput
                v-model="chatInput"
                size="small"
                clearable
                stoppable
                :streaming="isSimulating"
                placeholder="输入问题体验流式回复（Enter 发送）..."
                hint-text="Enter 发送 · 点击左侧列表切换不同组件场景"
                @submit="handleWorkspaceSubmit"
                @stop="stopSimulation"
              >
                <template v-if="workspaceAttachments.length > 0" #header>
                  <Attachment :items="workspaceAttachments" @remove="removeAttachment" />
                </template>
                <template #toolbar>
                  <button
                    type="button"
                    class="ws-toolbar-chip"
                    :class="{ 'is-active': deepThinkEnabled }"
                    @click="deepThinkEnabled = !deepThinkEnabled"
                  >
                    深度思考
                  </button>
                  <button
                    v-if="workspaceAttachments.length === 0"
                    type="button"
                    class="ws-toolbar-chip"
                    @click="restoreAttachments"
                  >
                    恢复示例附件
                  </button>
                </template>
              </PromptInput>
            </div>
          </div>
        </div>
      </div>

      <!-- 4 象限 AI 能力快速直达 -->
      <div class="ai-matrix">
        <div v-for="group in aiCapabilityMatrix" :key="group.title" class="ai-matrix-card">
          <div class="ai-matrix-card__head">
            <span class="ai-matrix-card__title">{{ group.title }}</span>
            <span class="ai-matrix-card__count">{{ group.items.length }}</span>
          </div>
          <p class="ai-matrix-card__desc">{{ group.desc }}</p>
          <div class="ai-matrix-card__links">
            <a
              v-for="item in group.items"
              :key="item.name"
              :href="`/components/${item.link}`"
              class="ai-matrix-pill"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="ai-showcase__cta">
        <a class="btn-primary" href="/components/thinking-indicator">
          <span>查看全部 18 个 AI 组件</span>
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
      <p class="section-desc">18 个 AI 原生组件 + 17 个基础组件，覆盖全场景开发需求</p>
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
            <pre><code><span class="code-keyword">import</span> { ChatMessage, PromptInput } <span class="code-keyword">from</span> <span class="code-string">'@bobocn/element/vue'</span>

<span class="code-comment">&lt;template&gt;</span>
  <span class="code-tag">&lt;ChatMessage</span> <span class="code-attr">role</span>=<span class="code-string">"assistant"</span><span class="code-tag">&gt;</span>你好，有什么可以帮您？<span class="code-tag">&lt;/ChatMessage&gt;</span>
  <span class="code-tag">&lt;PromptInput</span> <span class="code-attr">v-model</span>=<span class="code-string">"prompt"</span> <span class="code-attr">stoppable</span> <span class="code-attr">@submit</span>=<span class="code-string">"send"</span> <span class="code-tag">/&gt;</span>
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
            <pre><code><span class="code-keyword">import</span> { ChatMessage, PromptInput } <span class="code-keyword">from</span> <span class="code-string">'@bobocn/element/react'</span>

<span class="code-keyword">function</span> <span class="code-func">App</span>() {
  <span class="code-keyword">return</span> (
    &lt;&gt;
      <span class="code-tag">&lt;ChatMessage</span> <span class="code-attr">role</span>=<span class="code-string">"assistant"</span><span class="code-tag">&gt;</span>你好，有什么可以帮您？<span class="code-tag">&lt;/ChatMessage&gt;</span>
      <span class="code-tag">&lt;PromptInput</span> <span class="code-attr">value</span>=<span class="code-string">{prompt}</span> <span class="code-attr">stoppable</span> <span class="code-attr">onSubmit</span>=<span class="code-string">{send}</span> <span class="code-tag">/&gt;</span>
    &lt;/&gt;
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
        <a class="btn-primary" href="/guide/quickstart">阅读文档</a>
        <a class="btn-outline" href="https://github.com/BoBo-v/Bobo-elements.git" target="_blank">Star on GitHub</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import ThinkingIndicator from '../../../src/vue/components/ThinkingIndicator.vue'
import StreamingText from '../../../src/vue/components/StreamingText.vue'
import CodeBlock from '../../../src/vue/components/CodeBlock.vue'
import ReasoningBlock from '../../../src/vue/components/ReasoningBlock.vue'
import TokenBadge from '../../../src/vue/components/TokenBadge.vue'
import MarkdownRenderer from '../../../src/vue/components/MarkdownRenderer.vue'
import ChatMessage from '../../../src/vue/components/ChatMessage.vue'
import ConversationList from '../../../src/vue/components/ConversationList.vue'
import PromptInput from '../../../src/vue/components/PromptInput.vue'
import Welcome from '../../../src/vue/components/Welcome.vue'
import Prompts from '../../../src/vue/components/Prompts.vue'
import Attachment from '../../../src/vue/components/Attachment.vue'
import ToolCall from '../../../src/vue/components/ToolCall.vue'
import Sources from '../../../src/vue/components/Sources.vue'
import SessionList from '../../../src/vue/components/SessionList.vue'
import MessageActions from '../../../src/vue/components/MessageActions.vue'
import DiffCodeBlock from '../../../src/vue/components/DiffCodeBlock.vue'
import ModelSelector from '../../../src/vue/components/ModelSelector.vue'
import type { AttachmentItem } from '../../../src/core/components/attachment.types'
import type { PromptItem } from '../../../src/core/components/prompts.types'
import type { ToolCallStatus } from '../../../src/core/components/tool-call.types'
import type { FeedbackValue } from '../../../src/core/components/message-actions.types'

const { isDark } = useData()

const heroTags = ['AI 原生', 'Vue3', 'React', 'TypeScript', '流式输出']

const stats = [
  { value: '18', label: 'AI 组件', highlight: true },
  { value: '17', label: '基础组件' },
  { value: '2', label: '框架' },
  { value: '100%', label: 'TypeScript' },
]

// 固定粒子坐标，避免 SSR 与客户端水合不一致
const particlePositions = Array.from({ length: 24 }, (_, idx) => ({
  x: ((idx * 37) % 94) + 3,
  y: ((idx * 53) % 90) + 5,
  delay: (idx % 8) * 0.9,
  duration: 4 + (idx % 5) * 1.1,
  size: 2 + (idx % 4),
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

// ===== 交互式 AI Workspace 演示控制 =====
const workspaceThemeMode = ref<'auto' | 'light' | 'dark'>('auto')
const workspaceDark = computed(() =>
  workspaceThemeMode.value === 'auto' ? isDark.value : workspaceThemeMode.value === 'dark'
)

const activeSceneId = ref<'welcome' | 'streaming' | 'agent' | 'diff'>('streaming')
const workspaceSessions = [
  { id: 'streaming', title: '流式推理 · Code & Reasoning', pinned: true },
  { id: 'agent', title: 'Agent · 工具审批与溯源', updatedAt: new Date() },
  { id: 'diff', title: '代码评审 · Diff 对比', updatedAt: new Date() },
  { id: 'welcome', title: '开屏引导 · Welcome + Prompts', updatedAt: new Date(Date.now() - 86_400_000 * 2) },
]

const selectedModelId = ref('gpt-4o')
const workspaceModels = [
  { id: 'gpt-4o', name: 'GPT-4o', contextLength: '128K', description: '通用多模态旗舰模型', tags: ['Vision', 'Tools'] },
  { id: 'deepseek-r1', name: 'DeepSeek-R1', contextLength: '64K', description: '强推理思维链模型', tags: ['Thinking'] },
  { id: 'claude-3-7', name: 'Claude 3.7', contextLength: '200K', description: '代码生成与架构分析', tags: ['Coding', 'Agent'] },
]

const currentModelLabel = computed(
  () => workspaceModels.find(m => m.id === selectedModelId.value)?.name || 'Bobo AI'
)

const demoTime1 = new Date(Date.now() - 120_000)
const demoTime2 = new Date(Date.now() - 60_000)

// 场景 1：Welcome + Prompts
const welcomePrompts: PromptItem[] = [
  { key: 'debounce', label: '写一个 TypeScript 防抖函数', description: '支持 cancel 与 flush 方法', icon: 'code' },
  { key: 'sql', label: '排查订单表慢查询原因', description: '给出索引优化与执行计划建议', icon: 'bolt' },
]

// 场景 2：Streaming + Code + Actions
const streamingAnswerIntro = '好的，这是一个通用的 **TypeScript 防抖函数**，支持自定义延迟、取消与立即执行：'
const branchCodes = [
  `export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300
) {
  let timer: ReturnType<typeof setTimeout> | null = null
  const debounced = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
  debounced.cancel = () => { if (timer) clearTimeout(timer) }
  return debounced
}`,
  `export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  const run = (...args: Parameters<T>) => {
    lastArgs = args
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { fn(...args); timer = null }, delay)
  }
  run.flush = () => { if (timer && lastArgs) { fn(...lastArgs); clearTimeout(timer) } }
  return run
}`,
  `// 极简防抖 Hook 封装
export const useDebounceFn = <T extends (...args: any[]) => any>(fn: T, ms = 250) => {
  let id: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    clearTimeout(id)
    id = setTimeout(() => fn(...args), ms)
  }
}`
]
const msgBranch = ref(1)
const msgFeedback = ref<FeedbackValue>(null)
const currentBranchCode = computed(() => branchCodes[(msgBranch.value - 1) % branchCodes.length])

// 场景 3：ToolCall + Sources
const toolStatus = ref<ToolCallStatus>('awaiting-approval')
const ragSources = [
  { id: 1, title: 'PostgreSQL 索引优化最佳实践', url: 'https://www.postgresql.org/docs/', domain: 'postgresql.org', snippet: '针对高频范围查询建议为排序与过滤列建立 B-Tree 复合索引。' },
  { id: 2, title: '慢查询日志分析规范', url: 'https://www.bobocn.cloud/', domain: 'bobocn.cloud', snippet: '结合 EXPLAIN ANALYZE 定位 Seq Scan 全表扫描节点。' },
]

// 场景 4：DiffCodeBlock
const diffOldCode = `function greet(name: string) {
  return 'Hello ' + name
}`
const diffNewCode = `function greet(name = 'Developer') {
  return \`Hello, \${name}!\`
}`
const diffDecision = ref<'applied' | 'rejected' | null>(null)

// 附件与实时流式对话模拟
const defaultAttachments: AttachmentItem[] = [
  { id: 'att-1', name: 'slow_query.log', size: 18432, status: 'done' },
  { id: 'att-2', name: 'schema.sql', size: 6144, status: 'done' },
]
const workspaceAttachments = ref<AttachmentItem[]>([...defaultAttachments])
const deepThinkEnabled = ref(true)
const chatInput = ref('')
const isSimulating = ref(false)
const workspaceListRef = ref<{ scrollToBottom: () => void } | null>(null)

interface LiveDemoMsg {
  id: string
  role: 'user' | 'assistant'
  content: string
  reasoning?: string
  status: 'sent' | 'streaming'
  timestamp: Date
}
const liveMessages = ref<LiveDemoMsg[]>([])
let simTimer: ReturnType<typeof setInterval> | null = null
let simTimeout: ReturnType<typeof setTimeout> | null = null

const currentTokenStats = computed(() => {
  const baseByScene: Record<string, { used: number; input: number; output: number }> = {
    welcome: { used: 320, input: 240, output: 80 },
    streaming: { used: 1247, input: 420, output: 827 },
    agent: { used: 2680, input: 1420, output: 1260 },
    diff: { used: 960, input: 510, output: 450 },
  }
  const base = baseByScene[activeSceneId.value] || baseByScene.streaming
  const extra = liveMessages.value.length * 180
  return {
    used: base.used + extra,
    input: base.input + Math.round(extra * 0.4),
    output: base.output + Math.round(extra * 0.6),
  }
})

function stopSimulation() {
  if (simTimeout) { clearTimeout(simTimeout); simTimeout = null }
  if (simTimer) { clearInterval(simTimer); simTimer = null }
  isSimulating.value = false
  const last = liveMessages.value[liveMessages.value.length - 1]
  if (last && last.status === 'streaming') {
    last.status = 'sent'
  }
}

function selectScene(id: string) {
  stopSimulation()
  liveMessages.value = []
  activeSceneId.value = id as typeof activeSceneId.value
  if (id === 'agent') toolStatus.value = 'awaiting-approval'
  if (id === 'diff') diffDecision.value = null
}

function removeAttachment(item: AttachmentItem) {
  workspaceAttachments.value = workspaceAttachments.value.filter(f => f.id !== item.id)
}

function restoreAttachments() {
  workspaceAttachments.value = [...defaultAttachments]
}

function handlePromptSelect(item: PromptItem) {
  handleWorkspaceSubmit(item.label)
}

function handleRegenerateDemo() {
  msgBranch.value = (msgBranch.value % 3) + 1
}

function handleWorkspaceSubmit(text: string) {
  const trimmed = text.trim()
  if (!trimmed || isSimulating.value) return

  chatInput.value = ''
  const userId = `u_${Date.now()}`
  const assistantId = `a_${Date.now()}`
  liveMessages.value.push({
    id: userId,
    role: 'user',
    content: trimmed,
    status: 'sent',
    timestamp: new Date(),
  })
  liveMessages.value.push({
    id: assistantId,
    role: 'assistant',
    content: '',
    reasoning: deepThinkEnabled.value ? `已分析问题「${trimmed}」，正在组织结构化代码与排查思路...` : undefined,
    status: 'streaming',
    timestamp: new Date(),
  })

  isSimulating.value = true
  const replyText = `收到你的问题：**${trimmed}**\n\n当前由 \`${currentModelLabel.value}\` 模拟流式响应：\n- 已接入 \`ConversationList\` 自动滚底与 \`MarkdownRenderer\` 流式容错渲染\n- 你可以随时点击右下角 **停止** 按钮中断生成。`

  simTimeout = setTimeout(() => {
    let cursor = 0
    simTimer = setInterval(() => {
      const target = liveMessages.value.find(m => m.id === assistantId)
      if (!target) {
        stopSimulation()
        return
      }
      cursor = Math.min(cursor + 4, replyText.length)
      target.content = replyText.slice(0, cursor)
      if (cursor >= replyText.length) {
        target.status = 'sent'
        stopSimulation()
      }
    }, 28)
  }, 450)
}

onUnmounted(stopSimulation)

const aiCapabilityMatrix = [
  {
    title: '对话与引导',
    desc: '覆盖开屏引导、推荐词、多模态附件与消息气泡容器。',
    items: [
      { name: 'ConversationList', link: 'conversation-list' },
      { name: 'ChatMessage', link: 'chat-message' },
      { name: 'PromptInput', link: 'prompt-input' },
      { name: 'Welcome', link: 'welcome' },
      { name: 'Prompts', link: 'prompts' },
      { name: 'Attachment', link: 'attachment' },
    ],
  },
  {
    title: '内容与流式渲染',
    desc: '字素簇流式吐字、流式 Markdown 容错、词法高亮与代码 Diff。',
    items: [
      { name: 'StreamingText', link: 'streaming-text' },
      { name: 'MarkdownRenderer', link: 'markdown-renderer' },
      { name: 'CodeBlock', link: 'code-block' },
      { name: 'DiffCodeBlock', link: 'diff-code-block' },
    ],
  },
  {
    title: '推理与 Agent / RAG',
    desc: '思维链折叠、工具调用人工确认审批以及参考来源溯源。',
    items: [
      { name: 'ThinkingIndicator', link: 'thinking-indicator' },
      { name: 'ReasoningBlock', link: 'reasoning-block' },
      { name: 'ToolCall', link: 'tool-call' },
      { name: 'Sources', link: 'sources' },
    ],
  },
  {
    title: '工作台与反馈',
    desc: '多会话分组管理、模型切换、Token 进度统计与消息反馈栏。',
    items: [
      { name: 'SessionList', link: 'session-list' },
      { name: 'ModelSelector', link: 'model-selector' },
      { name: 'TokenBadge', link: 'token-badge' },
      { name: 'MessageActions', link: 'message-actions' },
    ],
  },
]

const features = [
  {
    icon: '⚡',
    title: 'AI 原生 · 直接组合',
    details: '提供 18 个 AI 组件与双端流式 Hooks，覆盖流式对话、思维链、ToolCall 工具审批、RAG 溯源与代码 Diff 评审。',
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
    title: '35 个组件 · 覆盖全场景',
    details: '18 个 AI 原生组件配合 17 个基础组件，从对话体验到表单、反馈和数据展示都能衔接使用。',
  },
]

const componentGroups = [
  {
    name: 'AI 组件',
    icon: '✨',
    isAI: true,
    desc: '覆盖 AI 开屏引导、流式输出、深度推理与工具审批、代码 Diff 对比、模型切换及多会话管理的全链路组件。',
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
      { name: 'Welcome', label: '欢迎页', link: 'welcome', vue: true, react: true },
      { name: 'Prompts', label: '推荐提示词', link: 'prompts', vue: true, react: true },
      { name: 'Attachment', label: '附件卡片', link: 'attachment', vue: true, react: true },
      { name: 'ToolCall', label: '工具调用', link: 'tool-call', vue: true, react: true },
      { name: 'Sources', label: '参考来源', link: 'sources', vue: true, react: true },
      { name: 'SessionList', label: '会话历史', link: 'session-list', vue: true, react: true },
      { name: 'MessageActions', label: '消息操作栏', link: 'message-actions', vue: true, react: true },
      { name: 'DiffCodeBlock', label: '代码对比', link: 'diff-code-block', vue: true, react: true },
      { name: 'ModelSelector', label: '模型选择器', link: 'model-selector', vue: true, react: true },
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
  box-shadow: 0 4px 14px rgba(148, 163, 184, 0.14);
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(148, 163, 184, 0.16);
}

.dark .feature-card:hover {
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.26);
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
  box-shadow: 0 4px 14px rgba(148, 163, 184, 0.16);
  transform: translateY(-2px);
}

.dark .component-group:hover {
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.28);
}

.component-group--ai {
  grid-column: 1 / -1;
  position: relative;
  overflow: hidden;
  border-color: transparent;
  background:
    linear-gradient(var(--vp-c-bg), var(--vp-c-bg)) padding-box,
    linear-gradient(135deg, rgba(100, 108, 255, 0.45), rgba(66, 184, 131, 0.38)) border-box;
  box-shadow: 0 6px 18px rgba(148, 163, 184, 0.16);
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

/* ===== AI Showcase：交互式工作台 + 明暗切换 ===== */
.ai-showcase {
  --ai-bg: #f5f6fb;
  --ai-text: #1a1a2e;
  --ai-text-muted: #64748b;
  --ai-border: rgba(15, 23, 42, 0.08);
  --ai-card-bg: #ffffff;
  --ai-accent: #6366f1;
  --ai-accent-soft: rgba(99, 102, 241, 0.1);

  position: relative;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  width: 100vw;
  background: linear-gradient(to bottom, var(--vp-c-bg) 0px, var(--ai-bg) 140px);
  padding: 76px 0;
  overflow: hidden;
}

.dark .ai-showcase {
  --ai-bg: #0b0f19;
  --ai-text: #f1f5f9;
  --ai-text-muted: #94a3b8;
  --ai-border: rgba(255, 255, 255, 0.08);
  --ai-card-bg: #111827;
  --ai-accent-soft: rgba(129, 140, 248, 0.14);
}

.ai-showcase__inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ai-showcase__header {
  text-align: center;
  margin-bottom: 36px;
}

.ai-showcase__eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  margin-bottom: 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ai-accent);
  background: var(--ai-accent-soft);
  border: 1px solid rgba(99, 102, 241, 0.22);
}

.ai-showcase__title {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.3;
  margin: 0 0 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6 50%, #10b981);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ai-showcase__subtitle {
  font-size: 16px;
  color: var(--ai-text-muted);
  margin: 0 auto;
  max-width: 720px;
  line-height: 1.7;
}

/* 工作台容器 + 独立浅色/深色 Variable Reset */
.ai-workspace {
  border-radius: 16px;
  border: 1px solid var(--ai-border);
  overflow: hidden;
  box-shadow: 0 8px 24px -6px rgba(148, 163, 184, 0.18), 0 2px 8px rgba(148, 163, 184, 0.1);
  background: #ffffff;
  color: #1e293b;
}

.ai-workspace--light {
  --vk-bg-color: #ffffff;
  --vk-bg-color-overlay: #ffffff;
  --vk-fill-color-blank: #ffffff;
  --vk-fill-color-light: #f5f7fa;
  --vk-fill-color: #f0f2f5;
  --vk-text-color-primary: #303133;
  --vk-text-color-regular: #606266;
  --vk-text-color-secondary: #909399;
  --vk-text-color-placeholder: #a8abb2;
  --vk-border-color: #dcdfe6;
  --vk-border-color-light: #e4e7ed;
  --vk-border-color-lighter: #ebeef5;
  --vk-ai-bg-assistant: #f8fafc;
  --vk-ai-shadow-card: 0 2px 8px rgba(148, 163, 184, 0.12);
  --vk-ai-shadow-float: 0 6px 16px -4px rgba(148, 163, 184, 0.2), 0 2px 6px rgba(148, 163, 184, 0.1);
}

/* 当外层文档站处于暗黑模式而演示窗切为浅色时，重置内部子组件显式亮色兜底 */
html.dark .ai-workspace--light :deep(.vk-conversation-list) {
  --vk-conversation-list-bg: #ffffff;
  --vk-conversation-list-empty-color: #a8abb2;
}

html.dark .ai-workspace--light :deep(.vk-chat-message--assistant .vk-chat-message__bubble) {
  background-color: #f8fafc;
  color: #303133;
  border-color: rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 6px rgba(148, 163, 184, 0.12);
}

html.dark .ai-workspace--light :deep(.vk-session-list),
html.dark .ai-workspace--light :deep(.vk-prompt-input),
html.dark .ai-workspace--light :deep(.vk-model-selector__trigger),
html.dark .ai-workspace--light :deep(.vk-model-selector__menu),
html.dark .ai-workspace--light :deep(.vk-sources__item),
html.dark .ai-workspace--light :deep(.vk-prompts__item) {
  background-color: #ffffff;
  border-color: #e4e7ed;
  color: #303133;
}

html.dark .ai-workspace--light :deep(.vk-model-selector__menu) {
  box-shadow: 0 6px 16px -4px rgba(148, 163, 184, 0.2), 0 2px 6px rgba(148, 163, 184, 0.1);
}

html.dark .ai-workspace--light :deep(.vk-model-selector__option) {
  color: #303133;
}

html.dark .ai-workspace--light :deep(.vk-model-selector__option:hover:not(:disabled)) {
  background-color: #f5f7fa;
}

html.dark .ai-workspace--light :deep(.vk-model-selector__option.is-selected) {
  background-color: #ecf5ff;
}

html.dark .ai-workspace--light :deep(.vk-model-selector__option-desc) {
  color: #909399;
}

html.dark .ai-workspace--light :deep(.vk-model-selector__tag) {
  background-color: #f0f2f5;
  color: #909399;
}

html.dark .ai-workspace--light :deep(.vk-reasoning-block),
html.dark .ai-workspace--light :deep(.vk-tool-call),
html.dark .ai-workspace--light :deep(.vk-welcome--filled) {
  background-color: #f8fafc;
  border-color: #ebeef5;
  color: #303133;
}

html.dark .ai-workspace--light :deep(.vk-attachment-card) {
  background-color: #f5f7fa;
  border-color: #ebeef5;
}

html.dark .ai-workspace--light :deep(.vk-prompt-input__textarea) {
  color: #303133;
}

html.dark .ai-workspace--light :deep(.vk-markdown-renderer) {
  --vk-md-heading-color: #303133;
  --vk-md-text-color: #606266;
  --vk-md-code-bg: rgba(64, 158, 255, 0.08);
  --vk-md-code-text: #0969da;
  --vk-md-code-border: rgba(64, 158, 255, 0.2);
}

.ai-workspace--dark {
  background: #0f172a;
  color: #f1f5f9;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.36), 0 2px 8px rgba(15, 23, 42, 0.22);
  --vk-bg-color: #141414;
  --vk-bg-color-overlay: #1e293b;
  --vk-fill-color-blank: #1a2234;
  --vk-fill-color-light: #243044;
  --vk-fill-color: #1e293b;
  --vk-text-color-primary: #f1f5f9;
  --vk-text-color-regular: #cbd5e1;
  --vk-text-color-secondary: #94a3b8;
  --vk-text-color-placeholder: #64748b;
  --vk-border-color: #334155;
  --vk-border-color-light: #2d3748;
  --vk-border-color-lighter: #1e293b;
  --vk-ai-bg-assistant: #1e293b;
  --vk-ai-shadow-card: 0 2px 8px rgba(15, 23, 42, 0.24);
  --vk-ai-shadow-float: 0 8px 20px -4px rgba(15, 23, 42, 0.36), 0 2px 6px rgba(15, 23, 42, 0.2);
}

.ai-workspace__titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 18px;
  background: #f8fafc;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.ai-workspace--dark .ai-workspace__titlebar {
  background: #131c31;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.ai-workspace__dots {
  display: flex;
  gap: 6px;
}

.ai-workspace__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.ai-workspace__dots span:nth-child(1) { background: #ff5f57; }
.ai-workspace__dots span:nth-child(2) { background: #febc2e; }
.ai-workspace__dots span:nth-child(3) { background: #28c840; }

.ai-workspace__title-text {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.ai-workspace--dark .ai-workspace__title-text {
  color: #94a3b8;
}

.ai-workspace__theme-switch {
  display: inline-flex;
  padding: 2px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.06);
  gap: 2px;
}

.ai-workspace--dark .ai-workspace__theme-switch {
  background: rgba(255, 255, 255, 0.08);
}

.ws-theme-btn {
  border: none;
  background: transparent;
  color: #64748b;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.ai-workspace--dark .ws-theme-btn {
  color: #94a3b8;
}

.ws-theme-btn.is-active {
  background: #ffffff;
  color: #6366f1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.ai-workspace--dark .ws-theme-btn.is-active {
  background: #1e293b;
  color: #818cf8;
}

.ai-workspace__mobile-tabs {
  display: none;
  gap: 8px;
  padding: 10px 14px;
  overflow-x: auto;
  border-bottom: 1px solid var(--vk-border-color-lighter);
}

.ws-mobile-tab {
  flex-shrink: 0;
  border: 1px solid var(--vk-border-color-light);
  background: transparent;
  color: var(--vk-text-color-secondary);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
}

.ws-mobile-tab.is-active {
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.1);
}

.ai-workspace__body {
  display: flex;
  min-height: 540px;
}

.ai-workspace__sidebar {
  width: 248px;
  flex-shrink: 0;
  padding: 12px;
  border-right: 1px solid var(--vk-border-color-lighter);
  background: rgba(248, 250, 252, 0.7);
}

.ai-workspace--dark .ai-workspace__sidebar {
  background: rgba(15, 23, 42, 0.75);
  border-right-color: rgba(255, 255, 255, 0.08);
}

.ai-workspace__sidebar :deep(.vk-session-list) {
  border: none;
  padding: 0;
  background: transparent;
}

.ai-workspace__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.ai-workspace__topbar {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 18px;
  border-bottom: 1px solid var(--vk-border-color-lighter);
}

.ai-workspace__composer {
  padding: 12px 16px 14px;
  border-top: 1px solid var(--vk-border-color-lighter);
}

.ws-welcome-wrap {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  text-align: left;
}

.ws-msg-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.ws-streaming-note {
  font-size: 12.5px;
  color: var(--vk-text-color-secondary);
}

.ws-diff-feedback {
  font-size: 12px;
  font-weight: 500;
  color: #10b981;
}

.ws-toolbar-chip {
  border: 1px solid var(--vk-border-color-light);
  background: transparent;
  color: var(--vk-text-color-secondary);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  cursor: pointer;
  transition: all 0.15s;
}

.ws-toolbar-chip.is-active {
  color: #6366f1;
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.1);
}

/* 4 象限 AI 能力矩阵 */
.ai-matrix {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 28px;
}

.ai-matrix-card {
  padding: 18px;
  border-radius: 14px;
  border: 1px solid var(--ai-border);
  background: var(--ai-card-bg);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.ai-matrix-card:hover {
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.14);
  transform: translateY(-2px);
}

.ai-matrix-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.ai-matrix-card__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--ai-text);
}

.ai-matrix-card__count {
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 999px;
  color: var(--ai-accent);
  background: var(--ai-accent-soft);
}

.ai-matrix-card__desc {
  font-size: 12.5px;
  line-height: 1.55;
  color: var(--ai-text-muted);
  margin: 0 0 12px;
}

.ai-matrix-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ai-matrix-pill {
  font-size: 11.5px;
  font-family: var(--vp-font-family-mono);
  padding: 3px 8px;
  border-radius: 6px;
  text-decoration: none;
  color: var(--ai-text);
  background: var(--ai-accent-soft);
  transition: all 0.15s;
}

.ai-matrix-pill:hover {
  color: #ffffff;
  background: var(--ai-accent);
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

  .ai-workspace__sidebar {
    display: none;
  }

  .ai-workspace__mobile-tabs {
    display: flex;
  }

  .ai-matrix {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  .ai-workspace__titlebar {
    flex-wrap: wrap;
  }

  .ai-matrix {
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
