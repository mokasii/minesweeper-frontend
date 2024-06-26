<script setup lang="ts">

const props = defineProps({
  containsBomb: Boolean,
  revealed: Boolean,
  flagged: Boolean,
  adjacentBombs: Number
});

const emit = defineEmits(['reveal', 'flag']);

function revealTile() {
  if (!props.flagged && !props.revealed) {
    emit('reveal');
  }
}

function toggleFlag(event) {
  event.preventDefault();  //disables context menu
  if (!props.revealed) {
    emit('flag');
  }
}
</script>

<template>
  <div class="tile"
       @click.right.prevent="toggleFlag"
       @click="revealTile"
       :class="{ bomb: props.containsBomb, revealed: props.revealed, flagged: props.flagged }"> <!-- add class based on props -->
    <span v-if="props.revealed && !props.containsBomb">{{ props.adjacentBombs }}</span>
    <span v-if="props.flagged">🚩</span>
    <span v-if="props.revealed && props.containsBomb">💣</span>
  </div>
</template>

<style scoped>
.tile {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.revealed {
  background-color: #666666;
}
.bomb {
  color: red;
}
.flagged {
  color: blue;
}
</style>
