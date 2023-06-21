<template>
  <header class="stick top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row justify-between items-center">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center flex-1 gap-4 py-6 text-white">
          <i class="fa-solid fa-mug-hot text-2xl"></i>
          <p class="text-2xl">Morning Things</p>
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'login' }">
        <p class="text-white text-xl">Login</p>
      </RouterLink>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<style lang=""></style>
