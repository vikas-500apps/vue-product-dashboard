<template>
    <div class="flex flex-col sm:flex-row bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <!-- Image -->
      <div class="sm:w-48 h-48 sm:h-auto bg-gray-100 flex-shrink-0">
        <img
          :src="product.image"
          alt="Product"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
  
      <!-- Content -->
      <div class="flex flex-col justify-between p-4 flex-1">
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
            {{ product.title }}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-3">{{ product.description }}</p>
          <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {{ formatCategory(product.category) }}
          </span>
        </div>
  
        <div class="mt-4 flex justify-between items-center">
          <span class="text-xl font-bold text-green-600">${{ formatPrice(product.price) }}</span>
          <div class="flex items-center space-x-1 text-sm text-yellow-500">
            <Star class="w-4 h-4 fill-current" />
            <span class="text-gray-700">{{ product.rating?.rate?.toFixed(1) || 'N/A' }}</span>
            <span class="text-gray-400 text-xs">({{ product.rating?.count || 0 }})</span>
          </div>
        </div>
  
        <div class="mt-2 flex space-x-2">
          <button
            @click="$emit('edit', product)"
            class="text-blue-600 hover:text-blue-700 p-1 rounded transition-colors"
            title="Edit"
          >
            <Edit class="w-4 h-4" />
          </button>
          <button
            @click="$emit('delete', product)"
            class="text-red-600 hover:text-red-700 p-1 rounded transition-colors"
            title="Delete"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Edit, Trash2, Star } from 'lucide-vue-next'
  
  defineProps({
    product: Object
  })
  
  defineEmits(['edit', 'delete'])
  
  const formatCategory = (category) =>
    category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  
  const formatPrice = (price) => parseFloat(price).toFixed(2)
  
  const handleImageError = (event) => {
    event.target.src = '/placeholder.svg?height=200&width=200'
  }
  </script>
  