const express = require('express');
const app = express();

app.use(express.json());

//Rotas
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const corredoresRoutes = require('./routes/corredores');
app.use('/users', userRoutes); 
app.use('/corredores', corredoresRoutes);
app.use('/gerador', geradorRoutes);

const voltasRoutes = require('./routes/voltas');
app.use('/voltas', voltasRoutes);

module.exports = app;