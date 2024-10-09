const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const  getAllPedidos = (require, res) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
        if (err) {
            console.error('Erro ao obter todas as compras:', err);
            res.status(500).send('Erro ao obter todas as compras');
            return;
        }
        res.json(results);
    });
};

//Função para adicionar uma nova transação (Com verificação de Duplicidade)
const addPedidos = (req, res) => {
    const {data_pagamento,status_pedido ,carrinho_id,produtos_id} = req.body;

    //Verificar se a transação já existe

    db.query(
        'SELECT * FROM pedidos WHERE data_pagamento=? AND status_pedido=? AND carrinho_id=? AND produtos_id= ?',
        [data_pagamento,status_pedido ,carrinho_id,produtos_id],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar novo pedido', err);
                res.status(500).send('Erro ao adicionar novo pedido');
                return;
            }

            if (results.length > 0) {
                //se a transação já existe
                res.status(400).send('PEDIDO DUPLICADO')
            }


            // Se a transação não existe, insira-a no banco de dados 
            db.query(
                'INSERT INTO pedidos (data_pagamento,status_pedido ,carrinho_id,produtos_id) VALUES  (?, ?, ?, ? )',
                [data_pagamento,status_pedido ,carrinho_id,produtos_id],
                (err, results) => {
                    if (err) {
                        console.error('Erro ao adicionar novo pedido', err);
                        res.status(500).send('Erro ao adicionar novo pedido');
                        return;
                    }
                    res.status(201).send('Novo pedido adicionado com sucesso!');
                }

            );
        }
    );
};


// Função para atualizar uma transação existente (substituição completa) 
const putPedidos = (req, res) => {
    const { id } = req.params;
    const {data_pagamento,status_pedido ,carrinho_id,produtos_id} = req.body;
    db.query(
      'UPDATE pedidos SET data_pagamento=?, status_pedido=? ,carrinho_id=?, produtos_id=? WHERE id=?',
      [data_pagamento,status_pedido ,carrinho_id,produtos_id,id], 
      (err, results) => {
        if (err) {
          console.error('Erro ao subestituir pedido ', err);
          res.status(500).send('Erro ao substituir pedido'+ err);
          return;
        }
        res.send('Dados do pedido atualizados com sucesso!');
      }
    );
  };
   
   
  // Função para atualizar uma transação existente (atualização parcial) 
  const updatePedidos = (req, res) => { 
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
      `UPDATE pedidos SET ${query.join(', ')} WHERE id = ?`, values, 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar pedido:', err); 
          res.status(500).send('Erro ao atualizar compra'); 
          return; 
        } 
        res.send('Dados do pedido atualizados com sucesso!'); 
      } 
    ); 
  };

// Função para deletar uma transação existente 
const deletePedidos = (req, res) => { 
    const { id } = req.params; 
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, results) => { 
      if (err) { 
        console.error('Erro ao deletar compra:', err); 
        res.status(500).send('Erro ao deletar compra'); 
        return; 
      } 
      res.send('Compra deletada com sucesso'); 
    }); 
  }; 
   
 
module.exports = {
  getAllPedidos,
  addPedidos,
  putPedidos,
  updatePedidos,
  deletePedidos
  };