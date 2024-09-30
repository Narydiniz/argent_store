const db = require('../config/db'); // Importa a conexão com o banco de dados 

// Função para obter todas as transações 
const  getAllCompras = (require, res) => {
    db.query('SELECT * FROM compras', (err, results) => {
        if (err) {
            console.error('Erro ao obter todas as compras:', err);
            res.status(500).send('Erro ao obter todas as compras');
            return;
        }
        res.json(results);
    });
};

//Função para adicionar uma nova transação (Com verificação de Duplicidade)
const addCompras = (req, res) => {
    const {endereco,quantidade,preco, produtos_id,registro_id} = req.body;

    //Verificar se a transação já existe

    db.query(
        'SELECT * FROM compras WHERE endereco=? AND quantidade=? AND preco=? AND produtos_id= ? AND registro_id',
        [endereco,quantidade,preco, produtos_id,registro_id],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar nova compra', err);
                res.status(500).send('Erro ao adicionar nova compra');
                return;
            }

            if (results.length > 0) {
                //se a transação já existe
                res.status(400).send('PEDIDO DUPLICADO')
            }


            // Se a transação não existe, insira-a no banco de dados 
            db.query(
                'INSERT INTO compras (endereco,quantidade,preco, produtos_id,registro_id) VALUES  (?, ?, ?, ?,? )',
                [endereco,quantidade,preco, produtos_id,registro_id],
                (err, results) => {
                    if (err) {
                        console.error('Erro ao adicionar nova comprra', err);
                        res.status(500).send('Erro ao adicionar nova compra');
                        return;
                    }
                    res.status(201).send('Nova compra adicionada');
                }

            );
        }
    );
};


// Função para atualizar uma transação existente (substituição completa) 
const putCompras = (req, res) => {
    const { id } = req.params;
    const {endereco,quantidade,preco, produtos_id,registro_id} = req.body;
    db.query(
      'UPDATE produtos SET  endereco=?,quantidade=?, preco=?, produtos_id= ?, registro_id WHERE id=?',
      [endereco,quantidade,preco, produtos_id,registro_id], 
      (err, results) => {
        if (err) {
          console.error('Erro ao subestituir compra ', err);
          res.status(500).send('Erro ao substituir compra');
          return;
        }
        res.send('Dados da compra atualizados com sucesso!');
      }
    );
  };
   
   
  // Função para atualizar uma transação existente (atualização parcial) 
  const updateCompras = (req, res) => { 
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
      `UPDATE compras SET ${query.join(', ')} WHERE id = ?`, values, 
      (err, results) => { 
        if (err) { 
          console.error('Erro ao atualizar compra:', err); 
          res.status(500).send('Erro ao atualizar compra'); 
          return; 
        } 
        res.send('Dados da compra atualizados com sucesso!'); 
      } 
    ); 
  };

// Função para deletar uma transação existente 
const deleteCompras = (req, res) => { 
    const { id } = req.params; 
    db.query('DELETE FROM compra WHERE id = ?', [id], (err, results) => { 
      if (err) { 
        console.error('Erro ao deletar compra:', err); 
        res.status(500).send('Erro ao deletar compra'); 
        return; 
      } 
      res.send('Compra deletada com sucesso'); 
    }); 
  }; 
   
 
module.exports = {
    getAllCompras,
    addCompras,
    putCompras,
    updateCompras,
    deleteCompras
  };