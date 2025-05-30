<template>
  <div class="text-center py-20">
    <div class="card p-8 max-w-md mx-auto">
      <Package class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
      <p class="text-gray-600 mb-4">
        {{ hasFilters ? 'Try adjusting your search or filter criteria.' : 'Get started by adding your first product.' }}
      </p>
      <button 
        v-if="!hasFilters" 
        @click="$emit('addProduct')" 
        class="btn-primary"
      >
        Add First Product
      </button>
      <button 
        v-else 
        @click="$emit('clearFilters')" 
        class="btn-secondary"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { Package } from 'lucide-vue-next'

defineProps({
  hasFilters: Boolean
})

defineEmits(['addProduct', 'clearFilters'])
</script>
