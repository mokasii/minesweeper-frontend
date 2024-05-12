<template>
  <div>
    <button v-for="difficulty in difficulties" :key="difficulty.value" @click="selectDifficulty(difficulty.value)">
      {{ difficulty.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const difficulties = ref([
      { value: 'easy', label: 'easy' },
      { value: 'medium', label: 'medium' },
      { value: 'hard', label: 'hard' }
    ]);

    const selectDifficulty = (value: string) => {
      console.log("chosen difficulty:", value);
    };

    return { difficulties, selectDifficulty };
  }
});
</script>

<style scoped>

</style>