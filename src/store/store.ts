import { defineStore } from 'pinia';

export const useGameStore = defineStore({
  id: 'game',
  state: () => ({
    elapsedTime: 0,
    selectedDifficulty: 'easy',
  }),
  actions: {
    setElapsedTime(time) {
      this.elapsedTime = time;
    },
    setSelectedDifficulty(difficulty) {
      this.selectedDifficulty = difficulty;
    },
  },
});