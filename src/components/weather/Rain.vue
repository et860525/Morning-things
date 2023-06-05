<template>
  <div>
    <img alt="weather logo" class="logo" src="../../assets/icons/rain.svg" width="50" height="50" />
    <p>{{ data.rain }} %</p>
  </div>
</template>

<script setup lang="ts">
const data = defineProps({
  rain: {
    type: Number,
    default: 0,
  },
});
</script>
