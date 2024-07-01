<template>

  <div class="game-view">
    <div class="title-container">
      <router-link to="/" @click="$sounds.playSound4()">
        <div class="title-minesweeper">
          <span v-for="(letter, index) in 'minesweeper'.split('')" :key="index">{{ letter }}</span>
        </div>
      </router-link>
      <span class="bysidoma-text">by sidoma</span>
    </div>
    <GameBoard v-if="selectedDifficulty" @game-started="gameStarted = true" @game-won="showScoreForm = true" />

    <transition name="submit-form">
    <Popup :show="showScoreForm" @close="showScoreForm = false">
      <ScoreForm :timeInSeconds="elapsedTime" :difficulty="selectedDifficulty" @score-submitted="showScoreForm = false" />
    </Popup>
    </transition>

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

/* enter transitions */
.submit-form-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
/* .submit-form-enter-to {
  opacity: 1;
  transform: translateY(0);
} */
.submit-form-enter-active {
  transition: all 0.3s ease;
}
/* leave transitions */
/* .submit-form-leave-from {
  opacity: 1;
  transform: translateY(0);
} */
.submit-form-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.submit-form-leave-active {
  transition: all 0.3s ease;
}
</style>
