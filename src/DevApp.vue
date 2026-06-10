<template>
  <main class="dev-app">
    <h1>Bobo Elements Dev</h1>
    <section class="dev-section">
      <Button type="primary">Vue Button</Button>
      <Switch v-model="checked" />
      <Tag type="success">Tag</Tag>
    </section>
    <section class="dev-section">
      <ChatMessage role="assistant" :timestamp="new Date()">
        AI components are available from src/vue/components.
      </ChatMessage>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './vue/components/Button.vue'
import Switch from './vue/components/Switch.vue'
import Tag from './vue/components/Tag/Tag.vue'
import ChatMessage from './vue/components/ChatMessage.vue'

const checked = ref(false)
</script>

<style scoped>
.dev-app {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: var(--vk-font-family, system-ui, sans-serif);
}

.dev-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}
</style>
