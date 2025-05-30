<template>
  <div class="mb-8">
    <div class="card p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Search Input -->
        <div class="flex-1 relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            :value="searchQuery"
            @input="$emit('updateSearch', $event.target.value)"
            type="text"
            placeholder="Search products by title, description, or category..."
            class="input-field pl-10"
          />
        </div>
        
        <!-- Category Filter -->
        <div class="lg:w-64">
          <select
            :value="selectedCategory"
            @change="$emit('updateCategory', $event.target.value)"
            class="input-field"
          >
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ formatCategory(category) }}
            </option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          v-if="searchQuery || selectedCategory"
          @click="$emit('clearFilters')"
          class="btn-secondary flex items-center space-x-2"
        >
          <X class="w-4 h-4" />
          <span>Clear</span>
        </button>
      </div>
      
      <!-- Filter Summary -->
      <div v-if="searchQuery || selectedCategory" class="mt-4 flex flex-wrap gap-2">
        <span v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
          Search: "{{ searchQuery }}"
          <button @click="$emit('updateSearch', '')" class="ml-2">
            <X class="w-3 h-3" />
          </button>
        </span>
        <span v-if="selectedCategory" class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
          Category: {{ formatCategory(selectedCategory) }}
          <button @click="$emit('updateCategory', '')" class="ml-2">
            <X class="w-3 h-3" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, X } from 'lucide-vue-next'

defineProps({
  categories: Array,
  searchQuery: String,
  selectedCategory: String
})

defineEmits(['updateSearch', 'updateCategory', 'clearFilters'])

const formatCategory = (category) => {
  return category.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>
