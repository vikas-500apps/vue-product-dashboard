<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bounce-in">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {{ isEditing ? 'Edit Product' : 'Add New Product' }}
          </h2>
          <p class="text-gray-600 mt-1">
            {{ isEditing ? 'Update product information' : 'Fill in the details to add a new product' }}
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Product Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            placeholder="Enter product title"
            class="input-field"
            :class="{ 'border-red-300': errors.title }"
          />
          <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
        </div>

        <!-- Price and Category Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Price -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Price ($) *</label>
            <input
              v-model="formData.price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0.00"
              class="input-field"
              :class="{ 'border-red-300': errors.price }"
            />
            <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <select
              v-model="formData.category"
              required
              class="input-field"
              :class="{ 'border-red-300': errors.category }"
            >
              <option value="">Select a category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ formatCategory(category) }}
              </option>
            </select>
            <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
          <textarea
            v-model="formData.description"
            rows="4"
            required
            placeholder="Enter product description"
            class="input-field resize-none"
            :class="{ 'border-red-300': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ formData.description.length }}/500 characters</p>
        </div>

        <!-- Image Source Type Toggle -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Image Source *</label>
          <div class="flex gap-4 mb-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" value="url" v-model="imageInputType" />
              <span>Use URL</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" value="upload" v-model="imageInputType" />
              <span>Upload File</span>
            </label>
          </div>

          <!-- Image URL -->
          <div v-if="imageInputType === 'url'">
            <input
              v-model="formData.image"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              class="input-field"
              :class="{ 'border-red-300': errors.image }"
            />
            <p v-if="errors.image" class="text-red-500 text-sm mt-1">{{ errors.image }}</p>
          </div>

          <!-- File Upload -->
          <div v-if="imageInputType === 'upload'">
            <label
              for="file-upload"
              class="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200 text-gray-500 hover:text-indigo-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 12l5-5 5 5M12 7v10" />
              </svg>
              <span class="text-sm">Click to upload or drag and drop</span>
              <span class="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
            </label>
            <p v-if="errors.image" class="text-red-500 text-sm mt-1">{{ errors.image }}</p>
          </div>

          <!-- Image Preview -->
          <div v-if="previewImage" class="mt-3">
            <p class="text-sm text-gray-600 mb-2">Preview:</p>
            <div class="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
              <img
                :src="previewImage"
                alt="Preview"
                class="w-full h-full object-cover"
                @error="imageError = true"
                @load="imageError = false"
              />
            </div>
            <p v-if="imageError" class="text-red-500 text-sm mt-1">Failed to load image</p>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="btn-secondary flex-1 order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting || !isFormValid"
            class="btn-primary flex-1 order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting" class="flex items-center justify-center">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {{ isEditing ? 'Updating...' : 'Adding...' }}
            </span>
            <span v-else>
              {{ isEditing ? 'Update Product' : 'Add Product' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  product: Object,
  categories: Array,
  isEditing: Boolean
})

const emit = defineEmits(['close', 'submit'])

const submitting = ref(false)
const imageError = ref(false)
const errors = ref({})
const imageInputType = ref('url')
const previewImage = ref('')

const formData = ref({
  title: '',
  price: '',
  category: '',
  description: '',
  image: ''
})

const isFormValid = computed(() => {
  return formData.value.title &&
         formData.value.price &&
         formData.value.category &&
         formData.value.description &&
         formData.value.image &&
         Object.keys(errors.value).length === 0
})

const formatCategory = (category) => {
  return category.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

const validateForm = () => {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  } else if (formData.value.title.length < 3) {
    errors.value.title = 'Title must be at least 3 characters'
  }

  if (!formData.value.price) {
    errors.value.price = 'Price is required'
  } else if (parseFloat(formData.value.price) <= 0) {
    errors.value.price = 'Price must be greater than 0'
  }

  if (!formData.value.category) {
    errors.value.category = 'Category is required'
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required'
  } else if (formData.value.description.length < 10) {
    errors.value.description = 'Description must be at least 10 characters'
  } else if (formData.value.description.length > 500) {
    errors.value.description = 'Description must be less than 500 characters'
  }

  if (!formData.value.image) {
    errors.value.image = 'Image is required'
  } else if (imageInputType.value === 'url' && !isValidUrl(formData.value.image)) {
    errors.value.image = 'Please enter a valid URL'
  }

  return Object.keys(errors.value).length === 0
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      formData.value.image = reader.result
      previewImage.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

watch(() => props.product, (newProduct) => {
  if (newProduct && props.isEditing) {
    formData.value = {
      title: newProduct.title,
      price: newProduct.price.toString(),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image
    }
    previewImage.value = newProduct.image
    imageInputType.value = isValidUrl(newProduct.image) ? 'url' : 'upload'
  } else {
    formData.value = {
      title: '',
      price: '',
      category: '',
      description: '',
      image: ''
    }
    previewImage.value = ''
    imageInputType.value = 'url'
  }
  errors.value = {}
}, { immediate: true })

watch(() => formData.value.image, (value) => {
  if (imageInputType.value === 'url') {
    previewImage.value = value
  }
})

watch(formData, validateForm, { deep: true })

const handleSubmit = async () => {
  if (!validateForm()) return
  submitting.value = true
  try {
    emit('submit', { ...formData.value })
  } finally {
    submitting.value = false
  }
}
</script>