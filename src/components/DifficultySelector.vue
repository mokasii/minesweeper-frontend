<template>
  <div>
    <button v-for="difficulty in difficulties" :key="difficulty.value" @click="fetchAndSelectDifficulty(difficulty.value)">
      {{ difficulty.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '@/api/api';

export default defineComponent({
  setup() {
    const difficulties = ref([
      { value: 'easy', label: 'easy' },
      { value: 'medium', label: 'medium' },
      { value: 'hard', label: 'hard' }
    ]);

    const fetchAndSelectDifficulty = (value: string) => {
      console.log("chosen difficulty:", value);
      api.getRoot()
        .then(response => {
          console.log('API-Antwort erhalten:', response.data);
        })
        .catch(error => {
          console.error('Fehler beim API-Aufruf:', error);
        });
    };

    return { difficulties, fetchAndSelectDifficulty };
  }
});
</script>

<style scoped>
</style>