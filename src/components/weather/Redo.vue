<template>
  <div class="flex justify-end items-end mt-5 gap-3 text-right">
    <p class="text-mg">最後觀測時間: {{ data.time }}</p>
    <button :disabled="true">
      <i class="fa-solid fa-rotate-right text-lg"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
const data = defineProps({
  time: {},
  clicked: {
    type: Boolean,
  },
});
</script>
