<<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '@/api/api';

export default defineComponent({
  setup() {
    const nickName = ref('');
    const timeInSeconds = ref(0);
    const difficulty = ref('easy');

    const submitScore = async () => {
      try {
        await api.postScore({
          nickName: nickName.value,
          timeInSeconds: timeInSeconds.value,
          difficulty: difficulty.value
        });
        alert('Score submitted!');
        // Zurücksetzen
        nickName.value = '';
        timeInSeconds.value = 0;
        difficulty.value = 'easy';
      } catch (error) {
        console.error('Error submitting score:', error);
        alert('Failed to submit score.');
      }
    };

    return { nickName: nickName, timeInSeconds, difficulty, submitScore };
  }
});
</script>

<template>
  <div>
    <h2>Game Finished!</h2>
    <h3>Submit your score:</h3>
    <form @submit.prevent="submitScore">
      <input v-model="nickName" placeholder="Enter your nickname" required>
      <input type="number" v-model.number="timeInSeconds" placeholder="Time in seconds" required>
      <select v-model="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Submit Score</button>
    </form>
  </div>
</template>

<style scoped>

</style>