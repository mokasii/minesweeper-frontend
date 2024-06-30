<template>
  <div class="game-view">
    <GameBoard v-if="selectedDifficulty" @game-started="gameStarted = true" @game-won="showScoreForm = true" />

    <Popup :show="showScoreForm" @close="showScoreForm = false">
      <ScoreForm :timeInSeconds="elapsedTime" :difficulty="selectedDifficulty" @score-submitted="showScoreForm = false" />
    </Popup>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import GameBoard from '@/components/GameBoard.vue';
import ScoreForm from '@/components/ScoreForm.vue';
import Popup from '@/components/Popup.vue';
import {useGameStore} from '@/store/store';

export default defineComponent({
  components: { GameBoard, ScoreForm, Popup },
  setup() {
    const gameStarted = ref(false);
    const showScoreForm = ref(false);
    const gameStore = useGameStore();
    const elapsedTime = ref(gameStore.elapsedTime);
    const selectedDifficulty = ref(gameStore.selectedDifficulty);

    watch(() => gameStore.elapsedTime, (newTime) => {
      elapsedTime.value = newTime;
    });

    watch(() => gameStore.selectedDifficulty, (newDifficulty) => {
      selectedDifficulty.value = newDifficulty;
    });

    return {
      gameStarted, showScoreForm, elapsedTime, selectedDifficulty
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
