const db = require("../config/db"); // Importa a conexão com o banco de dados

// Função para obter todas as transações
const getAllVenda = (require, res) => {
  db.query("SELECT * FROM carrinho", (err, results) => {
    if (err) {
      console.error("Erro ao obter todos os produtos do carrinho:", err);
      res.status(500).send("Erro ao obter produtos");
      return;
    }
    res.json(results);
  });
};
//Função para adicionar produto ao carrinho

const addCarrinho = (req, res) => {
  const {data_compra,forma_pagamento,quantidade,total_compra, produtos_id,cadastro_id } = req.body;
  db.query(
    "INSERT INTO carrinho (data_compra,forma_pagamento,quantidade,total_compra, produtos_id,cadastro_id ) VALUES (?, ?, ?, ?, ?, ?)",
    [data_compra,forma_pagamento,quantidade,total_compra, produtos_id,cadastro_id],
    (err, results) => {
      if (err) {
        console.error("Erro ao adicionar produto ao carrinho:", err);
        res.status(500).send("Erro ao adicionar produto ao carrinho");
        return;
      }
      res.status(201).send("Produto adicionado ao carrinho");
    }
  );
};

//Função para atualizar uma carrinho existente (substituição completa)
const putCarrinho = (req, res) => {
    const { id } = req.params;
    const { data_compra,forma_pagamento,quantidade,total_compra, produtos_id,cadastro_id} = req.body;
    db.query(
      'UPDATE carrinho SET data_compra=?,forma_pagamento=?,quantidade=?, total_compra=?,produtos_id=?,cadastro_id=? WHERE id=?',
      [data_compra,forma_pagamento,quantidade,total_compra, produtos_id,cadastro_id,id],
      (err, results) => {
        if (err) {
          console.error('Erro ao subestituir o produto no carrinho', err);
          res.status(500).send('Erro ao substituir o produto no carrinho');
          return;
        }
        res.send('Dados do produto atualizado com sucesso');
      }
    );
  };

  // Função para atualizar uma transação existente (atualização parcial)
  const updateCarrinho = (req, res) => {
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
      `UPDATE carrinho SET ${query.join(', ')} WHERE id = ?`, values,
      (err, results) => {
        if (err) {
          console.error('Erro ao atualizar dado do produto no carrinho:', err);
          res.status(500).send('Erro ao atualizar dado do produto no carrinho');
          return;
        }
        res.send(' Dados do produto atualizados com sucesso');
      }
    );
  };

//Função para deletar uma transação existente
const deleteCarrinho= (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM carrinho WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Erro ao deletar produto do carrinho:', err);
        res.status(500).send('Erro ao deletar produto do carrinho');
        return;
      }
      res.send('Produto do carrinho deletado com sucesso');
    });
  };

module.exports = {
  getAllVenda,
  addCarrinho,
  putCarrinho,
  updateCarrinho,
  deleteCarrinho
  
};
