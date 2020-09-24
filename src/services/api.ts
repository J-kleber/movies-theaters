import axios from 'axios';

export const API_KEY = 'chave_aqui';

export const IMAGE_PATH = 'https://image.tmdb.org/t/p/w440_and_h660_face';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;
