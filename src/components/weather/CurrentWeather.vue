<template>
  <p class="text-5xl py-3">{{ data.temperature }} °C</p>
</template>

<script setup lang="ts">
const data = defineProps({
  temperature: {
    type: Number,
  },
});
</script>
