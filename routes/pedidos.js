const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador que será usado para definie as rotas 
const pedidosController = require('../controllers/pedidosController.js'); // Importa o controlador de transações (estoqueController)
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/', authMiddleware ,pedidosController.getAllPedidos); 

// Definindo uma rota para adicionar uma nova transação 
router.post('/', authMiddleware, pedidosController.addPedidos); 

//Rota para a atualização completa do pedido 
router.put('/:id',  authMiddleware, pedidosController.putPedidos);

//Rota para a atualização parcial do pedido
router.patch('/:id', authMiddleware, pedidosController.updatePedidos); 

//Rota para deletar um pedido 
router.delete('/:id', authMiddleware,pedidosController.deletePedidos);


// Exportando o roteador 
module.exports = router

