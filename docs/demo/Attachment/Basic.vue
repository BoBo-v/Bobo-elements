<script setup>
import { ref } from 'vue'
import Attachment from '@/vue/components/Attachment.vue'

const files = ref([
  { id: '1', name: 'architecture.png', size: 245760, type: 'image/png', status: 'done' },
  { id: '2', name: 'api-spec.pdf', size: 512000, status: 'uploading', progress: 65 },
  { id: '3', name: 'schema.sql', status: 'error', errorMessage: '上传超时' }
])

function removeFile(item) {
  files.value = files.value.filter(f => f.id !== item.id)
}
</script>

<template>
  <Attachment :items="files" @remove="removeFile" />
</template>
