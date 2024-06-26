<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from '@/api/api';

interface Score {
  id: number;
  nickname: string;
  timeInSeconds: number;
  difficulty: string;
}

const scores = ref<Score[]>([]);
const filteredScores = ref<Score[]>([]);
const errorMessage = ref('');
const selectedDifficulty = ref('all');

const fetchScores = async () => {
  try {
    const response = await api.getScores();
    scores.value = response.data;
    filterScores();
  } catch (error) {
    console.error("Failed to fetch scores", error);
    errorMessage.value = "Failed to load highscores.";
  }
};

const filterScores = () => {
  if (selectedDifficulty.value === 'all') {
    filteredScores.value = scores.value.slice(0, 10);
  } else {
    filteredScores.value = scores.value.filter(score => score.difficulty === selectedDifficulty.value).slice(0, 10);
  }
};

watch(selectedDifficulty, filterScores);

onMounted(fetchScores);
</script>

<template>
  <div>
    <!-- Buttons for each difficulty level -->
    <button @click="selectedDifficulty = 'all'">All</button>
    <button @click="selectedDifficulty = 'easy'">Easy</button>
    <button @click="selectedDifficulty = 'medium'">Medium</button>
    <button @click="selectedDifficulty = 'hard'">Hard</button>

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
      <tr v-for="(score, index) in filteredScores" :key="score.id">
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