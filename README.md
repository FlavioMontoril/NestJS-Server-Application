🚀 Sobre o Projeto

Este projeto é um backend desenvolvido utilizando NestJS, com foco em organização, escalabilidade e boas práticas de arquitetura.

A aplicação consiste em uma API REST para gerenciamento de tarefas.

🧠 Tecnologias utilizadas
NestJS
TypeScript
Node.js
Express (adapter padrão do Nest)
Prisma como ORM(persistindo dados em um banco de dados relarional(MySQL))

📂 Arquitetura

O projeto segue a arquitetura modular do NestJS, separando responsabilidades em:

Modules → organização de funcionalidades
Controllers → entrada das requisições
Services → regras de negócio
DTOs → validação e tipagem de dados
Filters → tratamento global de exceções

✅ Tarefas
Criar tarefa
Listar tarefas
Atualizar tarefa
Deletar tarefa
Filtros (status, prioridade, prazo)
🛡️ Segurança
Tratamento global de erros
⚙️ Configuração do ambiente
Crie um arquivo .env na raiz do projeto:

PORT=****
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
▶️ Como rodar o projeto
Instalar dependências
pnpm install
Rodar em desenvolvimento
pnpm start:dev
Build da aplicação
pnpm build
Rodar em produção
pnpm start:prod