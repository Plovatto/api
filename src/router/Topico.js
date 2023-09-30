const express = require('express');
const TopicoRouter = express.Router();
const TopicoController = require('../controller/TopicosController');

//Rota para obter o tópico
TopicoRouter.get('/', async (req, res, next) => {
    user = await TopicoController.get(req.headers);
    res.status(200).send(user);
});

//Rota para listar o tópico
TopicoRouter.get('/', async(req, res, next)=>{
    user=await TopicoController.listar(req.body);
    res.status(200).send(user);
})

//Rota para criar o tópico
TopicoRouter.post('/', async(req, res, next) => {
    const data = req.body;
    const result = await TopicoController.criar(data);
    res.status(200).send(result);
});

//Rota para excluir o tópico
TopicoRouter.delete('/:id', TopicoController.excluir);

//Rota para atualizar o tópico
TopicoRouter.put('/:id', TopicoController.editar);

//Rota para obter um tópico específico pelo seu ID
TopicoRouter.get('/:id', TopicoController.listaId);

module.exports = TopicoRouter;