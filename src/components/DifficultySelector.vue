<script setup lang="ts">

const emit = defineEmits(['difficultySelected']);

function emitDifficulty(level: string) {
  emit('difficultySelected', level);
}

</script>

<template>
  <div class="diffic-buttons" @click="$sounds.playSound3()">
    <button @click="emitDifficulty('easy')">Easy</button>
    <button @click="emitDifficulty('medium')">Medium</button>
    <button @click="emitDifficulty('hard')">Hard</button>
  </div>
</template>

<style scoped>

</style>
