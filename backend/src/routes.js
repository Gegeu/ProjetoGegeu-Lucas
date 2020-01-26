
const { Router } = require('express');

const ExampleController = require('./controller/ExampleController');
const ExampleModel = require('./model/ExampleModel');

const rotas = Router();

rotas.get('/', () => {
    console.log('substituir funcao anonima pela ação do controller');
});

rotas.get('/example', ExampleController.list);
rotas.post('/example', ExampleController.store);
rotas.get('/example/criar', ExampleController.create);
rotas.get('/example/:id([0-9]+)', ExampleController.show);
rotas.post('/example/:id([0-9]+)', ExampleController.update);
rotas.get('/eventos/:id([0-9]+)/editar', ExampleController.edit);
rotas.post('/eventos/:id([0-9]+)/excluir', ExampleController.destroy);

module.exports = rotas;
