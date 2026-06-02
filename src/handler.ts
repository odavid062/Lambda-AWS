import { SQSEvent, SQSHandler } from 'aws-lambda';
import { Client } from 'pg';
import 'dotenv/config';

interface Pessoa {
  nome: string;
  idade: number;
}

const dbName = process.env.PGDATABASE || 'db-senac-aws';

const createDatabaseIfNotExists = async () => {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: 'postgres', // sempre conectar no postgres pra criar outros bancos
    port: Number(process.env.PGPORT),
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    // Verifica se o banco já existe
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Banco '${dbName}' criado.`);
    } else {
      console.log(`Banco '${dbName}' já existe.`);
    }
  } catch (error) {
    console.error('Erro ao criar banco:', error);
  } finally {
    await client.end();
  }
};

const createTableIfNotExists = async (client: Client) => {
  const query = `
    CREATE TABLE IF NOT EXISTS pessoa (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      idade INTEGER NOT NULL
    );
  `;
  await client.query(query);
};

export const handler: SQSHandler = async (event: SQSEvent) => {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: dbName,
    port: Number(process.env.PGPORT),
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await createTableIfNotExists(client);

    for (const record of event.Records) {
      try {
        console.log('Mensagem raw:', record.body);

        const snsWrapper = JSON.parse(record.body);
        const firstParse = JSON.parse(snsWrapper.Message);
        const message: Pessoa = typeof firstParse === 'string'
          ? JSON.parse(firstParse)
          : firstParse;

        if (!message.nome || typeof message.idade !== 'number') {
          throw new Error('Mensagem inválida: campos obrigatórios ausentes');
        }

        const insertQuery = 'INSERT INTO pessoa (nome, idade) VALUES ($1, $2)';
        await client.query(insertQuery, [message.nome, message.idade]);
        console.log(`Pessoa inserida: ${message.nome}`);
      } catch (error) {
        console.error('Erro ao processar registro:', error);
      }
    }
  } catch (error) {
    console.error('Erro na conexão principal:', error);
  } finally {
    await client.end();
  }
};
