import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://portfolio-4fcf2.firebaseio.com/'
});

export default instance;
