<script setup lang="ts">

const emit = defineEmits(['difficultySelected']);

function emitDifficulty(level: string) {
  emit('difficultySelected', level);
}

//sound
//sound
import hoverSfx from "@/assets/sounds/tk3-buttonHover.mp3";
import selectSfx from "@/assets/sounds/buttonSelect.mp3";

const hoverAudio = new Audio(hoverSfx);
const selectAudio = new Audio(selectSfx);

const playHover = () => {hoverAudio.play();};

</script>

<template>
  <div class="diffic-buttons" @click="playHover">
    <button @click="emitDifficulty('easy')">Easy</button>
    <button @click="emitDifficulty('medium')">Medium</button>
    <button @click="emitDifficulty('hard')">Hard</button>
  </div>
</template>

<style scoped>

</style>
