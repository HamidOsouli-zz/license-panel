const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
require('./database');
const app = express();
const apiPort = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!')
})

app.use('/user', routes.user)
app.use('/license', routes.license);


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
