# Frontend - Sistema de Chamados TI

Frontend moderno em Next.js 16 com React 19 para gerenciar chamados internos de TI.

## 🚀 Características

- ✅ Autenticação com JWT
- ✅ Gerenciamento de chamados (criar, editar, vizualizar)
- ✅ Sistema de comentários/mensagens
- ✅ Atribuição de chamados a técnicos
- ✅ Controle de prioridade e status
- ✅ Gerenciamento de usuários (apenas admin)
- ✅ Perfil de usuário
- ✅ Interface responsiva com Tailwind CSS

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env.local` e configure a URL da API:

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Se o backend está rodando em uma porta diferente, ajuste a URL conforme necessário.

## 🏃 Executando o projeto

### Modo de desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para produção

```bash
npm run build
npm start
```

## 📁 Estrutura do projeto

```
frontend/
├── app/
│   ├── layout.tsx              # Layout raiz com autenticação
│   ├── page.tsx                # Dashboard/Home
│   ├── login/
│   │   └── page.tsx            # Página de login
│   ├── tickets/
│   │   ├── page.tsx            # Lista de chamados
│   │   ├── new/
│   │   │   └── page.tsx        # Criar novo chamado
│   │   └── [id]/
│   │       └── page.tsx        # Detalhes do chamado
│   ├── profile/
│   │   └── page.tsx            # Perfil do usuário
│   └── users/
│       └── page.tsx            # Gerenciar usuários (admin)
├── components/
│   ├── Header.tsx              # Cabeçalho com navegação
│   ├── LoginForm.tsx           # Formulário de login
│   ├── TicketsList.tsx         # Lista de chamados
│   ├── TicketDetails.tsx       # Detalhes e comentários
│   ├── CreateTicketForm.tsx    # Formulário novo chamado
│   └── UsersList.tsx           # Lista de usuários
├── lib/
│   ├── api.ts                  # Cliente HTTP com axios
│   ├── auth-store.ts           # Zustand store de autenticação
│   ├── ticket-service.ts       # Serviço de chamados
│   ├── message-service.ts      # Serviço de mensagens
│   └── user-service.ts         # Serviço de usuários
└── public/                     # Assets estáticos
```

## 🔐 Autenticação

O aplicativo usa JWT (JSON Web Tokens) para autenticação:

1. Usuário faz login com email e senha
2. Token é armazenado em localStorage
3. Token é enviado em todas as requisições via header `Authorization`
4. Se token expirar, usuário é redirecionado para login

## 👤 Tipos de usuários

### Administrador (ADMIN)
- Criar, editar e remover usuários
- Visualizar todos os chamados
- Modificar qualquer chamado

### Técnico (TECH)
- Atribuir chamados a si mesmo
- Atualizar status, prioridade e diagnóstico
- Responder comentários
- Visualizar todos os chamados

### Usuário (USER)
- Criar seus próprios chamados
- Visualizar status dos seus chamados
- Adicionar comentários
- Editar seu perfil

## 🎯 Fluxo de um chamado

1. **Usuário abre chamado** → Status: ABERTO
2. **Técnico visualiza** → Pode atribuir ou responder
3. **Técnico atribui a si** → Status: ATRIBUIDO
4. **Técnico trabalha no issue** → Status: EM_PROGRESSO
5. **Técnico resolve** → Status: RESOLVIDO com diagnóstico
6. **Admin fecha chamado** → Status: FECHADO

## 📝 Endpoints consumidos

### Autenticação
- `POST /auth/login` - Login
- `GET /users/profile` - Obter perfil atual

### Chamados
- `POST /tickets` - Criar chamado
- `GET /tickets` - Listar chamados
- `GET /tickets/:id` - Obter detalhes
- `PATCH /tickets/:id/status` - Atualizar status
- `PATCH /tickets/:id/priority` - Atualizar prioridade
- `PATCH /tickets/:id/assigned` - Atribuir a técnico
- `PATCH /tickets/:id/diagnosis` - Adicionar diagnóstico
- `DELETE /tickets/:id` - Remover chamado

### Mensagens
- `POST /messages` - Adicionar comentário
- `GET /messages/:ticketId` - Listar comentários

### Usuários
- `POST /users` - Criar usuário (admin)
- `GET /users` - Listar usuários (admin)
- `GET /users/:id` - Obter detalhes
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Remover usuário (admin)

## 🎨 Tecnologias

- **Next.js 16** - Framework React
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS** - Estilo
- **Axios** - Cliente HTTP
- **Zustand** - State Management

## 📚 Documentação adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Erro: "Cannot GET /login"
- Certifique-se de que o servidor de desenvolvimento está rodando
- Verifique se a porta 3000 está disponível

### Erro: "Failed to fetch"
- Verifique se a API backend está rodando
- Confirme a URL da API em `.env.local`
- Verifique CORS na API backend

### Token expirado
- O usuário será automaticamente redirecionado para login
- Faça login novamente

## 📄 Licença

Este projeto é parte do sistema Chamados-App para gerenciamento de TI.
