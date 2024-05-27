import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://minesweeper-sidoma-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getRoot() {
    return apiClient.get('/');
  }
};
