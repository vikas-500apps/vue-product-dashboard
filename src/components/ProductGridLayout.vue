<template>
  <div class="card overflow-hidden group cursor-pointer">
    <!-- Product Image -->
    <div class="relative h-48 overflow-hidden bg-gray-100">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        @error="handleImageError"
      />
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span class="bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 px-2 py-1 rounded-full">
          {{ formatCategory(product.category) }}
        </span>
      </div>
      
      <!-- Quick Actions Overlay -->
      <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
        <button
          @click.stop="$emit('edit', product)"
          class="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
          title="Edit Product"
        >
          <Edit class="w-4 h-4" />
        </button>
        <button
          @click.stop="$emit('delete', product)"
          class="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-110"
          title="Delete Product"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Product Content -->
    <div class="p-6">
      <!-- Title -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
        {{ product.title }}
      </h3>
      
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ product.description }}
      </p>
      
      <!-- Price and Rating -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-green-600">${{ formatPrice(product.price) }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <Star class="w-4 h-4 text-yellow-400 fill-current" />
          <span class="text-sm text-gray-600 font-medium">
            {{ product.rating?.rate?.toFixed(1) || 'N/A' }}
          </span>
          <span class="text-xs text-gray-400">
            ({{ product.rating?.count || 0 }})
          </span>
        </div>
      </div>

      <!-- Category Badge -->
      <div class="flex justify-between items-center">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {{ formatCategory(product.category) }}
        </span>
        
        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <button
            @click="$emit('edit', product)"
            class="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors duration-200"
            title="Edit"
          >
            <Edit class="w-4 h-4" />
          </button>
          <button
            @click="$emit('delete', product)"
            class="text-red-600 hover:text-red-700 p-1 rounded transition-colors duration-200"
            title="Delete"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Edit, Trash2, Star } from 'lucide-vue-next'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const formatCategory = (category) => {
  return category.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const handleImageError = (event) => {
  event.target.src = '/placeholder.svg?height=200&width=200'
}
</script>
