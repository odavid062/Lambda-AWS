# 🧪 Lambda AWS com Node.js (TypeScript)

Este repositório contém uma função AWS Lambda desenvolvida em Node.js com TypeScript, criada para fins educacionais e experimentais. O objetivo é explorar os conceitos de computação serverless, integração com serviços da AWS e práticas modernas de desenvolvimento. A função é acionada por eventos do Amazon SQS, processa mensagens com dados de pessoa (`nome` e `idade`) e insere os registros em um banco de dados PostgreSQL.

## 🎯 Objetivos

- Compreender o funcionamento do AWS Lambda e sua integração com outros serviços da AWS (como Amazon SQS).
- Desenvolver uma função Lambda utilizando Node.js com TypeScript e integração com banco de dados PostgreSQL.
- Configurar o ambiente de desenvolvimento com as melhores práticas.
- Implementar testes e garantir a qualidade do código.

## 🛠️ Tecnologias Utilizadas

- **AWS Lambda**: Serviço de computação serverless da AWS (`@types/aws-lambda`).
- **Amazon SQS**: Serviço de mensageria em fila utilizado como fonte de eventos (`SQSEvent`) para a função.
- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **PostgreSQL (`pg`)**: Driver cliente para conexão e persistência no banco de dados.
- **dotenv**: Carregamento de variáveis de ambiente.


## 📁 Estrutura do Projeto

```
├── .env                 # Arquivo para variáveis de ambiente (não versionado)
├── package.json         # Configuração de dependências e scripts
├── package-lock.json    # Registro exato das versões das dependências
├── tsconfig.json        # Configuração do compilador TypeScript
├── src/                 # Código-fonte da função Lambda
│   └── handler.ts       # Handler da função Lambda com integração SQS e PostgreSQL
└── README.md            # Documentação do projeto
```

## ⚙️ Variáveis de Ambiente

A função requer a configuração das seguintes variáveis de ambiente para conexão com o banco de dados PostgreSQL:

| Variável | Descrição |
| --- | --- |
| `PGHOST` | Host do banco de dados PostgreSQL |
| `PGPORT` | Porta de conexão do PostgreSQL (ex.: `5432`) |
| `PGDATABASE` | Nome do banco de dados |
| `PGUSER` | Usuário do banco de dados |
| `PGPASSWORD` | Senha de autenticação do banco de dados |

> **Nota:** A função executa a query `INSERT INTO pessoa (nome, idade) VALUES ($1, $2)`, esperando a existência de uma tabela `pessoa` com as colunas `nome` e `idade`.


## 🚀 Como Executar Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/odavid062/Lambda-AWS.git
   cd Lambda-AWS
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com as credenciais e parâmetros de conexão do PostgreSQL (`PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`).

4. **Compile o TypeScript:**

   ```bash
   npm run build
   ```

5. **Scripts disponíveis (`package.json`):**

   - `npm run build`: Compila o código TypeScript via `tsc` para a pasta `dist/`.
   - `npm start`: Executa o ponto de entrada configurado via `ts-node src/index.ts`.
   - `npm test`: Execução de testes (atualmente sem testes configurados).

6. **Exemplo de payload (SQS Event):**

   A função espera um evento no formato `SQSEvent` contendo um ou mais registros com JSON no corpo (`body`):

   ```json
   {
     "Records": [
       {
         "body": "{\"nome\": \"Maria Silva\", \"idade\": 30}"
       }
     ]
   }
   ```

   Para testar localmente a função compilada com um payload em `event.json`:

   ```bash
   node -e "const { handler } = require('./dist/handler'); const event = require('./event.json'); handler(event);"
   ```

7. **Deploy com AWS CLI:**

   ```bash
   aws lambda update-function-code \
     --function-name MinhaFuncaoLambda \
     --zip-file fileb://dist/lambda.zip
   ```

Ou utilize o SAM CLI ou Serverless Framework para automação completa.

## ✅ Testes

Atualmente não há testes automatizados implementados no repositório (o script `npm test` retorna `no test specified`).

Para implementar testes no projeto, é recomendável utilizar frameworks como [Jest](https://jestjs.io/) ou [Mocha](https://mochajs.org/). Adicione os testes na pasta `__tests__` e configure os scripts no `package.json`:

```json
"scripts": {
  "test": "jest",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

## 📚 Recursos Adicionais

- [Documentação Oficial do AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Guia de Boas Práticas com AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)
- [TypeScript na AWS Lambda](https://dev.to/aws-builders/using-typescript-with-aws-lambda-1g9e)

## 📝 Licença

Este projeto está licenciado sob a licença [ISC](https://opensource.org/licenses/ISC), conforme especificado no `package.json`.
