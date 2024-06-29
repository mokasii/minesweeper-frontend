<script setup lang="ts">
import hoverSfx from "@/assets/sounds/tk3-buttonHover.mp3";

const audio = new Audio(hoverSfx);
const playSound = () => {audio.play();};
const stopSound = () => {audio.load();};

</script>

<template>
  <div class="start-container">
  <div class="title-container">
    <h1 class="title-minesweeper">minesweeper</h1>
    <span class="bysidoma-text">by sidoma</span>
  </div>


    <div class="start-buttons">
      <RouterLink to="/game" class="startGame-button button" @mouseover="playSound" @mouseleave="stopSound">start game</RouterLink>
      <RouterLink to="/score" class="highscores-button button" @mouseover="playSound" @mouseleave="stopSound">highscorers</RouterLink>
      <RouterLink to="/tutorial" class="tutorial-button button" @mouseover="playSound" @mouseleave="stopSound">tutorial</RouterLink>
    </div>

  </div>
</template>

<style scoped>
@font-face {
  font-family: "PlatinumGames";
  src: url("@/assets/fonts/platinumGames.ttf");
}

.start-container {
  background-color: black;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title-minesweeper {
  color: white;
  font-size: 100px;
  font-family: "PlatinumGames", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 150px;
}

.bysidoma-text {
  color: white;
  font-family: "PlatinumGames";
}

.start-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.startGame-button, .highscores-button, .tutorial-button {
  color: white;
  font-family: "PlatinumGames";
  border: 2px solid white;
  border-radius: 24px;
  background-color: black;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 10px 10px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  font-size: 40px;
  line-height: 80px;
}

.startGame-button:hover, .highscores-button:hover, .tutorial-button:hover {
  background-color: white;
  color: black;
}

</style>