var express = require("express");
var app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
const porta = 3000;
const sql = require('mssql');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const rotas = require("../app/rotas.js");
rotas(app);
module.exports = app;

