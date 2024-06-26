<script setup lang="ts">
import { ref, computed, onUnmounted, onBeforeMount } from 'vue'

const startTime = ref(Date.now());
const currentTime = ref(Date.now());
let timerId: ReturnType<typeof setInterval> | null = null;

onBeforeMount(() => {
  timerId = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  if (timerId){
    clearInterval(timerId);
  }
});

const elapsedTime = computed(() => Math.floor((currentTime.value - startTime.value) / 1000));
</script>

<template>
  <div><p>Elapsed time: {{ elapsedTime }} seconds</p></div>
</template>
