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
  padding: 10px 50px;
  margin: 10px 0;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 10px 10px;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  font-size: 48px;
  font-size: 40px;
}

.startGame-button:hover, .highscores-button:hover, .tutorial-button:hover {
  background-color: white;
  color: black;
}

</style>