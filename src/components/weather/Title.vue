<template>
  <div>
    <h1 class="text-3xl text-center">{{ data.location }}</h1>
    <div class="flex items-center justify-center gap-3 py-3">
      <p class="text-lg">{{ data.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const data = defineProps({
  location: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>
