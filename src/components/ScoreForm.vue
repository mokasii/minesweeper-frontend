<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/api/api';

interface Score {
  id: number;
  nickname: string;
  timeInSeconds: number;
  difficulty: string;
  date: string;
}

const props = defineProps({
  timeInSeconds: {type: Number, default: 0},
  difficulty: {type: String, default: ''}
});


const nickname = ref('');
const errorMessage = ref('');
const scores = ref<Score[]>([]);
const submitted = ref(false);
const nameError = ref('');
const submitted = ref(false);

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
  if (nickname.value === '') {
    nameError.value = 'Please enter a name';
    return;
  }

  if (submitted.value) {
    return;
  }

  try {
    await api.postScore({
      nickname: nickname.value,
      timeInSeconds: props.timeInSeconds,
      difficulty: props.difficulty,
      date: new Date().toISOString()
    });
    nickname.value = '';
    submitted.value = true; // Add this line
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
  <div class="form-container">
    <h2>Submit Your Score:</h2>
    <form @submit.prevent="submitScore" class="score-form">
      <input class=button-text v-model="nickname" :placeholder="nameError || 'Nickname'" :disabled="submitted" />
      <input class=button-text type="number" :value="timeInSeconds" placeholder="Time in seconds" readonly />
      <input class=button-text :value="difficulty" readonly />
      <button class="button-text" type="submit" :disabled="submitted">
        {{ submitted ? 'Score Submitted' : 'Submit Score' }}
      </button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>

.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.score-form {
  display: flex;
  flex-direction: column;
}

.score-form input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.score-form input:focus {
  border-color: black;
  outline: none;
}

.score-form button {
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.score-form button:hover {
  background-color: white;
  color:black;
}

.button-text {
  font-family: "PlatinumGames", sans-serif;
}
</style>
