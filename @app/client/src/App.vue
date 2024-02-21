<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <HelloWorld msg="Vite + Vue + K8S" />
  <div class="mt-12 flex flex-col px-12">
    <h2 class="mb-4 text-xl">Custom Components From UI Library:</h2>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
