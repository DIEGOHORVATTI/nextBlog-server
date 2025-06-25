# API Documentation - Backend Routes

## Visão Geral

Este documento descreve todas as rotas disponíveis no backend, suas regras de negócio, autenticação e permissões necessárias.

## Autenticação

A maioria das rotas requer autenticação via JWT Token no header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Estrutura de Resposta

### Sucesso

\`\`\`json
{
"data": {...},
"message": "Success message"
}
\`\`\`

### Erro

\`\`\`json
{
"error": "Error message",
"code": 400
}
\`\`\`

---

## 🔐 Autenticação (Auth)

### POST `/api/auth/register`

**Descrição:** Registra um novo usuário no sistema

**Autenticação:** Não requerida

**Body:**
\`\`\`json
{
"name": "string (obrigatório)",
"email": "string (obrigatório, único)",
"password": "string (obrigatório, min 6 caracteres)"
}
\`\`\`

**Regras de Negócio:**

- Email deve ser único no sistema
- Senha deve ter no mínimo 6 caracteres
- Nome é obrigatório
- Usuário criado com role "user" por padrão
- Senha é criptografada com bcrypt
- Retorna JWT token válido por 24h

**Resposta de Sucesso (201):**
\`\`\`json
{
"token": "jwt_token",
"user": {
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"role": "user"
}
}
\`\`\`

---

### POST `/api/auth/login`

**Descrição:** Autentica usuário existente

**Autenticação:** Não requerida

**Body:**
\`\`\`json
{
"email": "string (obrigatório)",
"password": "string (obrigatório)"
}
\`\`\`

**Regras de Negócio:**

- Email deve existir no sistema
- Senha deve corresponder ao hash armazenado
- Retorna JWT token válido por 24h
- Atualiza último login do usuário

**Resposta de Sucesso (200):**
\`\`\`json
{
"token": "jwt_token",
"user": {
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"role": "user"
}
}
\`\`\`

---

### GET `/api/auth/me`

**Descrição:** Retorna dados do usuário autenticado

**Autenticação:** Requerida

**Regras de Negócio:**

- Token JWT deve ser válido
- Retorna dados atualizados do usuário
- Não retorna senha ou dados sensíveis

**Resposta de Sucesso (200):**
\`\`\`json
{
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"role": "user",
"created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### POST `/api/auth/refresh`

**Descrição:** Renova token JWT

**Autenticação:** Requerida

**Regras de Negócio:**

- Token atual deve ser válido
- Gera novo token com validade de 24h
- Mantém mesmas permissões do usuário

**Resposta de Sucesso (200):**
\`\`\`json
{
"token": "new_jwt_token",
"user": {
"id": 1,
"email": "joao@email.com",
"role": "user"
}
}
\`\`\`

---

## 📝 Posts (Blog)

### GET `/api/posts`

**Descrição:** Lista todos os posts públicos

**Autenticação:** Não requerida

**Query Parameters:**

- `category` (string): Filtrar por categoria
- `author` (string): Filtrar por nome do autor
- `search` (string): Buscar no título e conteúdo
- `limit` (number): Limitar quantidade de resultados

**Regras de Negócio:**

- Retorna posts ordenados por data de criação (mais recentes primeiro)
- Inclui dados do autor (nome e email)
- Suporte a filtros múltiplos
- Busca é case-insensitive

**Resposta de Sucesso (200):**
\`\`\`json
[
{
"id": 1,
"title": "Meu Primeiro Post",
"content": "Conteúdo do post...",
"tags": ["javascript", "react"],
"category": "tecnologia",
"author_id": 1,
"author_name": "João Silva",
"author_email": "joao@email.com",
"created_at": "2024-01-01T00:00:00Z",
"updated_at": "2024-01-01T00:00:00Z"
}
]
\`\`\`

---

### GET `/api/posts/:id`

**Descrição:** Retorna um post específico

**Autenticação:** Não requerida

**Parâmetros:**

- `id` (number): ID do post

**Regras de Negócio:**

- Post deve existir
- Inclui dados completos do autor
- Incrementa contador de visualizações (se implementado)

**Resposta de Sucesso (200):**
\`\`\`json
{
"id": 1,
"title": "Meu Primeiro Post",
"content": "Conteúdo completo do post...",
"tags": ["javascript", "react"],
"category": "tecnologia",
"author_id": 1,
"author_name": "João Silva",
"author_email": "joao@email.com",
"created_at": "2024-01-01T00:00:00Z",
"updated_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### POST `/api/posts`

**Descrição:** Cria um novo post

**Autenticação:** Requerida

**Body:**
\`\`\`json
{
"title": "string (obrigatório)",
"content": "string (obrigatório)",
"tags": ["string"] (opcional),
"category": "string (opcional)"
}
\`\`\`

**Regras de Negócio:**

- Usuário deve estar autenticado
- Título e conteúdo são obrigatórios
- Tags devem ser array de strings
- Autor é automaticamente o usuário autenticado
- Data de criação e atualização são definidas automaticamente

**Resposta de Sucesso (201):**
\`\`\`json
{
"id": 1,
"title": "Novo Post",
"content": "Conteúdo do post...",
"tags": ["tag1", "tag2"],
"category": "categoria",
"author_id": 1,
"author_name": "João Silva",
"author_email": "joao@email.com",
"created_at": "2024-01-01T00:00:00Z",
"updated_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### PUT `/api/posts/:id`

**Descrição:** Atualiza um post existente

**Autenticação:** Requerida

**Parâmetros:**

- `id` (number): ID do post

**Body:**
\`\`\`json
{
"title": "string (opcional)",
"content": "string (opcional)",
"tags": ["string"] (opcional),
"category": "string (opcional)"
}
\`\`\`

**Regras de Negócio:**

- Post deve existir
- Usuário deve ser o autor do post OU ter role "admin"
- Apenas campos enviados são atualizados
- Data de atualização é automaticamente definida
- Não é possível alterar o autor

**Resposta de Sucesso (200):**
\`\`\`json
{
"id": 1,
"title": "Post Atualizado",
"content": "Conteúdo atualizado...",
"tags": ["nova-tag"],
"category": "nova-categoria",
"author_id": 1,
"author_name": "João Silva",
"author_email": "joao@email.com",
"created_at": "2024-01-01T00:00:00Z",
"updated_at": "2024-01-02T00:00:00Z"
}
\`\`\`

---

### DELETE `/api/posts/:id`

**Descrição:** Remove um post

**Autenticação:** Requerida

**Parâmetros:**

- `id` (number): ID do post

**Regras de Negócio:**

- Post deve existir
- Usuário deve ser o autor do post OU ter role "admin"
- Remoção é permanente
- Remove também comentários associados (se implementado)

**Resposta de Sucesso (204):**
\`\`\`
No Content
\`\`\`

---

### GET `/api/posts/stats`

**Descrição:** Retorna estatísticas dos posts

**Autenticação:** Não requerida

**Regras de Negócio:**

- Retorna contadores gerais
- Agrupa posts por categoria
- Conta autores únicos

**Resposta de Sucesso (200):**
\`\`\`json
{
"totalPosts": 150,
"totalAuthors": 25,
"postsByCategory": [
{
"category": "tecnologia",
"count": 45
},
{
"category": "lifestyle",
"count": 30
}
]
}
\`\`\`

---

## 👥 Usuários (Users)

### GET `/api/users`

**Descrição:** Lista todos os usuários

**Autenticação:** Requerida (Admin apenas)

**Permissões:** Role "admin"

**Regras de Negócio:**

- Apenas administradores podem listar usuários
- Não retorna senhas
- Ordenado por data de criação

**Resposta de Sucesso (200):**
\`\`\`json
[
{
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"role": "user",
"created_at": "2024-01-01T00:00:00Z"
}
]
\`\`\`

---

### GET `/api/users/:id`

**Descrição:** Retorna dados de um usuário específico

**Autenticação:** Requerida

**Parâmetros:**

- `id` (number): ID do usuário

**Regras de Negócio:**

- Usuário pode ver próprios dados
- Administradores podem ver dados de qualquer usuário
- Não retorna senha

**Resposta de Sucesso (200):**
\`\`\`json
{
"id": 1,
"name": "João Silva",
"email": "joao@email.com",
"role": "user",
"created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### PUT `/api/users/:id`

**Descrição:** Atualiza dados de um usuário

**Autenticação:** Requerida

**Parâmetros:**

- `id` (number): ID do usuário

**Body:**
\`\`\`json
{
"name": "string (opcional)",
"email": "string (opcional)"
}
\`\`\`

**Regras de Negócio:**

- Usuário pode atualizar próprios dados
- Administradores podem atualizar dados de qualquer usuário
- Email deve ser único se alterado
- Não é possível alterar role via esta rota
- Não é possível alterar senha via esta rota

**Resposta de Sucesso (200):**
\`\`\`json
{
"id": 1,
"name": "João Silva Atualizado",
"email": "novo@email.com",
"role": "user",
"created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### DELETE `/api/users/:id`

**Descrição:** Remove um usuário

**Autenticação:** Requerida (Admin apenas)

**Parâmetros:**

- `id` (number): ID do usuário

**Permissões:** Role "admin"

**Regras de Negócio:**

- Apenas administradores podem remover usuários
- Usuário deve existir
- Remove também posts associados (cascade)
- Remoção é permanente

**Resposta de Sucesso (204):**
\`\`\`
No Content
\`\`\`

---

### GET `/api/users/stats`

**Descrição:** Retorna estatísticas dos usuários

**Autenticação:** Requerida (Admin apenas)

**Permissões:** Role "admin"

**Regras de Negócio:**

- Apenas administradores podem ver estatísticas
- Agrupa usuários por role

**Resposta de Sucesso (200):**
\`\`\`json
{
"totalUsers": 100,
"usersByRole": [
{
"role": "user",
"count": 95
},
{
"role": "admin",
"count": 5
}
]
}
\`\`\`

---

## 📅 Eventos (Events)

### POST `/api/events`

**Descrição:** Cria um novo evento

**Autenticação:** Requerida

**Body:**
\`\`\`json
{
"title": "string (obrigatório)",
"description": "string (opcional)",
"start_date": "datetime (obrigatório)",
"end_date": "datetime (obrigatório)",
"location": "string (opcional)",
"type": "string (opcional)"
}
\`\`\`

**Regras de Negócio:**

- Usuário deve estar autenticado
- Data de início deve ser anterior à data de fim
- Data de início não pode ser no passado
- Criador é automaticamente o usuário autenticado

**Resposta de Sucesso (201):**
\`\`\`json
{
"id": 1,
"title": "Reunião de Equipe",
"description": "Reunião semanal da equipe",
"start_date": "2024-01-15T10:00:00Z",
"end_date": "2024-01-15T11:00:00Z",
"location": "Sala de Reuniões",
"type": "meeting",
"creator_id": 1,
"created_at": "2024-01-01T00:00:00Z"
}
\`\`\`

---

### GET `/api/events/my-events`

**Descrição:** Lista eventos do usuário autenticado

**Autenticação:** Requerida

**Query Parameters:**

- `start_date` (datetime): Filtrar eventos a partir desta data
- `end_date` (datetime): Filtrar eventos até esta data
- `type` (string): Filtrar por tipo de evento

**Regras de Negócio:**

- Retorna apenas eventos criados pelo usuário autenticado
- Ordenado por data de início
- Suporte a filtros por data e tipo

**Resposta de Sucesso (200):**
\`\`\`json
[
{
"id": 1,
"title": "Meu Evento",
"description": "Descrição do evento",
"start_date": "2024-01-15T10:00:00Z",
"end_date": "2024-01-15T11:00:00Z",
"location": "Local do evento",
"type": "meeting",
"creator_id": 1,
"created_at": "2024-01-01T00:00:00Z"
}
]
\`\`\`

---

### GET `/api/events/calendar`

**Descrição:** Retorna eventos para visualização em calendário

**Autenticação:** Requerida

**Query Parameters:**

- `month` (number): Mês (1-12)
- `year` (number): Ano
- `view` (string): Tipo de visualização (month, week, day)

**Regras de Negócio:**

- Retorna eventos do usuário para o período especificado
- Formato otimizado para componentes de calendário
- Inclui eventos recorrentes (se implementado)

**Resposta de Sucesso (200):**
\`\`\`json
[
{
"id": 1,
"title": "Evento do Calendário",
"start": "2024-01-15T10:00:00Z",
"end": "2024-01-15T11:00:00Z",
"allDay": false,
"color": "#3174ad",
"extendedProps": {
"description": "Descrição do evento",
"location": "Local",
"type": "meeting"
}
}
]
\`\`\`

---

## 🔒 Códigos de Erro Comuns

### 400 - Bad Request

- Dados obrigatórios não fornecidos
- Formato de dados inválido
- Validação falhou

### 401 - Unauthorized

- Token JWT não fornecido
- Token JWT inválido ou expirado
- Credenciais inválidas

### 403 - Forbidden

- Usuário não tem permissão para a ação
- Tentativa de acessar recurso de outro usuário

### 404 - Not Found

- Recurso não encontrado
- Rota não existe

### 409 - Conflict

- Email já existe no sistema
- Conflito de dados únicos

### 500 - Internal Server Error

- Erro interno do servidor
- Erro de conexão com banco de dados

---

## 🛡️ Middleware de Segurança

### Autenticação (authMiddleware)

- Verifica presença do token JWT
- Valida assinatura do token
- Adiciona dados do usuário ao request

### Permissões (permissionMiddleware)

- Verifica role do usuário
- Controla acesso baseado em permissões
- Permite acesso a recursos próprios

### Validação

- Valida formato dos dados de entrada
- Sanitiza dados para prevenir ataques
- Retorna erros específicos de validação

---

## 📊 Rate Limiting

- **Registro/Login:** 5 tentativas por minuto por IP
- **API Geral:** 100 requisições por minuto por usuário
- **Upload de arquivos:** 10 uploads por minuto por usuário

---

## 🔄 Versionamento

- Versão atual: v1
- Todas as rotas são prefixadas com `/api/v1/`
- Versionamento via URL path
- Backward compatibility mantida por 6 meses
