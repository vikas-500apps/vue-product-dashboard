<template>
  <div class="min-h-screen gradient-bg">
    <!-- Header Component -->
    <Header 
      :total-products="products.length"
      @add-product="showAddModal = true"
    />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter Component -->
      <SearchFilter
        :categories="categories"
        :search-query="searchQuery"
        :selected-category="selectedCategory"
        @update-search="setSearchQuery"
        @update-category="setSelectedCategory"
        @clear-filters="clearFilters"
      />

      <!-- Loading Skeleton -->
       <template v-if="loading">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <LoadingState v-for="n in 8" :key="n" loading />
        </div>
       </template>

      <!-- Error State -->
      <ErrorState 
        v-else-if="error" 
        :error="error"
        @retry="fetchProducts"
      />

      <!-- Products Grid -->
      <Products
        v-else-if="filteredProducts.length > 0"
        :products="sortedProducts"
        :total-products="products.length"
        :filtered-count="filteredProducts.length"
        :sort-by="sortBy"
        @update-sort="setSortBy"
        @edit-product="editProduct"
        @delete-product="confirmDelete"
      />

      <!-- Empty State -->
      <EmptyState
        v-else
        :has-filters="!!(searchQuery || selectedCategory)"
        @add-product="showAddModal = true"
        @clear-filters="clearFilters"
      />
    </main>

    <!-- Modals -->
    <ProductModal
      v-if="showAddModal || showEditModal"
      :show="showAddModal || showEditModal"
      :product="editingProduct"
      :categories="categories"
      :is-editing="showEditModal"
      @close="closeModal"
      @submit="handleSubmit"
    />

    <ConfirmModal
      v-if="showDeleteModal"
      :show="showDeleteModal"
      title="Delete Product"
      :message="`Are you sure you want to delete '${productToDelete?.title}'? Once deleted, this action cannot be undone.`"
      confirm-text="Delete"
      cancel-text="Cancel"
      type="danger"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />

    <!-- Toast Notifications -->
    <ToastNotification
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
      @close="removeToast"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../stores/products'

// Components
import Header from '../components/Header.vue'
import SearchFilter from '../components/SearchFilter.vue'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import Products from '../components/Products.vue'
import EmptyState from '../components/EmptyState.vue'
import ProductModal from '../components/ProductModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'
import ToastNotification from '../components/ToastNotification.vue'
import { storeToRefs } from 'pinia'

// Store
const store = useProductStore()

const { 
  products, 
  categories, 
  loading, 
  error, 
  filteredProducts,
  searchQuery,
  selectedCategory
} = storeToRefs(store)

const {
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchQuery,
  setSelectedCategory
} = store

// Local reactive data
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref(null)
const productToDelete = ref(null)
const sortBy = ref('default')
const toasts = ref([])

// Computed
const sortStrategies = {
  'price-low': (a, b) => a.price - b.price,
  'price-high': (a, b) => b.price - a.price,
  'rating': (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0),
  'title': (a, b) => a.title.localeCompare(b.title),
  'default': () => 0
}

const sortedProducts = computed(() => {
  const productsCopy = [...filteredProducts.value]
  const sortFunction = sortStrategies[sortBy.value] || sortStrategies['default']
  return productsCopy.sort(sortFunction)
})


// Methods
const clearFilters = () => {
  setSearchQuery('')
  setSelectedCategory('')
}

const setSortBy = (value) => {
  sortBy.value = value
}

const editProduct = (product) => {
  editingProduct.value = product
  showEditModal.value = true
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const handleDelete = async () => {
  try {
    await deleteProduct(productToDelete.value.id)
    showToast('Product deleted successfully!', 'success')
    showDeleteModal.value = false
    productToDelete.value = null
  } catch (error) {
    showToast('Failed to delete product', 'error')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingProduct.value = null
}

const handleSubmit = async (formData) => {
  try {
    if (showEditModal.value) {
      await updateProduct(editingProduct.value.id, formData)
      showToast('Product updated successfully!', 'success')
    } else {
      await addProduct(formData)
      showToast('Product added successfully!', 'success')
    }
    closeModal()
  } catch (error) {
    showToast(error.message || 'An error occurred', 'error')
  }
}

const showToast = (message, type = 'success') => {
  const toast = {
    id: Date.now(),
    message,
    type,
    show: true
  }
  toasts.value.push(toast)
  
  setTimeout(() => {
    removeToast(toast.id)
  }, 5000)
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
  fetchCategories()
})

</script>
