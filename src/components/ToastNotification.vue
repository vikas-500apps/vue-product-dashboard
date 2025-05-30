<template>
  <div
    class="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out"
    :class="[
      toast.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    ]"
  >
    <div
      :class="[
        'flex items-center p-4 rounded-xl shadow-lg text-white font-medium min-w-80 max-w-md',
        toastClass
      ]"
    >
      <!-- Icon -->
      <div class="flex-shrink-0 mr-3">
        <component :is="iconComponent" class="w-5 h-5" />
      </div>

      <!-- Message -->
      <div class="flex-1">
        <p class="text-sm">{{ toast.message }}</p>
      </div>

      <!-- Close Button -->
      <button
        @click="$emit('close', toast.id)"
        class="flex-shrink-0 ml-3 text-white/80 hover:text-white transition-colors duration-200"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'

const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const iconComponent = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return CheckCircle
    case 'error':
      return XCircle
    case 'warning':
      return AlertCircle
    case 'info':
      return Info
    default:
      return CheckCircle
  }
})

const toastClass = computed(() => {
  switch (props.toast.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-green-500'
  }
})
</script>
