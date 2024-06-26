<script setup lang="ts">

const emit = defineEmits(['difficultySelected']);

function emitDifficulty(level) {
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