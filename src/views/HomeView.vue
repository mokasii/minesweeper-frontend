<template>
  <div class="start-container">
  <div class="title-container">
    <div class="title-minesweeper">
      <span v-for="(letter, index) in 'minesweeper'.split('')" :key="index">{{ letter }}</span>
    </div>
    <span class="bysidoma-text">by sidoma</span>
  </div>


    <div class="start-buttons">
      <RouterLink to="/game" class="startGame-button button" @mouseover="$sounds.playSound2()" @mouseleave="$sounds.stopSound2()" @click="$sounds.playSound5()">start game</RouterLink> <!--@mouseenter works to but this way feel like more responsive-->
      <RouterLink to="/score" class="highscores-button button" @mouseover="$sounds.playSound2()" @mouseleave="$sounds.stopSound2()" @click="$sounds.playSound5()">highscorers</RouterLink>
<!--      <RouterLink to="/tutorial" class="tutorial-button button" @mouseover="playHover" @mouseleave="stopHover">tutorial</RouterLink>-->
    </div>

  </div>
</template>

<style scoped>
@font-face {
  font-family: "PlatinumGames";
  src: url("@/assets/fonts/platinumGames.ttf");
}

.start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  font-family: "PlatinumGames", sans-serif;
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