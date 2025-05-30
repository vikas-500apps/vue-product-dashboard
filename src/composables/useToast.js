"use client"

import { ref } from "vue"

const toasts = ref([])

export function useToast() {
  const showToast = (message, type = "success", duration = 5000) => {
    const toast = {
      id: Date.now(),
      message,
      type,
      show: true,
    }

    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(toast.id)
    }, duration)
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex((toast) => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    showToast,
    removeToast,
  }
}
