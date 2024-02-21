<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps({
  msg: {
    type: String,
    default: 'HelloWorld',
  },
});

const count = ref(0);
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded text-center">
      <h1 class="text-2xl font-bold mb-4">{{ props.msg }}</h1>
      <button
        type="button"
        class="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-700"
        @click="count++"
      >
        Increment Count ({{ count }})
      </button>
    </div>
  </div>
</template>
