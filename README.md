# MinhaFábrica

Desafio técnico: um sistema de gestão de produtos e usuários para uma fábrica. A API é em Node com Express e TypeScript, usa MongoDB e autenticação com JWT.

Usuário comum só consulta. Criar, editar e excluir produtos e gerenciar usuários fica restrito ao admin.

## O que fiz

- cadastro e login com JWT, senha salva com hash (bcrypt)
- CRUD de produtos com validação de preço e estoque no schema do Mongoose
- middlewares `authenticate` e `isAdmin` protegendo as rotas
- deploy da API na Railway

## Rotas

| Método | Rota | Quem acessa |
| --- | --- | --- |
| POST | `/auth/register` | qualquer um |
| POST | `/auth/login` | qualquer um |
| GET | `/products` e `/products/:id` | logado |
| POST, PUT, DELETE | `/products` | admin |
| GET | `/users` | admin |
| GET | `/users/:id` | logado |
| PUT, DELETE | `/users/:id` | admin |

As rotas protegidas esperam o header `Authorization: Bearer <token>`.

## Rodando local

Precisa de Node 20+ e de um MongoDB (local ou Atlas).

```bash
git clone https://github.com/PedroSenhorini/desafio-minhafabrica.git
cd desafio-minhafabrica/minhafabrica-api
npm install
cp .env.example .env
npm run dev
```

Preencha o `.env` com a sua string de conexão e um `JWT_SECRET`. A API sobe em http://localhost:5000.

## O que eu melhoraria

- validar o body das requisições com Zod
- testes de integração com Jest e Supertest
- liberar o CORS só para o domínio do front
