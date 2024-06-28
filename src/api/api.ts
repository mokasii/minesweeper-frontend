import axios from 'axios';

//interfaces gewähren Typsicherheit
interface ScoreData {
  nickname: string;
  timeInSeconds: number;
  difficulty: string;
  date: string;
}

interface ScoreResponse {
  id: number;
  nickname: string;
  timeInSeconds: number;
  difficulty: string;
  date: string;
}

const apiClient = axios.create({
  baseURL: 'https://minesweeper-sidoma-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getRoot() {
    return apiClient.get('/');
  },
  postScore(scoreData: ScoreData) { // Sendet ein post req an backend, um neuen score zu speichern
    return apiClient.post('/api/scores', scoreData);          // daten werden als Parameter übergeben und müssen dem ScoreData-Interface entsprechen.
  },
  getScores() {                 // Ruft die Liste aller Scores vom Backend ab. Diese Methode gibt ein Array von ScoreResponse zurück,
    return apiClient.get<ScoreResponse[]>('/api/scores'); // basierend auf scoreResponse-Interface

  }
};
