const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const getAllProducts = (require, res) => {
    db.query('SELECT * FROM estoque', (err, results) => {
        if (err) {
            console.error('Erro ao obter todos os produtos do estoque:', err);
            res.status(500).send('Erro ao obter produtos');
            return;
        }
        res.json(results);
    });
};
// Função para adicionar uma nova transação 
const addProducts = (req, res) => { 
    const {quant_estoque, descricao,categoria, preco_compra, cadastro_id } = req.body; 
    db.query( 
      'INSERT INTO estoque (quant_estoque, descricao, categoria, preco_compra, cadastro_id) VALUES  (?, ?, ?, ?, ?)', 
      [quant_estoque, descricao,categoria, preco_compra, cadastro_id], 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao adicionar novo produto no estoque:', err); 
          res.status(500).send('Erro ao adicionar  novo produto no estoque'); 
          return; 
        } 
        res.status(201).send('Novo produto adicionado ao estoque'); 
      } 
      
    ); 
  };

// Função para atualizar uma transação existente (substituição completa) 
const updateProductsPut = (req, res) => {
    const { id } = req.params;
    const { quant_estoque, descricao, categoria, preco_compra, cadastro_id} = req.body;
    db.query(
      'UPDATE estoque SET quant_estoque=?,  descricao=?, categoria=?, preco_compra=?, cadastro_id=? WHERE id=?',
      [quant_estoque, descricao, categoria, preco_compra, cadastro_id, id], 
      (err, results) => {
        if (err) {
          console.error('Erro ao subestituir o produto do estoque', err);
          res.status(500).send('Erro ao substituir o produto do estoque');
          return;
        }
        res.send('Dados do produto atualizado com sucesso');
      }
    );
  };
   
   
  // Função para atualizar uma transação existente (atualização parcial) 
  const ProductsPatch = (req, res) => { 
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
      `UPDATE estoque SET ${query.join(', ')} WHERE id = ?`, values, 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar dado do produto em estoque:', err); 
          res.status(500).send('Erro ao atualizar dado do produto em estoque'); 
          return; 
        } 
        res.send(' Dados do produto atualizados com sucesso'); 
      } 
    ); 
  };

// Função para deletar uma transação existente 
const deleteProducts = (req, res) => { 
    const { id } = req.params; 
    db.query('DELETE FROM estoque WHERE id = ?', [id], (err, results) => { 
      if (err) { 
        console.error('Erro ao deletar produto do estoque:', err); 
        res.status(500).send('Erro ao deletar produto do estoque'); 
        return; 
      } 
      res.send('Produto do estoque deletada com sucesso'); 
    }); 
  }; 
   
 
module.exports = {
    getAllProducts,
    addProducts,
    updateProductsPut,
    ProductsPatch,
    deleteProducts
};