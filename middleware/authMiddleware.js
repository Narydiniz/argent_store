const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", ""); // Obtém o token do cabeçalho da requisição
    if (!token) {
    return res.status(401).send("Acesso negado. Nenhum token fornecido.");
  }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica a validade do token
    req.user = decoded; // Adiciona as informações do usuário à requisição
    next(); // Passa o controle para a próxima função middleware
  } catch (err) {
    res.status(400).send("Token inválido.");
  }
};
module.exports = authMiddleware; // Exporta o middleware de autenticação
