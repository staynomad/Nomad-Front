import axios from 'axios';

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === 'production'
<<<<<<< HEAD
<<<<<<< HEAD
      ? 'https://nvestup.com' // production
      : 'http://localhost:8080', // development
=======
      ? 'https://vhomes.herokuapp.com' // production
      : 'https://nvestup.com', // development
>>>>>>> 3fcc393d... configuration for deployment
=======
      ? 'https://vhomes.herokuapp.com' // production
      : 'https://nvestup.com', // development
>>>>>>> 751a86ee... configuration for deployment
});
