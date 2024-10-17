const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const getAllProdutos = (require, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            console.error('Erro ao obter todos os produtos do estoque:', err);
            res.status(500).send('Erro ao obter produtos');
            return;
        }
        res.json(results);
    });
};

//Função para adicionar uma nova transação (Com verificação de Duplicidade)
const addProdutos = (req, res) => {
    const {descricao,categoria, preco_produto} = req.body;

//Verificar se a transação já existe

    db.query(
        'SELECT * FROM produtos WHERE descricao=? AND categoria=? AND preco_produto=?',
        [descricao,categoria, preco_produto],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produto', err);
                res.status(500).send('Erro ao adicionar produto');
                return;
            }

            if (results.length > 0) {
                res.status(400).send('Produto duplicado')
            }


// Se a transação não existe, insira-a no banco de dados 
            db.query(
                'INSERT INTO produtos (descricao,categoria, preco_produto) VALUES  (?, ?, ?)',
                [descricao,categoria, preco_produto],
                (err, results) => {
                    if (err) {
                        console.error('Erro ao adicionar novo produto', err);
                        res.status(500).send('Erro ao adicionar produto');
                        return;
                    }
                    res.status(201).send('Novo produto adicionado');
                }

            );
        }
    );
};


// Função para atualizar uma transação existente (substituição completa) 
const putProdutos = (req, res) => {
    const { id } = req.params;
    const {descricao,categoria, preco_produto} = req.body;
    db.query(
      'UPDATE produtos SET  descricao=?, categoria=?, preco_produto=? WHERE id=?',
      [descricao,categoria, preco_produto, id], 
      (err, results) => {
        if (err) {
          console.error('Erro ao subestituir  produto ', err);
          res.status(500).send('Erro ao substituir  produto');
          return;
        }
        res.send('Dados do produto atualizado com sucesso');
      }
    );
  };
   
   
// Função para atualizar uma transação existente (atualização parcial) 
  const updateProdutos = (req, res) => { 
    const { id } = req.params; 
    const fields = req.body; 
    const query = []; 
    const values = []; 
   
    for (const [key, value] of Object.entries(fields)) { 
      query.push(`${key} = ?`); 
      values.push(value); 
    } 
   
    values.push(id); 
   
    db.query( 
      `UPDATE produtos SET ${query.join(', ')} WHERE id = ?`, values, 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar dado do produto:', err); 
          res.status(500).send('Erro ao atualizar dado do produto'); 
          return; 
        } 
        res.send(' Dados do produto atualizados com sucesso'); 
      } 
    ); 
  };

// Função para deletar uma transação existente 
const deleteProdutos= (req, res) => { 
    const { id } = req.params; 
    db.query('DELETE FROM produtos WHERE id = ?', [id], (err, results) => { 
      if (err) { 
        console.error('Erro ao deletar produto:', err); 
        res.status(500).send('Erro ao deletar produto'); 
        return; 
      } 
      res.send('Produto deletado com sucesso'); 
    }); 
}; 
   
 
module.exports = {
    getAllProdutos,
    addProdutos,
    putProdutos,
    updateProdutos,
    deleteProdutos
  };