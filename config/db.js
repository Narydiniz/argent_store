//Esta pasta armazena a logica a ser conectada ao banco de dados
const mysql = require('mysql2') //Importa a biblioteca mysql2 anterioremente instalada e cria a conexão com o banco de dados

//Variaveis de ambiente
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createConnection({ // Função cria uma conexão com db de acordo com as configurações fornecidas
    host:process.env.DB_HOST, // Endereço do servidor
    user:process.env.DB_USER, // Nome do usuario 
    password:process.env.DB_PASS, // Senha do usuario 
    database:process.env.DB_NAME // Nome do banco de dados
});

//Conectando o banco de dados e exportando a conexão

db.connect((err) =>{
    if (err){
        console.error('Erro ao conectar ao banco de dados', err); // Exibição da mensagem de erro 
        return;
    }
    console.log(`Conectado ao db no MySQL ${process.env.DB_NAME}`);

});

module.exports= db; // Exporta a conexão para ser usada posteriomente em outros arquivos