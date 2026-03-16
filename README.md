# Chamados App - Sistema de Gerenciamento de Tickets de TI

Um sistema completo para gerenciamento de chamados técnicos de manutenção de TI em empresas. Desenvolvido com NestJS no backend e Next.js no frontend, permite que funcionários criem tickets de suporte, técnicos atendam e resolvam problemas, e administradores gerenciem usuários e tickets com controle de acesso baseado em roles.

## 🚀 Status do Projeto

✅ **Backend**: Implementado e funcional com API RESTful completa  
✅ **Frontend**: Implementado com Next.js 16, autenticação e interface responsiva  
✅ **Banco de Dados**: PostgreSQL com Prisma ORM  
✅ **Documentação**: API documentada com Swagger  

## 📋 Funcionalidades

### Autenticação & Autorização
- 🔐 Sistema de login com JWT
- 👥 Três níveis de usuário: Funcionário, Técnico, Administrador
- 🔒 Controle de acesso baseado em roles (RBAC)
- 🔄 Persistência de sessão no navegador

### Gerenciamento de Tickets
- 🎫 Criação de tickets com título, descrição e prioridade
- 📊 Atribuição de tickets a técnicos especializados
- 📝 Atualização de status (Aberto, Em Progresso, Aguardando Cliente, Resolvido, Fechado)
- 🔍 Diagnóstico técnico e resolução de problemas
- 💬 Sistema de mensagens para comunicação entre usuários
- 📈 Dashboard com visualização de estatísticas

### Gestão de Usuários
- 👤 Cadastro e gerenciamento de usuários
- 🎨 Perfis com foto e informações pessoais
- 🔧 Controle de permissões por role
- 📋 Listagem e filtragem de usuários

### Interface Responsiva
- 📱 Design adaptável para desktop e mobile
- 🎨 Interface moderna com Tailwind CSS
- ⚡ Performance otimizada com Next.js App Router
- 🌙 Tema profissional e intuitivo

## 🛠️ Tecnologias Utilizadas

### Backend (NestJS)
- **Framework**: NestJS 11.0.1
- **Linguagem**: TypeScript 5.7.3
- **Banco de Dados**: PostgreSQL com Prisma ORM 5.19.1
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Class Validator & Class Transformer
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest
- **Segurança**: BcryptJS para hash de senhas
- **CORS**: Configurado para múltiplas origens

### Frontend (Next.js)
- **Framework**: Next.js 16.1.6 com App Router
- **Linguagem**: TypeScript 5
- **React**: 19.2.3
- **Estado Global**: Zustand 4.4.7
- **HTTP Client**: Axios 1.7.4
- **Estilização**: Tailwind CSS 4
- **Fontes**: Geist Sans & Mono
- **Build**: Turbopack para desenvolvimento rápido

## 📁 Estrutura do Projeto

```
chamados-app/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── auth/           # Módulo de autenticação
│   │   │   ├── dto/       # DTOs de login
│   │   │   ├── hashing/   # Serviços de criptografia
│   │   │   └── config/    # Configuração JWT
│   │   ├── users/          # Módulo de usuários
│   │   ├── tickets/        # Módulo de tickets
│   │   ├── messages/       # Módulo de mensagens
│   │   ├── common/         # Decorators e guards compartilhados
│   │   └── database/       # Configuração Prisma
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco de dados
│   │   └── migrations/     # Migrações do banco
│   └── dist/              # Build de produção
├── frontend/              # Aplicação Next.js
│   ├── app/               # App Router (Next.js 13+)
│   │   ├── login/         # Página de login
│   │   ├── profile/       # Perfil do usuário
│   │   ├── tickets/       # Gerenciamento de tickets
│   │   └── users/         # Gerenciamento de usuários
│   ├── components/        # Componentes React
│   ├── lib/              # Utilitários e stores
│   └── public/           # Arquivos estáticos
└── README.md
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 13+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/httpsJadson/chamados-app.git
cd chamados-app
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

#### Configure o banco de dados:
1. Crie um banco PostgreSQL
2. Copie o arquivo `.env` e configure as variáveis:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/chamados_db?schema=public"
PORT=3004
JWT_SECRET="sua-chave-secreta-aqui"
JWT_TOKEN_AUDIENCE=http://localhost:3000
JWT_TOKEN_ISSUE=http://localhost:3000
JWT_TTL=604800
```

