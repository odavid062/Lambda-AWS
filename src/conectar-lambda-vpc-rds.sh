#!/bin/bash

# --- VARIÁVEIS QUE VOCÊ PRECISA AJUSTAR ---
LAMBDA_NAME="lmb-leitura-"
RDS_HOST="database-1.ccj6ogcd3jdi.us-east-1.rds.amazonaws.com"
PGUSER="postgres"
PGPASSWORD="YOUR_DB_PASSWORD"
PGDATABASE="db-senac-aws"
PGPORT="5432"

SUBNET_IDS="subnet-033e80e3f41b751bf,subnet-009d7ca8ae584e4eb,subnet-0693107b12ba2660a,subnet-07ca0f33f4ca96964,subnet-02d9581a812e7bd64,subnet-0ecf540c72445a11e"
SECURITY_GROUP_ID="sg-0cdd102dc0bafb9fc"

ROLE_NAME="labrole"

# --- PASSO 1: ANEXAR POLÍTICA DE PERMISSÃO À ROLE ---
aws iam attach-role-policy \
  --role-name "$ROLE_NAME" \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole

# --- PASSO 2: CONFIGURAR LAMBDA COM VPC E VARIÁVEIS DE AMBIENTE ---
aws lambda update-function-configuration \
  --function-name "$LAMBDA_NAME" \
  --vpc-config SubnetIds=$SUBNET_IDS,SecurityGroupIds=$SECURITY_GROUP_ID \
  --environment "Variables={PGHOST=$RDS_HOST,PGUSER=$PGUSER,PGPASSWORD=$PGPASSWORD,PGDATABASE=$PGDATABASE,PGPORT=$PGPORT}"

echo "Configuração finalizada para Lambda $LAMBDA_NAME"
