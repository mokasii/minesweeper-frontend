<script setup lang="ts">

const emit = defineEmits(['difficultySelected']);

function emitDifficulty(level: string) {
  emit('difficultySelected', level);
}
</script>

<template>
  <div>
    <button @click="emitDifficulty('easy')">Easy</button>
    <button @click="emitDifficulty('medium')">Medium</button>
    <button @click="emitDifficulty('hard')">Hard</button>
  </div>
</template>

<style scoped>
button {
  font-family: "PlatinumGames", sans-serif;
}
</style>
