import { SQSEvent, SQSHandler } from 'aws-lambda';
import { Client } from 'pg';
import 'dotenv/config';

interface Pessoa {
  nome: string;
  idade: number;
}

const insertPessoa = async (pessoa: Pessoa): Promise<void> => {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
  });

  try {
    await client.connect();
    const query = 'INSERT INTO pessoa (nome, idade) VALUES ($1, $2)';
    await client.query(query, [pessoa.nome, pessoa.idade]);
    console.log(`Pessoa inserida: ${pessoa.nome}`);
  } finally {
    await client.end();
  }
};

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const body = JSON.parse(record.body) as Pessoa;
      await insertPessoa(body);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  }
};