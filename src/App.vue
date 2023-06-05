<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Nav />
    <RouterView />
  </div>
</template>
