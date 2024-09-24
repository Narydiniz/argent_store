const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const carrinhoController = require('../controllers/carrinhoController'); // Importa o controlador de autenticação 


// Definindo uma rota para ver se há uma venda 
router.get('/', carrinhoController.getAllVenda); 

// Definindo uma rota para adicionar uma nova venda 
router.post('/',  carrinhoController.addCarrinho); 

//Rota para a atualização completa do produto 
router.put('/:id', carrinhoController.putCarrinho);

//Rota para a atualização parcial do produto
router.patch('/:id', carrinhoController.updateCarrinho); 

//Rota para deletar um produto 
router.delete('/:id',carrinhoController.deleteCarrinho);




module.exports = router; // Exporta o roteador 