3. Execute as migrações:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Inicie o servidor:
```bash
npm run start:dev
```

O backend estará disponível em: `http://localhost:3004`

### 3. Configure o Frontend
```bash
cd ../frontend
npm install
```

Configure a URL da API em `lib/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'http://localhost:3004',
  // ... resto da configuração
});
```

Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:3000`

## 📡 API Endpoints

### Autenticação
- `POST /auth/login` - Realizar login
- `GET /auth/profile` - Obter perfil do usuário autenticado

### Usuários
- `POST /users` - Criar usuário (Admin)
- `GET /users` - Listar usuários (Admin)
- `GET /users/:id` - Obter usuário por ID
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário (Admin)

### Tickets
- `POST /tickets` - Criar ticket
- `GET /tickets` - Listar tickets (com filtros e paginação)
- `GET /tickets/:id` - Obter ticket por ID
- `PATCH /tickets/:id` - Atualizar ticket
- `PATCH /tickets/:id/status` - Atualizar status do ticket
- `PATCH /tickets/:id/priority` - Atualizar prioridade do ticket
- `PATCH /tickets/:id/diagnosis` - Atualizar diagnóstico do ticket
- `DELETE /tickets/:id` - Deletar ticket

### Mensagens
- `POST /messages` - Criar mensagem em um ticket
- `GET /messages` - Listar mensagens por ticket
- `GET /messages/:id` - Obter mensagem por ID
- `PATCH /messages/:id` - Atualizar mensagem
- `DELETE /messages/:id` - Deletar mensagem

## 🔐 Roles e Permissões

### EMPLOYEE (Funcionário)
- ✅ Criar tickets
- ✅ Ver próprios tickets
- ✅ Adicionar mensagens aos próprios tickets
- ✅ Atualizar próprio perfil

### TECHNICIAN (Técnico)
- ✅ Todas as permissões de EMPLOYEE
- ✅ Ver todos os tickets
- ✅ Atribuir tickets a si mesmo
- ✅ Atualizar status e diagnóstico de tickets
- ✅ Adicionar mensagens em qualquer ticket

### ADMIN (Administrador)
- ✅ Todas as permissões de TECHNICIAN
- ✅ Criar, editar e deletar usuários
- ✅ Atribuir tickets a qualquer técnico
- ✅ Gerenciar todo o sistema

## 🎨 Interface do Usuário

### Páginas Principais
- **Login**: `/login` - Autenticação de usuários
- **Home**: `/` - Dashboard com lista de tickets
- **Novo Ticket**: `/tickets/new` - Criar novo chamado
- **Detalhes do Ticket**: `/tickets/[id]` - Visualizar e interagir com ticket
- **Perfil**: `/profile` - Gerenciar perfil do usuário
- **Usuários**: `/users` - Gerenciamento de usuários (Admin)

### Componentes Principais
- **Header**: Navegação superior com informações do usuário
- **TicketsList**: Lista filtrável de tickets
- **TicketDetails**: Visualização completa de um ticket
- **CreateTicketForm**: Formulário de criação de tickets
- **LoginForm**: Formulário de autenticação
- **UsersList**: Lista de usuários com ações

## 🧪 Testes

### Backend
```bash
cd backend
npm run test         # Executar testes
npm run test:watch   # Modo watch
npm run test:cov     # Cobertura de testes
```

### Frontend
```bash
cd frontend
npm run lint         # Verificar linting
```

## 📚 Documentação da API

Acesse a documentação completa da API Swagger em: `http://localhost:3004/api`

## 🚀 Deploy em Produção

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autor

Desenvolvido por Jadson - Sistema de Gerenciamento de Chamados de TI

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

**Última atualização**: Março 2026