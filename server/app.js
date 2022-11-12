const express = require('express')

const cors = require("cors");


const app = express();

//Allow next js app running on localhost 3000 to get acces to the API
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());



const signup = require('./routes/signup');
const signin = require('./routes/signin');

const games = require('./routes/games');
const votes = require('./routes/votes');

app.use('/signup', signup);
app.use('/signin', signin);
app.use('/games', games);
app.use('/votes', votes);

module.exports = app;
