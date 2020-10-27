import express from 'express';
import helloWord from './routes';

const app = express();

app.get('/teste', (request, response) => {
  return helloWord(request, response);
})

app.post('user', (request, response) => {
  
})

app.listen(3333);