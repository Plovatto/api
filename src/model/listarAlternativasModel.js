const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "mysql.infocimol.com.br",
  user: "infocimol",
  password: "c1i2m3o4l5",
  database: "infocimol",
});

//Função para obter todas as alternativas
const get = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT a.id_alternativa, a.correta, a.questao_id_questao, a.enunciado
            FROM infocimol.alternativa a
            JOIN questao q ON a.questao_id_questao = q.id_questao;`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const alternativas = results.map((alternativa) => ({
            id_alternativa: alternativa.id_alternativa,
            correta: alternativa.correta,
            questao: {
              questao_id_questao: alternativa.questao_id_questao,
            },
            enunciado: alternativa.enunciado,
          }));
          resolve(alternativas);
        }
      }
    );
  });
};

//Função para obter uma alternativa específica pelo seu ID
const list = (data) => {
  const { id } = data;
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT a.id_alternativa,a.correta, a.questao_id_questao, a.enunciado
            FROM infocimol.alternativa a
            JOIN questao q ON a.questao_id_questao = q.id_questao,
            WHERE a.id_alternativa = ?;`,
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          const alternativas = results.map((alternativa) => ({
            id_alternativa: alternativa.id_alternativa,
            correta: alternativa.correta,
            questao: {
              questao_id_questao: alternativa.questao_id_questao,
            },
            enunciado: alternativa.enunciado,
          }));
          resolve(alternativas);
        }
      }
    );
  });
};

module.exports = { get, list };
