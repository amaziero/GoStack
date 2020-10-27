import express from 'express';

const app = express();

app.get('/teste', (request, response) => {
  console.log('server started');
  return response.json({ message: 'hello word' });
})

app.listen(3333);