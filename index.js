const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Defina suas rotas aqui
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});