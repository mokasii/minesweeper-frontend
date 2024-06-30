<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Tile from './Tile.vue';
import DifficultySelector from './DifficultySelector.vue';
import { useGameStore } from '@/store/store';

//use tilentry as type for tiles array so typescript stops bitching
interface TileEntry {
  id: number;
  containsBomb: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacentBombs: number | undefined;
}

//timer
let firstClick = ref(true);
const startTime = ref();
const currentTime = ref();
let timerId: ReturnType<typeof setInterval> | undefined;

//use gameStore to save time and difficulty
const gameStore = useGameStore();

const emit = defineEmits(['gameStarted','Lost','gameWon']);


//grid and mines depending on difficulty
const width = ref();
const height = ref();
const minesCount = ref();

const difficultyLevels: {[key: string]:{width: number; height: number; minesCount: number;}} = {
  easy: { width: 9, height: 9, minesCount: 10 },
  medium: { width: 16, height: 16, minesCount: 40 },
  hard: { width: 30, height: 16, minesCount: 99 }
};

const gameBoardStyle = computed(() => ({
  display: 'grid',
  gap: '2px',
  'grid-template-columns': `repeat(${width.value}, 30px)`
}));

//remaining bombs
const mineDisplay = ref(minesCount.value);

const gameWon = computed(() => {return tiles.value.every(tile => tile.revealed || tile.containsBomb);});

const tiles = ref<TileEntry[]>([]);

function handleDifficultySelected(level: string) {
  const difficulty = difficultyLevels[level];

  width.value = difficulty.width;
  height.value = difficulty.height;
  minesCount.value = difficulty.minesCount;

  gameStore.setSelectedDifficulty(level);


  initializeGame();
}

function initializeGame() {
  tiles.value = Array.from({ length: width.value * height.value }, (_, index) => ({
    id: index,
    containsBomb: false,
    revealed: false,
    flagged: false,
    adjacentBombs: 0  // Placeholder for adjacent bombs calculation
  }));
  placeMines();
  calculateAdjacentMines();
  mineDisplay.value = minesCount.value;

  //resets timer
  clearInterval(timerId);
  startTime.value = null;
  currentTime.value = null;
  firstClick.value = true;

  emit('gameStarted');
}

function placeMines() {
  let placedMines = 0;
  while (placedMines < minesCount.value) {
    const index = Math.floor(Math.random() * tiles.value.length); //random gets a number between 0 and 0.99, multiply array length and floor rounds down
    if (!tiles.value[index].containsBomb) {
      tiles.value[index].containsBomb = true;
      placedMines++;
    }
  }
}

//adjacent mines calculation
function calculateAdjacentMines() {
  for (const tile of tiles.value) {
    let mineCount = 0;
    const neighbors = getNeighbors(tile.id);
    neighbors.forEach(n => {
      if (tiles.value[n].containsBomb) {
        mineCount++;
      }
    });

    mineCount === 0 ? tile.adjacentBombs = undefined : tile.adjacentBombs = mineCount;
  }
}

function getNeighbors(index: number) {
  const neighbors = [];
  const row = Math.floor(index / width.value);
  const col = index % width.value;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < height.value && newCol >= 0 && newCol < width.value) {
        neighbors.push(newRow * width.value + newCol);
      }
    }
  }
  return neighbors;
}

function startTimer() {
  startTime.value = Date.now();
  currentTime.value = Date.now();
  timerId = setInterval(() => {
    currentTime.value = Date.now();
  }, 1000);
}

const elapsedTime = computed(() => Math.floor((currentTime.value - startTime.value) / 1000));

function handleReveal(tile: TileEntry) {
  //first check for first click (to get timer running)
  if (firstClick.value) {
    startTimer();
    firstClick.value = false;
  }

  //actual revealing
  if (!tile.flagged) { //if flagged, clicking should still not reveal so if flagged this will be false
    revealTile(tile);
  }

  if (tile.containsBomb){
    return; //has to return here cuz revealing bomb --> reveals all --> all bombs being revealed is condition for 'gameWon' --> 'gameWon' is set to true --> gameWon alert is shown too

  }

  if (gameWon.value) {
    clearInterval(timerId); // Stop the timer
    gameStore.setElapsedTime(elapsedTime.value); //save time
    emit('gameWon')
    alert('Congratulations, you won!');
  }
}

function revealTile(tile: TileEntry){
  if (tile.revealed || tile.flagged) {
    return;
  }

  tile.revealed = true;

  if (tile.containsBomb) {
    revealAll();
    clearInterval(timerId); // Stop the timer
    emit('Lost')
    alert('Game Over!');
  }

  //reveal each neighbouring tile if no bombs nearby
  if (tile.adjacentBombs === undefined) {
    const neighbors = getNeighbors(tile.id);
    neighbors.forEach(n => revealTile(tiles.value[n]));
  }
}

function revealAll() {
  tiles.value.forEach(tile => tile.revealed = true);
}

function toggleFlag(tile: TileEntry) {
  if (!tile.revealed){                                          //if already revealed, clicking should not flag
    tile.flagged = !tile.flagged;                               //if flagged, unflag, if unflagged, flag
    tile.flagged ? mineDisplay.value-- : mineDisplay.value++;   //counting mines
  }

  if (gameWon.value) {
    clearInterval(timerId); // Stop the timer
    gameStore.setElapsedTime(elapsedTime.value); //save time
    emit('gameWon')
    alert('Congratulations, you won!');
  }
}

onUnmounted(() => {clearInterval(timerId);});
onMounted(initializeGame);
</script>

<template>
  <div class="game">
    <div class="game-header">
      <DifficultySelector @difficultySelected="handleDifficultySelected" />
      <button class="reset-button" @click="initializeGame">Reset Game</button>
      <div class="mine-counter">Mines left: {{ mineDisplay }}</div>
      <div>Elapsed time: {{ elapsedTime }} seconds</div>
    </div>
    <div class="game-board" :style="gameBoardStyle">
      <transition-group name="tile-transition">
      <Tile v-for="tile in tiles" :key="tile.id"
              :containsBomb="tile.containsBomb"
              :revealed="tile.revealed"
              :flagged="tile.flagged"
              :adjacentBombs="tile.adjacentBombs"
              @reveal="handleReveal(tile)"
              @flag="toggleFlag(tile)" />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 10px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px;
}

.diffic-buttons {
  display: flex;
  gap: 10px;
  margin: 10px;
}

.reset-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(9, 30px);
  gap: 2px;
}
.mine-counter {
  margin-top: 10px;
  margin-bottom: 10px;
}

.tile-transition-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.tile-transition-enter-active {
  transition: all 0.4s ease;
}
.tile-transition-leave-to {
  opacity: 0;
  transform: scale(0.6);
}


</style>>

