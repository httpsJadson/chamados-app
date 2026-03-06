# Chamados App

Um aplicativo interno para gerenciamento de chamados técnicos de manutenção de TI em uma empresa. Permite que funcionários criem tickets de suporte, técnicos diagnostiquem e resolvam problemas, e administradores gerenciem usuários e tickets.

## Tecnologias Utilizadas

### Backend
- **NestJS**: Framework para construção da API RESTful.
- **Prisma ORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação e autorização.
- **Class Validator**: Validação de dados de entrada.

### Frontend (Planejado)
- **React**: Biblioteca para construção da interface do usuário.
- **TypeScript**: Tipagem estática para JavaScript.

## Estrutura do Projeto

```
chamados-app/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── auth/       # Módulo de autenticação (futuro)
│   │   ├── users/      # Módulo de usuários
│   │   ├── tickets/    # Módulo de tickets
│   │   ├── messages/   # Módulo de mensagens
│   │   └── database/   # Configuração do Prisma
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── package.json
└── frontend/          # Aplicação React (a ser implementada)
```

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- PostgreSQL (versão 13 ou superior)
- Git

## Instalação e Configuração

### 1. Clonagem do Repositório

```bash
git clone https://github.com/httpsJadson/chamados-app.git
cd chamados-app
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

#### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL.
2. Copie o arquivo `.env.example` para `.env` e configure as variáveis:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/chamados_db?schema=public"
JWT_SECRET="your-secret-key"
```

3. Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

4. Gere o cliente Prisma:

```bash
npx prisma generate
```

### 3. Configuração do Frontend (Futuro)

```bash
cd ../frontend
npx create-react-app . --template typescript
npm install axios react-router-dom @types/react-router-dom
```

## Executando a Aplicação

### Backend

```bash
cd backend
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

### Frontend (Após implementação)

```bash
cd frontend
npm start
```

A aplicação estará disponível em `http://localhost:3001`.

## API Endpoints

### Usuários
- `POST /users` - Criar usuário
- `GET /users` - Listar usuários
- `GET /users/:id` - Obter usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Tickets
- `POST /tickets` - Criar ticket
- `GET /tickets` - Listar tickets
- `GET /tickets/:id` - Obter ticket por ID
- `PATCH /tickets/:id` - Atualizar ticket
- `PATCH /tickets/:id/status` - Atualizar status do ticket
- `DELETE /tickets/:id` - Deletar ticket

### Mensagens
- `POST /messages` - Criar mensagem
- `GET /messages` - Listar mensagens
- `GET /messages/:id` - Obter mensagem por ID
- `PATCH /messages/:id` - Atualizar mensagem
- `DELETE /messages/:id` - Deletar mensagem

## Funcionalidades

- **Criação de Tickets**: Funcionários podem criar tickets descrevendo problemas de TI.
- **Atribuição de Tickets**: Administradores podem atribuir tickets a técnicos.
- **Diagnóstico e Resolução**: Técnicos podem adicionar diagnósticos e atualizar o status dos tickets.
- **Comunicação**: Mensagens podem ser trocadas entre usuários relacionados ao ticket.
- **Gerenciamento de Usuários**: Controle de roles (Funcionário, Técnico, Administrador).

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.</content>
<parameter name="filePath">README.md