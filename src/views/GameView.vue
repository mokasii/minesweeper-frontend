<template>
  <div class="game-view">
    <GameBoard @game-started="gameStarted = true" />
    <ScoreForm :timeInSeconds="elapsedTime" :difficulty="selectedDifficulty" v-if="gameStarted" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GameBoard from '@/components/GameBoard.vue';
import ScoreForm from '@/components/ScoreForm.vue';
import {useGameStore} from '@/store/store';



export default defineComponent({
  components: { GameBoard, ScoreForm },
  setup() {
    const gameStarted = ref(false);
    const gameStore = useGameStore();

    const startGame = () => {
      gameStarted.value = true;
    };

    return {
      gameStarted, startGame, elapsedTime: gameStore.elapsedTime, selectedDifficulty: gameStore.selectedDifficulty
    }

  }
});

</script>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
