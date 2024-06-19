<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api/api';

interface Score {
  id: number;
  nickname: string;
  timeInSeconds: number;
  difficulty: string;
}

const nickname = ref('');
const timeInSeconds = ref(0);
const difficulty = ref('easy');
const errorMessage = ref('');
const scores = ref<Score[]>([]);

const fetchScores = async () => {
  try {
    const response = await api.getScores();
    scores.value = response.data;
  } catch (error) {
    console.error("Failed to fetch scores", error);
    errorMessage.value = "Failed to load highscores.";
  }
};

const submitScore = async () => {
  try {
    await api.postScore({
      nickname: nickname.value,
      timeInSeconds: timeInSeconds.value,
      difficulty: difficulty.value
    });
    nickname.value = '';
    timeInSeconds.value = 0;
    difficulty.value = 'easy';
    await fetchScores();
    errorMessage.value = '';
  } catch (error) {
    console.error('Error submitting score:', error);
    errorMessage.value = 'Failed to submit score.';
  }
};

onMounted(fetchScores);
</script>

<template>
  <div>
    <h2>Submit Your Score:</h2>
    <form @submit.prevent="submitScore">
      <input v-model="nickname" placeholder="Nickname" />
      <input type="number" v-model="timeInSeconds" placeholder="Time in seconds" />
      <select v-model="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Submit Score</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <!-- Tabelle für die Highscores -->
    <h2>Highscores</h2>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Nickname</th>
        <th>Time (Seconds)</th>
        <th>Difficulty</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(score, index) in scores" :key="score.id">
        <td>{{ index + 1 }}</td>
        <td>{{ score.nickname }}</td>
        <td>{{ score.timeInSeconds }}</td>
        <td>{{ score.difficulty }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background-color: #00BD7E;
  color: black;
}
</style>
