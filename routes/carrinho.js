const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const carrinhoController = require('../controllers/carrinhoController'); // Importa o controlador de autenticação 


// Definindo uma rota para ver se há uma venda 
router.get('/', carrinhoController.getAllVenda); 

// Definindo uma rota para adicionar uma nova venda 
router.post('/',  carrinhoController.addVenda); 

//Rota para a atualização completa do produto 
//router.put('/:id',  authMiddleware, estoqueController.putEstoque);

//Rota para a atualização parcial do produto
//router.patch('/:id', authMiddleware,  estoqueController.updateEstoque); 

//Rota para deletar um produto 
//router.delete('/:id', authMiddleware, estoqueController.deleteEstoque);




module.exports = router; // Exporta o roteador 