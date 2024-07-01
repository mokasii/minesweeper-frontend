import hoverSfx from "@/assets/sounds/tk3-buttonHover.mp3";
import selectSfx from "@/assets/sounds/buttonSelect.mp3";
import sound2 from "@/assets/sounds/sound2.mp3";
import sound3 from "@/assets/sounds/sound3.mp3";
import sound4 from "@/assets/sounds/sound4.mp3";
import sound5 from "@/assets/sounds/sound5.mp3";
import type { App } from 'vue'

const hoverAudio = new Audio(hoverSfx);
const selectAudio = new Audio(selectSfx);
const sound2Audio = new Audio(sound2);
const sound3Audio = new Audio(sound3);
const sound4Audio = new Audio(sound4);
const sound5Audio = new Audio(sound5);

const playHover = () => { hoverAudio.play(); };
const stopHover = () => { hoverAudio.load(); }; // reloads audio

const playSelect = () => { selectAudio.play(); };
const stopSelect = () => { selectAudio.load(); }; // reloads audio

const playSound2 = () => { sound2Audio.play(); };
const stopSound2 = () => { sound2Audio.load(); }; // reloads audio

const playSound3 = () => { sound3Audio.play(); };
const stopSound3 = () => { sound3Audio.load(); }; // reloads audio

const playSound4 = () => { sound4Audio.play(); };
const stopSound4 = () => { sound4Audio.load(); }; // reloads audio

const playSound5 = () => { sound5Audio.play(); };
const stopSound5 = () => { sound5Audio.load(); }; // reloads audio

export const sounds = {
  playHover,
  stopHover,
  playSelect,
  stopSelect,
  playSound2,
  stopSound2,
  playSound3,
  stopSound3,
  playSound4,
  stopSound4,
  playSound5,
  stopSound5,
};

export type Sounds = typeof sounds;

const soundPlugin = {
  install(app: App) {
    app.config.globalProperties.$sounds = sounds;
  }
};

export default soundPlugin;
