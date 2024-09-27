const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador que será usado para definie as rotas 
const estoqueController = require('../controllers/estoqueController.js'); // Importa o controlador de transações (estoqueController)
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/',  estoqueController.getAllEstoque); 

// Definindo uma rota para adicionar uma nova transação 
router.post('/',  estoqueController.addEstoque); 

//Rota para a atualização completa do produto 
router.put('/:id',  estoqueController.putEstoque);

//Rota para a atualização parcial do produto
router.patch('/:id', estoqueController.updateEstoque); 

//Rota para deletar um produto 
router.delete('/:id', estoqueController.deleteEstoque);


// Exportando o roteador 
module.exports = router