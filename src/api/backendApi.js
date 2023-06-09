import axios from 'axios';

const backendApi = axios.create({
  //baseURL: 'http://127.0.0.1:8000/api',
  baseURL: 'https://api.profesional-remis.com/api'
});

// interceptores
backendApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Accept': 'application/json',
  };
  return config;
});

export default backendApi;