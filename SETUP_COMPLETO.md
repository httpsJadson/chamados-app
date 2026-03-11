# 🎫 Sistema de Chamados TI - Documentação Completa

## 📋 Visão Geral

Sistema full-stack de gerenciamento de chamados internos de TI para empresas. Desenvolvido com **NestJS** (backend) e **Next.js** (frontend).

## 🏗️ Arquitetura

### Backend (NestJS)
- API REST escalável
- Autenticação JWT
- Banco de dados Prisma
- Validação e DTOs
- Guards e decorators para segurança

### Frontend (Next.js)
- Interface moderna e responsiva
- Gerenciamento de estado com Zustand
- Client HTTP com Axios
- Tailwind CSS para estilo
- TypeScript para type safety

## 🔄 Fluxo Completo

```
Usuário (Browser)
        ↓
   Next.js Frontend
        ↓
   Axios (Client HTTP)
        ↓
   NestJS API (Backend)
        ↓
  Prisma ORM
        ↓
   PostgreSQL/SQLite
```

## 🚀 Como Executar

### 1. Backend

#### Pré-requisitos
- Node.js 18+
- npm ou yarn
- PostgreSQL ou SQLite (configurado no `.env`)

#### Passos

```bash
cd backend

# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev

# Criar usuários de teste (opcional)
# Editar seed do Prisma se existir

# Rodar em desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### 2. Frontend

#### Pré-requisitos
- Node.js 18+
- npm ou yarn

#### Passos

```bash
cd frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local e configurar NEXT_PUBLIC_API_URL

# Rodar em desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3000`

**⚠️ Nota**: Caso ambos tentem usar porta 3000, altere uma delas:
- Backend: mudar `main.ts` ou usar `npm run dev -- --port 3001`
- Frontend: usar `npm run dev -- -p 3001`

## 📊 Estrutura do Banco de Dados

### Users
- `id`: UUID (primary key)
- `email`: string (unique)
- `password`: string (hash bcrypt)
- `name`: string
- `role`: enum (USER, TECH, ADMIN)
- `perfilUrl`: string (nullable)
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Tickets
- `id`: UUID (primary key)
- `title`: string
- `description`: text
- `status`: enum (ABERTO, ATRIBUIDO, EM_PROGRESSO, RESOLVIDO, FECHADO)
- `priority`: enum (BAIXA, MEDIA, ALTA, CRITICA)
- `userId`: UUID (FK → Users)
- `assignedTechId`: UUID (FK → Users, nullable)
- `diagnosis`: text (nullable)
- `createdAt`: timestamp
- `updatedAt`: timestamp

### Messages
- `id`: UUID (primary key)
- `content`: text
- `ticketId`: UUID (FK → Tickets)
- `userId`: UUID (FK → Users)
- `createdAt`: timestamp
- `updatedAt`: timestamp

## 🔐 Autenticação

### Fluxo de Login

1. Usuário entra email/senha no frontend
2. Frontend faz `POST /auth/login` com credenciais
3. Backend valida com bcrypt
4. Backend retorna `access_token` (JWT)
5. Frontend armazena token em localStorage
6. Frontend inclui token em header `Authorization: Bearer <token>`
7. Guard `AuthTokenGuard` valida token em cada requisição

### Autorização por Role

- **ADMIN**: Acesso total
- **TECH**: Pode atribuir/atualizar tickets
- **USER**: Pode criar tickets, ver publicados e comentar

## 📡 API Endpoints

### Autenticação
```
POST   /auth/login                    - Login
```

### Usuários
```
GET    /users                         - Listar (admin)
POST   /users                         - Criar (admin)
GET    /users/:id                     - Obter por ID
GET    /users/profile                 - Obter perfil atual
PATCH  /users/:id                     - Atualizar
DELETE /users/:id                     - Deletar (admin)
```

### Chamados
```
GET    /tickets                       - Listar (tech/admin)
POST   /tickets                       - Criar
GET    /tickets/:id                   - Obter detalhes
PATCH  /tickets/:id/status            - Atualizar status (tech/admin)
PATCH  /tickets/:id/priority          - Atualizar prioridade (tech/admin)
PATCH  /tickets/:id/assigned          - Atribuir a técnico (tech/admin)
PATCH  /tickets/:id/diagnosis         - Adicionar diagnóstico (tech/admin)
DELETE /tickets/:id                   - Deletar
```

### Mensagens
```
POST   /messages                      - Adicionar comentário
GET    /messages/:ticketId            - Listar por ticket
```

## 🧪 Teste a API

Use a ferramenta cliente HTTP:

### cURL
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@teste.com","password":"senha123"}'

# Listar chamados
curl -X GET http://localhost:3000/api/tickets \
  -H "Authorization: Bearer <token>"
```

### Postman / Insomnia
1. Importe o arquivo [client.rest](../client.rest) (se fornecido)
2. Configure variáveis de ambiente
3. Execute os requests

### Frontend
1. Acesse `http://localhost:3000`
2. Faça login (veja credenciais no componente LoginForm)
3. Navegue pelo sistema

## 🛡️ Segurança

- Senhas hasheadas com bcrypt
- JWT com expiração configurável
- Guards de autenticação e autorização
- Validação de DTOs com class-validator
- CORS configurado
- Headers de segurança HTTP

## 📦 Dependências Principais

### Backend
- @nestjs/core
- @nestjs/common
- @nestjs/jwt
- @prisma/client
- bcryptjs
- class-validator

### Frontend
- next
- react
- axios
- zustand
- tailwindcss

## 🐛 Troubleshooting

### Erro: "Cannot connect to database"
- Verifique credenciais PostgreSQL em `.env`
- Certifique-se que banco está rodando
- Para SQLite, não precisa banco externo

### Erro: "Invalid token"
- Token expirou - faça login novamente
- Verifique se token está sendo enviado corretamente

### Erro: "CORS error"
- Verifique configuração CORS no `app.module.ts`
- Confirme URL do frontend no CORS

### Porta já em uso
- Use porta diferente: `npm run dev -- --port 3001`
- Ou mate o processo: `lsof -i :3000` (Linux/Mac)

## 📚 Documentação Adicional

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/FRONTEND_README.md)
- [NestJS Docs](https://docs.nestjs.com)
- [Next.js Docs](https://nextjs.org/docs)

## 👥 Usuários de Teste

```
Email: admin@teste.com
Senha: senha123
Função: ADMIN

Email: tech@teste.com
Senha: senha123
Função: TECH

Email: user@teste.com
Senha: senha123
Função: USER
```

## 🚀 Deploy

### Backend (Vercel, Render, Railway)
```bash
npm run build
npm start
```

### Frontend (Vercel, Netlify)
```bash
npm run build
npm start
```

Certifique-se de configurar variáveis de ambiente em produção.

## 📝 Licença

Projeto Chamados-App - Sistema de gerenciamento de TI
