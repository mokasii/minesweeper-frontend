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
const selectedTimespan = ref('all');

const fetchScores = async () => {
  try {
    const response = await api.getScores();
    scores.value = response.data;
  } catch (error) {
    console.error("Failed to fetch scores", error);
    errorMessage.value = "Failed to load highscores.";
  }
};

const fetchScoresByTimespan = async () => {
  console.log('Fetching scores for timespan:', selectedTimespan.value);
  try {
    switch (selectedTimespan.value) {
      case 'day':
        const responseDay = selectedDifficulty.value === 'all' ? await api.getScoresLastDayAll() : await api.getScoresLastDay(selectedDifficulty.value);
        scores.value = responseDay.data;
        break;
      case 'week':
        const responseWeek = selectedDifficulty.value === 'all' ? await api.getScoresLastWeekAll() : await api.getScoresLastWeek(selectedDifficulty.value);
        scores.value = responseWeek.data;
        break;
      case 'month':
        const responseMonth = selectedDifficulty.value === 'all' ? await api.getScoresLastMonthAll() : await api.getScoresLastMonth(selectedDifficulty.value);
        scores.value = responseMonth.data;
        break;
      default:
        await fetchScores();
        break;
    }
    filterScores();
  } catch (error) {
    console.error("Failed to fetch scores", error);
    errorMessage.value = "Failed to load highscores.";
  }
};

const filterScores = () => {
  console.log('Filtering scores for difficulty:', selectedDifficulty.value);
  if (selectedDifficulty.value === 'all') {
    filteredScores.value = scores.value.slice(0, 10);
  } else {
    filteredScores.value = scores.value.filter(score => score.difficulty === selectedDifficulty.value).slice(0, 10);
  }
  console.log('Filtered scores:', filteredScores.value);
};

watch(selectedDifficulty, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('Selected difficulty changed:', newVal);
    filterScores();
  }
});

watch(selectedTimespan, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    console.log('Selected timespan changed:', newVal);
    fetchScoresByTimespan();
  }
});

onMounted(() => {
  fetchScoresByTimespan();
});
</script>

<template>
  <div>
    <!-- Dropdown for each difficulty level -->
    <select v-model="selectedDifficulty">
      <option value="all">All</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <!-- Dropdown for each timespan -->
    <select v-model="selectedTimespan">
      <option value="all">All</option>
      <option value="day">Last Day</option>
      <option value="week">Last Week</option>
      <option value="month">Last Month</option>
    </select>

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