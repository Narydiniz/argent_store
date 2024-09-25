const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador que será usado para definie as rotas 
const proddutosController = require('../controllers/produtosController.js'); // Importa o controlador de transações (estoqueController)
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/',  authMiddleware, proddutosController.getAllProdutos); 

// Definindo uma rota para adicionar uma nova transação 
router.post('/',  authMiddleware, proddutosController.addProdutos); 

//Rota para a atualização completa do produto 
router.put('/:id',  authMiddleware, proddutosController.putProdutos);

//Rota para a atualização parcial do produto
router.patch('/:id', authMiddleware,  proddutosController.updateProdutos); 

//Rota para deletar um produto 
router.delete('/:id', authMiddleware, proddutosController.deleteProdutos);


// Exportando o roteador 
module.exports = router