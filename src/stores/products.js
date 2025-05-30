import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"

// Define a Pinia store for managing product data
export const useProductStore = defineStore("products", () => {
  // Reactive state variables
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref("")
  const selectedCategory = ref("")

  // Base URL of the fake API
  const API_BASE = "https://fakestoreapi.com"

  // Save products to localStorage for persistence across reloads
  const saveToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products.value))
  }

  // Computed: Filter products based on search query and selected category
  const filteredProducts = computed(() => {
    let filtered = products.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter((product) => product.category === selectedCategory.value)
    }

    return filtered
  })

  // Computed: Group products by category
  const productsByCategory = computed(() => {
    return categories.value.reduce((acc, category) => {
      acc[category] = products.value.filter((p) => p.category === category)
      return acc
    }, {})
  })

  // Fetch products from API or from localStorage if available
  const fetchProducts = async () => {
    const stored = localStorage.getItem("products")
    if (stored) {
      products.value = JSON.parse(stored)
      return
    }
    try {
      loading.value = true
      error.value = null
      const response = await axios.get(`${API_BASE}/products`)
      products.value = response.data
      localStorage.setItem("products", JSON.stringify(products.value))
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay
    } catch (err) {
      error.value = "Failed to fetch products"
      throw new Error("Failed to fetch products")
    } finally {
      loading.value = false
    }
  }

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products/categories`)
      categories.value = response.data
    } catch (err) {
      throw new Error("Failed to update categories")
    }
  }

  // Add new product to the list (locally simulated due to mock API)
  const addProduct = async (productData) => {
    try {
      await axios.post(`${API_BASE}/products`, productData)

      // Add locally with mock ID and placeholder rating
      const newProduct = {
        ...productData,
        id: Date.now(), // Use timestamp as mock ID
        price: Number.parseFloat(productData.price),
        rating: { rate: 0, count: 0 },
      }
      products.value.unshift(newProduct)
      saveToLocalStorage()
      return newProduct
    } catch (err) {
      throw new Error("Failed to add product")
    }
  }

  // Update existing product locally and via API (mocked)
  const updateProduct = async (id, productData) => {
    try {
      await axios.put(`${API_BASE}/products/${id}`, productData)

      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          ...productData,
          price: Number.parseFloat(productData.price),
        }
        saveToLocalStorage()
      }
    } catch (err) {
      throw new Error("Failed to update product")
    }
  }

  // Delete product from list
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE}/products/${id}`)
      products.value = products.value.filter((p) => p.id !== id)
      saveToLocalStorage()
    } catch (err) {
      throw new Error("Failed to delete product")
    }
  }

   // Optional: clear localStorage data (for testing/dev)
   const resetLocalData = () => {
    localStorage.removeItem("products")
  }
  
  // Set user search input
  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  // Set selected category filter
  const setSelectedCategory = (category) => {
    selectedCategory.value = category
  }
  // Expose state and methods
  return {
    products,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    filteredProducts,
    productsByCategory,
    fetchProducts,
    fetchCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    setSearchQuery,
    setSelectedCategory,
    resetLocalData,
  }
})
