const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const carrinhoController = require('../controllers/carrinhoController'); // Importa o controlador de autenticação 
const authMiddleware = require('../middleware/authMiddleware.js') // Importa o middleware de autenticação 



// Definindo uma rota para ver se há uma venda 
router.get('/', authMiddleware, carrinhoController.getAllVenda); 

// Definindo uma rota para adicionar uma nova venda 
router.post('/', authMiddleware, carrinhoController.addCarrinho); 

//Rota para a atualização completa do  carrinho
router.put('/:id', authMiddleware, carrinhoController.putCarrinho);

//Rota para a atualização parcial do carrinho
router.patch('/:id', authMiddleware, carrinhoController.updateCarrinho); 

//Rota para deletar um  carrinho
router.delete('/:id', authMiddleware, carrinhoController.deleteCarrinho);




module.exports = router; // Exporta o roteador 