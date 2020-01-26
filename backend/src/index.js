const express = require('express');
const bodyParser = require('body-parser'); //para mandar os dados do post no http
const routes = require('./routes');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true  
}));

app.use(express.json());
app.use(routes);

app.listen(8000, () => {
    console.log('Servidor online na porta 8000');
    console.log('http://localhost:8000/');
});