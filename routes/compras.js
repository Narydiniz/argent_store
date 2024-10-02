const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador que será usado para definie as rotas 
const comprasController = require('../controllers/comprasController.js'); // Importa o controlador de transações (estoqueController)
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 


// Definindo uma rota para obter todas as transações 
router.get('/', comprasController.getAllCompras); 

// Definindo uma rota para adicionar uma nova transação 
router.post('/', comprasController.addCompras); 

//Rota para a atualização completa do produto 
router.put('/:id',  comprasController.putCompras);

//Rota para a atualização parcial do produto
router.patch('/:id', comprasController.updateCompras); 

//Rota para deletar um produto 
router.delete('/:id', comprasController.deleteCompras);


// Exportando o roteador 
module.exports = router