<template>
  <div>
    <img alt="weather logo" class="logo" src="../../assets/icons/airFlow.svg" width="50" height="50" />
    <p>{{ data.wind }} m/h</p>
  </div>
</template>

<script setup lang="ts">
const data = defineProps({
  wind: {
    type: Number,
    default: 0,
  },
});
</script>
