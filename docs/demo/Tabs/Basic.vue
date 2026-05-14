<script setup>
import { ref } from 'vue'
import Tabs from '@/vue/components/Tabs/Tabs.vue'
import TabPane from '@/vue/components/Tabs/TabPane.vue'
const activeName = ref('first')
</script>
<template>
  <Tabs v-model="activeName">
    <TabPane name="first" label="用户管理">用户管理的内容</TabPane>
    <TabPane name="second" label="配置管理">配置管理的内容</TabPane>
    <TabPane name="third" label="角色管理">角色管理的内容</TabPane>
  </Tabs>
</template>
