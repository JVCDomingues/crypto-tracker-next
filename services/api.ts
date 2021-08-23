import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coinranking.com/v2',
  headers: {
    'x-access-token': process.env.REACT_APP_API_KEY
  }
});

export default api;