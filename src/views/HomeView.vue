<script setup lang="ts">
</script>

<template>
  <div class="start-container">
    <h1 class="title-minesweeper">minesweeper</h1>
    <span class="bysidoma-text">by sidoma</span>

    <div class="start-buttons">
      <RouterLink to="/game" class="startGame-button button">
         <span>
            <span class="button-text">start game</span>
            <br></br>
          </span>
      </RouterLink>

      <RouterLink to="/score" class="highscores-button button">
          <span class="button-text">
            <span>highscorers</span>
            <br></br>
          </span>
      </RouterLink>

      <RouterLink to="/tutorial" class="tutorial-button button">
          <span class="button-text">
            <span>tutorial</span>
            <br></br>
          </span>
      </RouterLink>
    </div>

  </div>
</template>

<style scoped>
@font-face {
  font-family: "PlatinumGames";
  src: url("@/fonts/platinumGames.ttf");
}

.start-container {
  width: 100%;
  display: flex;
  min-height: 100vh;
  border-color: black;
  border-width: 1px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  box-sizing: border-box;
}

.title-minesweeper {
  color: white;
  font-size: 96px;
  font-family: "PlatinumGames", sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.bysidoma-text {
  color: white;
  font-family: "PlatinumGames";
  margin-bottom: 40px;
}

.start-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.startGame-button, .highscores-button, .tutorial-button {
  color: white;
  font-family: "PlatinumGames";
  border: 2px solid white;
  border-radius: 24px;
  background-color: black;
  padding: 10px 50px;
  margin: 10px 0;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  font-size: 48px;
}

.startGame-button:hover, .highscores-button:hover, .tutorial-button:hover {
  background-color: white;
  color: black;
}

.button-text {
  font-size: 48px;
}
</style>