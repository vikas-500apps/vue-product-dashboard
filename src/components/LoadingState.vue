<template>
  <div class="card overflow-hidden animate-pulse">
    <!-- Skeleton Image -->
    <div class="relative h-48 bg-gray-200"></div>

    <!-- Skeleton Content -->
    <div class="p-6 space-y-4">
      <!-- Title -->
      <div class="h-5 bg-gray-300 rounded w-3/4"></div>

      <!-- Description -->
      <div class="space-y-2">
        <div class="h-3 bg-gray-200 rounded w-full"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>

      <!-- Price and Rating -->
      <div class="flex justify-between items-center">
        <div class="h-6 w-24 bg-gray-200 rounded"></div>
        <div class="flex items-center space-x-1">
          <div class="h-4 w-4 bg-yellow-300 rounded-full"></div>
          <div class="h-4 w-6 bg-gray-200 rounded"></div>
          <div class="h-3 w-8 bg-gray-100 rounded"></div>
        </div>
      </div>

      <!-- Category and Action Buttons -->
      <div class="flex justify-between items-center mt-2">
        <div class="h-5 w-24 bg-blue-100 rounded-full"></div>
        <div class="flex space-x-2">
          <div class="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div class="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// Loading component
</script>
