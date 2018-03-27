import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://slavon360-portfolio.firebaseio.com/'
});

export default instance;
