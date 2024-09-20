const express = require('express'); // Importa o framework Express 
const router = express.Router(); // Cria um novo roteador 
const authController = require('../controllers/authController'); // Importa o controlador de autenticação 

// Rota para registro de usuário 
router.post('/register', authController.registerUser); 

// Rota para login de usuário 
router.post('/login', authController.loginUser); 

// Rota para solicitar redefinição de senha
router.post('/request-password-reset', authController.requestPasswordReset);

// Rota para redefinir a senha
router.post('/reset-password', authController.resetPassword); 


module.exports = router; // Exporta o roteador 