<template>
  <header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center py-6 space-y-4 md:space-y-0">
        
        <!-- Left Section: Logo and Title -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <Package class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gradient">ProductHub</h1>
            <p class="text-sm text-gray-600 leading-tight">Modern Product Management</p>
          </div>
        </div>

        <!-- Right Section: Stats and Button -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full md:w-auto">
          <div class="flex justify-between sm:justify-start items-center space-x-2 text-sm text-gray-600 mb-2 sm:mb-0">
            <span>Total Products:</span>
            <span class="font-semibold text-blue-600">{{ totalProducts }}</span>
          </div>
          <button
            @click="$emit('addProduct')"
            class="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <Plus class="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>
        
      </div>
    </div>
  </header>
</template>

<script setup>
import { Package, Plus } from 'lucide-vue-next'

defineProps({
  totalProducts: {
    type: Number,
    default: 0
  }
})

defineEmits(['addProduct'])
</script>
