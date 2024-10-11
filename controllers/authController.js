const crypto = require('crypto')
const db = require("../config/db"); // Importa a configuração do banco de dados
const bcrypt = require("bcrypt"); // Importa o bcrypt para criptografar senhas dos usuarios 
const jwt = require("jsonwebtoken"); // Importa o jsonwebtoken para gerar tokens JWT
const sendEmail = require("../services/emailService").sendEmail;

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  const { nome,sobrenome,email,telefone,data_nascimento, cep, endereco,senha } = req.body; // Desestrutura os dados do corpo da requisição

  // Verificar se o usuário já existe no banco de dados
  try {
    const [existingUser] = await db.promise().query("SELECT * FROM registro WHERE email = ?",
       [email]);
    if (existingUser.length > 0) {
      return res.status(400).send("Usuário já registrado");
    }

    // Criptografar a senha usando bcrypt
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir o novo usuário no banco de dados
    await db.promise().query(
        "INSERT INTO registro ( nome,sobrenome,email,telefone,data_nascimento, cep, endereco,senha) VALUES (?, ?, ?, ?, ?, ? ,?, ?)",
        [ nome,sobrenome,email,telefone,data_nascimento, cep, endereco,senha,hashedPassword ]
      );
    res.status(201).send("Usuário registrado com sucesso");
  } catch (err) {
    console.error("Erro ao registrar usuário:", err);
    res.status(500).send("Erro ao registrar usuário");
  }
};

// Função para autenticar um usuário
const loginRegistro = async (req, res) => {
  const { email, senha } = req.body; // Desestrutura os dados do corpo da requisição

  // Verificar se o usuário existe no banco de dados
  try {
    const [registro] = await db.promise().query("SELECT * FROM registro WHERE email = ?",[email]);
    if (user.length === 0) {
      return res.status(400).send("Credenciais inválidas (email inválido)");
    }

    // Comparar a senha fornecida com a senha criptografada no banco de dados
    const isMatch = await bcrypt.compare(senha, registro[0].senha);
    if (!isMatch) {
      return res.status(400).send(" Credenciais inválidas (senha inválida)");
    }

    // Gerar um token JWT
    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    res.status(500).send("Erro ao autenticar usuário");
  }
};

// Função para solicitar redefinição de senha
const requestsenhaReset = async (req, res) => {
  const { email } = req.body;
  try {
    const [registro] = await db.promise().query("SELECT * FROM registro WHERE email = ?", [email]);
    if (registro.length === 0) {
      return res.status(404).send("Usuário não encontrado");
    }
    const token = crypto.randomBytes(20).toString("hex"); // Gera um token aleatório
    const expireDate = new Date(Date.now() + 3600000); // 1 hora para expiração
    await db
      .promise().query( "UPDATE registro SET reset_password_token = ?, reset_password_expires = ? WHERE email = ?",
      [token, expireDate, email]
      );
    const resetLink = `http://localhost:3000/reset-password/${token}`; // Link para redefinição de senha
    sendEmail(
      email,
      "Recuperação de Senha - Sistema da Argent Store",
      `Por favor, clique no link para redefinir sua senha e continuar comprando: ${resetLink}`
    );
    res.send("E-mail de recuperação de senha enviado");
  } catch (err) {
    console.error("Erro ao solicitar redefinição de senha:", err);
    res.status(500).send("Erro ao solicitar redefinição de senha");
  }
};

// Função para redefinir a senha
const resetarSenha = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const [registro] = await db.promise().query("SELECT * FROM registro WHERE reset_password_token = ? AND reset_password_expires > NOW()",
        [token]
      );
    if (registro.length === 0) {
      return res.status(400).send("Token inválido ou expirado");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Criptografa a nova senha
    await db
      .promise().query("UPDATE registro SET senha = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?",
        [hashedPassword, user[0].id]
      );
    res.send("Senha redefinida com sucesso");
  } catch (err) {
    console.error("Erro ao redefinir senha:", err);
    res.status(500).send("Erro ao redefinir senha");
  }
};

module.exports = {
  registerUser,
  loginRegistro,
  requestsenhaReset,
  resetarSenha
};
