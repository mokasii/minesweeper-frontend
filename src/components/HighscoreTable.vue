<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from '@/api/api';
import tk3Sfx from '@/assets/sounds/tk3-buttonHover.mp3';

const audio = new Audio(tk3Sfx);
const playAudio = () => {audio.play();};

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
    <h1>Highscores</h1>

    <div class="filter-selectors">
    <!-- Dropdown for each difficulty level -->
    <select class="diffic-selector" v-model="selectedDifficulty" @click="playAudio">
      <option value="all">All</option>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>

    <!-- Dropdown for each timespan -->
    <select class="timespan-selector" v-model="selectedTimespan" @click="playAudio">
      <option value="all">All</option>
      <option value="day">Last Day</option>
      <option value="week">Last Week</option>
      <option value="month">Last Month</option>
    </select>
    </div>

    <!-- Tabelle für die Highscores -->
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
  width: 70%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
thead {
  background-color: black;
  color: white;
}

.router-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-selectors {
  display: flex;
  justify-content: center;
  margin: 10px;
}

.diffic-selector, .timespan-selector {
  font-family: "PlatinumGames";
  font-size: 20px;
  margin: 0 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: black;
  color: white;
}
</style>