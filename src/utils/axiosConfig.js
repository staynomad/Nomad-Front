import axios from 'axios';

const env = process.env.NODE_ENV; // current environment

export const app = axios.create({
  baseURL:
    env === 'production'
      ? 'http://vhomes-back-dev.us-west-2.elasticbeanstalk.com/' // production
      : 'http://localhost:8080', // development
});
