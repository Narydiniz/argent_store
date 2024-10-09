const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador que será usado para definie as rotas 
const pedidosController = require('../controllers/pedidosController.js'); // Importa o controlador de transações (estoqueController)
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/', pedidosController.getAllPedidos); 

// Definindo uma rota para adicionar uma nova transação 
router.post('/', pedidosController.addPedidos); 

//Rota para a atualização completa do produto 
router.put('/:id',  pedidosController.putPedidos);

//Rota para a atualização parcial do produto
router.patch('/:id', pedidosController.updatePedidos); 

//Rota para deletar um produto 
router.delete('/:id', pedidosController.deletePedidos);


// Exportando o roteador 
module.exports = router

