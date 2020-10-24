const express = require('express');
const app = express();

app.get('/projects', (request, response) => {
  return response.json({});
});

app.post('/projects', (request, response) => {
  return response.json({});
});

app.put('/projects/:id', (request, response) => {
  return response.json([]);
});

app.delete('/projects/:id', (request, response) => {
  return response.json({});
});

app.listen(3333, () => {
  console.log('Back-end started 🚀');
});
