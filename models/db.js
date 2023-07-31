const mysql = require('mysql2/promise');


  // Método responsável por realizar a conexão com o banco de dados
async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tarefas_db'
    });
    console.log('conexão estabelecida com sucesso!');
    return connection;
  } catch (error) {
    console.error('erro ao conectar ao banco de dados:', error);
    throw error;
  }
}
async function query(sql) {
  const connection = await connect();
  try {
    
    const [rows, fields] = await connection.execute(sql);
    console.log('query executada com sucesso!');
    return rows;
  } catch (error) {
    console.error('erro ao executar a query:', error);
    throw error;
  } finally {
    if (connection) {
        connection.end(); 
        console.log('conexão encerrada');
    }
  }
}


module.exports = {query};