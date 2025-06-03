# 🧪 Lambda AWS com Node.js (TypeScript)

Este repositório contém uma função AWS Lambda desenvolvida em Node.js com TypeScript, criada para fins educacionais e experimentais. O objetivo é explorar os conceitos de computação serverless, integração com serviços da AWS e práticas modernas de desenvolvimento.

## 🎯 Objetivos

- Compreender o funcionamento do AWS Lambda e sua integração com outros serviços da AWS.
- Desenvolver uma função Lambda utilizando Node.js com TypeScript.
- Configurar o ambiente de desenvolvimento com as melhores práticas.
- Implementar testes e garantir a qualidade do código.

## 🛠️ Tecnologias Utilizadas

- **AWS Lambda**: Serviço de computação serverless da AWS.
- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **AWS SDK**: Biblioteca oficial da AWS para interação com seus serviços.


## 📁 Estrutura do Projeto

```

├── .env                 # Arquivo para variáveis de ambiente (não versionado)
├── package.json         # Configuração de dependências e scripts
├── package-lock.json    # Registro exato das versões das dependências
├── tsconfig.json        # Configuração do compilador TypeScript
├── src/                 # Código-fonte da função Lambda (ex: handler.ts)
└── README.md            # Documentação do projeto
       


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

3. **Compile o TypeScript:**

   ```bash
   npm run build
   ```

4. **Teste a função com payload local:**

   ```bash
   node dist/handler.js < event.json
   ```

5. **Deploy com AWS CLI:**

   ```bash
   aws lambda update-function-code \
     --function-name MinhaFuncaoLambda \
     --zip-file fileb://dist/lambda.zip
   ```

Ou utilize o SAM CLI ou Serverless Framework para automação completa.

## ✅ Testes

Para garantir a qualidade do código, é recomendável implementar testes utilizando frameworks como [Jest](https://jestjs.io/) ou [Mocha](https://mochajs.org/). Adicione os testes na pasta `__tests__` e configure os scripts no `package.json`:

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

Este projeto está licenciado sob a [MIT License](LICENSE).
