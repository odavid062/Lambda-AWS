🧪 Lambda AWS com Node.js (TypeScript)
Este repositório contém uma função AWS Lambda desenvolvida em Node.js com TypeScript, criada para fins educacionais e experimentais. O objetivo é explorar os conceitos de computação serverless, integração com serviços da AWS e práticas modernas de desenvolvimento.

🎯 Objetivos
Compreender o funcionamento do AWS Lambda e sua integração com outros serviços da AWS.
Desenvolver uma função Lambda utilizando Node.js com TypeScript.
Configurar o ambiente de desenvolvimento com as melhores práticas.
Implementar testes e garantir a qualidade do código.
🛠️ Tecnologias Utilizadas
AWS Lambda: Serviço de computação serverless da AWS.
Node.js: Ambiente de execução JavaScript.
TypeScript: Superset do JavaScript que adiciona tipagem estática.
AWS SDK: Biblioteca oficial da AWS para interação com seus serviços.
📁 Estrutura do Projeto

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
Instale as dependências:

npm install
Compile o TypeScript:

npm run build
Teste a função com payload local:

node dist/handler.js < event.json
Deploy com AWS CLI:

aws lambda update-function-code \
  --function-name MinhaFuncaoLambda \
  --zip-file fileb://dist/lambda.zip
Ou utilize o SAM CLI ou Serverless Framework para automação completa.

✅ Testes
Para garantir a qualidade do código, é recomendável implementar testes utilizando frameworks como Jest ou Mocha. Adicione os testes na pasta __tests__ e configure os scripts no package.json:

"scripts": {
  "test": "jest",
  "lint": "eslint .",
  "format": "prettier --write ."
}
📚 Recursos Adicionais
Documentação Oficial do AWS Lambda
Guia de Boas Práticas com AWS Lambda
TypeScript na AWS Lambda
📝 Licença
Este projeto está licenciado sob a MIT License.
