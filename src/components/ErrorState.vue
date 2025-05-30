<template>
  <div class="text-center py-20">
    <div class="card p-8 max-w-md mx-auto">
      <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h3>
      <p class="text-gray-600 mb-4">{{ error }}</p>
      <button @click="$emit('retry')" class="btn-primary">
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle } from 'lucide-vue-next'

defineProps({
  error: String
})

defineEmits(['retry'])
</script>
