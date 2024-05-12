<template>
  <div class="game-view">
    <h1>one day this will be minesweeper</h1>
    <h2>choose difficulty</h2>
    <difficulty-selector></difficulty-selector>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DifficultySelector from '@/components/DifficultySelector.vue';

export default defineComponent({
  components: {
    DifficultySelector
  }
});
</script>
