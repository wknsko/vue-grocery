const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const routes = require('./routes/Routes');

app.use('/', routes);


app.listen(3000, () => {
    console.log("listening at port 3000")
})