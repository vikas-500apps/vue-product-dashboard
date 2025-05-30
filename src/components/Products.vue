<template>
  <div class="space-y-6">
    <!-- Results Summary, Sort, Layout Toggle -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
      <p class="text-gray-600 text-sm sm:text-base">
        Showing {{ filteredCount }} of {{ totalProducts }} products
      </p>

      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
        <!-- Sort -->
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Sort by:</span>
          <select
            :value="sortBy"
            @change="$emit('updateSort', $event.target.value)"
            class="text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-1 py-1.5 bg-white w-full sm:w-auto"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        <!-- Layout Toggle -->
        <div class="flex space-x-2 items-center text-gray-600">
          <button 
          @click="layout = 'grid'"
          :class="layout === 'grid' ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600 hover:bg-gray-100'"
          class="rounded-md transition-all duration-200"
          title="Grid View">
          <LayoutGrid class="w-5 h-5" />  
          </button><span>|</span><button
          @click="layout = 'list'"
          :class="layout === 'list' ? 'text-blue-600 bg-blue-50' : 'hover:text-blue-600 hover:bg-gray-100'"
          class="rounded-md transition-all duration-200"
          title="List View">
          <List class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Products Display -->
    <div v-if="layout === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
      <ProductGridLayout
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="$emit('editProduct', product)"
        @delete="$emit('deleteProduct', product)"
        class="fade-in"
      />
    </div>
    <div v-else class="space-y-4">
      <ProductListLayout
        v-for="product in products"
        :key="product.id"
        :product="product"
        @edit="$emit('editProduct', product)"
        @delete="$emit('deleteProduct', product)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductGridLayout from './ProductGridLayout.vue'
import ProductListLayout from './ProductListLayout.vue'
import { LayoutGrid, List } from 'lucide-vue-next'

defineProps({
  products: Array,
  totalProducts: Number,
  filteredCount: Number,
  sortBy: String
})

defineEmits(['updateSort', 'editProduct', 'deleteProduct'])

const layout = ref('grid') // Default view
</script>
