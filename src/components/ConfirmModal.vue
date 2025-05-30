<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full bounce-in">
      <div class="p-6">
        <!-- Icon -->
        <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full"
             :class="iconBgClass">
          <component :is="iconComponent" :class="iconClass" class="w-8 h-8" />
        </div>

        <!-- Title -->
        <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">
          {{ title }}
        </h3>

        <!-- Message -->
        <p class="text-gray-600 text-center mb-6">
          {{ message }}
        </p>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            @click="$emit('cancel')"
            class="btn-secondary flex-1"
          >
            {{ cancelText }}
          </button>
          <button
            @click="$emit('confirm')"
            :class="confirmButtonClass"
            class="flex-1"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-vue-next'

const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  type: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'danger', 'info', 'success'].includes(value)
  }
})

defineEmits(['confirm', 'cancel'])

const iconComponent = computed(() => {
  switch (props.type) {
    case 'danger':
      return XCircle
    case 'info':
      return Info
    case 'success':
      return CheckCircle
    default:
      return AlertTriangle
  }
})

const iconBgClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'bg-red-100'
    case 'info':
      return 'bg-blue-100'
    case 'success':
      return 'bg-green-100'
    default:
      return 'bg-yellow-100'
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'text-red-600'
    case 'info':
      return 'text-blue-600'
    case 'success':
      return 'text-green-600'
    default:
      return 'text-yellow-600'
  }
})

const confirmButtonClass = computed(() => {
  switch (props.type) {
    case 'danger':
      return 'btn-danger'
    case 'info':
      return 'btn-primary'
    case 'success':
      return 'bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300'
    default:
      return 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300'
  }
})
</script>
