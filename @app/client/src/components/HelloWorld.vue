<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    default: 'HelloWorld',
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ props.msg }}</h1>

  <div class="card">
    <button
      type="button"
      class="bg-brand-main md:text-yellow-400"
      @click="count++"
    >
      count is {{ count }}
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
