# 🏠 Controle de Gastos Residencial

## 📌 Objetivo do Projeto

O **Controle de Gastos Residencial** é uma aplicação web desenvolvida para gerenciar receitas, despesas e transações de uma residência. O sistema facilita:

- ✅ Cadastro e gerenciamento de moradores
- ✅ Organização de despesas e receitas por categoria
- ✅ Registro detalhado de transações financeiras
- ✅ Visualização de totais, saldos e relatórios por pessoa
- ✅ Validação de regras de negócio (menores de idade só podem registrar despesas)

**Público-alvo:** Famílias, casarões compartilhados e grupos que desejam controlar as finanças coletivas de forma centralizada e organizada.

---

## 🎯 Funcionalidades

### 1. **Dashboard** (Página Inicial)
- Visualização rápida de todos os moradores
- Exibição de totais de receitas, despesas e saldo para cada pessoa
- Indicadores visuais de saldo positivo (verde) ou negativo (vermelho)
- Emojis para identificar menores de idade

### 2. **Gerenciamento de Pessoas**
- Cadastro de novos moradores com nome e idade
- Listagem de todas as pessoas registradas
- Remoção de pessoas (com confirmação)
- Validação de menores de idade (< 18 anos)

### 3. **Gerenciamento de Categorias**
- Criação de categorias de despesa/receita
- Classificação por finalidade: Despesa, Receita ou Ambas
- Exibição visual com badges coloridas
- Suporte a categorias como: Alimentação, Transporte, Moradia, Salário, Freelance, Lazer, etc.

### 4. **Registro de Transações**
- Cadastro de receitas e despesas com:
  - Descrição detalhada
  - Valor em reais
  - Data da transação
  - Tipo (Receita ou Despesa)
  - Pessoa responsável
  - Categoria associada
- Validação automática: menores de idade não podem registrar receitas
- Filtros por tipo de transação e pessoa
- Cálculo automático de totais

### 5. **Relatórios e Totais**
- Totais de receitas, despesas e saldo por pessoa
- Visualização em tempo real
- Formatação de valores em Real (R$)
- Formatação de datas em padrão brasileiro

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Next.js 16** - Framework React com renderização no servidor
- **React 19** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitário
- **ESLint** - Ferramenta de linting

### **Backend**
- **.NET 10** - Framework para desenvolvimento web em C#
- **ASP.NET Core** - Framework web moderno
- **Entity Framework Core** - ORM para banco de dados
- **SQLite** - Banco de dados relacional leve
- **Swagger/OpenAPI** - Documentação automática de API

### **Infraestrutura**
- **CORS** - Configuração para comunicação entre frontend e backend
- **npm** - Gerenciador de pacotes Node.js
- **dotnet CLI** - Interface de linha de comando do .NET

---

## 📁 Estrutura do Projeto

```
controle-gastos-residencial/
├── backend/
│   └── ControleGastosApi/
│       ├── Controllers/              # Endpoints da API
│       │   ├── PessoaController.cs
│       │   ├── CategoriaController.cs
│       │   └── TransacaoController.cs
│       ├── Models/                   # Modelos de dados
│       │   ├── Pessoa.cs
│       │   ├── Categoria.cs
│       │   └── Transacao.cs
│       ├── Data/
│       │   ├── AppDbContext.cs       # Contexto do banco de dados
│       ├── Migrations/               # Migrações do Entity Framework
│       ├── Program.cs                # Configuração da aplicação
│       ├── appsettings.json          # Configurações
│       └── ControleGastosApi.csproj
├── frontend/
│   ├── src/
│   │   ├── app/                      # Páginas da aplicação
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── pessoas/
│   │   │   │   └── page.tsx
│   │   │   ├── categorias/
│   │   │   │   └── page.tsx
│   │   │   ├── transacoes/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   └── layout.tsx
│   │   ├── components/               # Componentes reutilizáveis
│   │   │   ├── layout/
│   │   │   │   └── Navbar.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       └── Input.tsx
│   │   └── lib/
│   │       └── api.ts                # Configuração da API
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── .env.local
├── controle-gastos-residencial.sln  # Solução Visual Studio
└── README.md                          # Este arquivo
```

---

## 🚀 Como Instalar e Executar

### **Pré-requisitos**

- Node.js 18+ ([Download](https://nodejs.org/))
- .NET 10 SDK ([Download](https://dotnet.microsoft.com/download))
- Git
- Visual Studio Code (opcional, mas recomendado)

### **1. Clonar o Repositório**

```bash
git clone <seu-repositório>
cd controle-gastos-residencial
```

### **2. Configurar o Backend**

```bash
# Navegar para o diretório do backend
cd backend/ControleGastosApi

# Restaurar dependências
dotnet restore

# Compilar o projeto
dotnet build

# Aplicar migrações do banco de dados
dotnet ef database update

# Iniciar o servidor (porta 5039)
dotnet run
```

**Swagger de documentação da API:** http://localhost:5039/swagger

### **3. Configurar o Frontend**

```bash
# Voltar para a raiz do projeto
cd ../../frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev
```

**Acesso à aplicação:** http://localhost:3000

### **4. Ambiente (.env.local)**

O arquivo `.env.local` já está configurado com a URL da API:

```env
NEXT_PUBLIC_API_URL=http://localhost:5039
```

Se a porta mudar, atualize este arquivo.

---

## 📖 Como Usar

### **1. Dashboard**
- Acesse http://localhost:3000
- Visualize todas as pessoas e seus saldos
- Navegue pelas abas utilizando o menu superior

### **2. Cadastrar uma Pessoa**
1. Clique na aba **Pessoas**
2. Preencha o formulário com nome e idade
3. Clique em **Cadastrar Pessoa**

### **3. Criar Categorias**
1. Clique na aba **Categorias**
2. Insira uma descrição (ex: "Alimentação")
3. Selecione a finalidade (Despesa, Receita ou Ambas)
4. Clique em **Cadastrar Categoria**

### **4. Registrar Transações**
1. Clique na aba **Transações**
2. Preencha os campos:
   - **Descrição:** Detalhe da transação
   - **Valor:** Quantidade em reais
   - **Data:** Data da transação
   - **Tipo:** Selecione Despesa ou Receita
   - **Pessoa:** Quem registra a transação
   - **Categoria:** Categoria associada
3. Clique em **Cadastrar Transação**

**Nota:** Se a pessoa for menor de 18 anos, não poderá registrar receitas.

### **5. Visualizar Totais**
- No Dashboard, cada pessoa mostra:
  - **Receitas totais** (verde)
  - **Despesas totais** (vermelho)
  - **Saldo** (verde se positivo, vermelho se negativo)

---

## 💾 Dados de Exemplo

O projeto já vem com dados de exemplo precarregados:

### **Pessoas Cadastradas**
| Nome | Idade |
|------|-------|
| Matheus | 25 |
| Maria Santos | 32 |
| Pedro Costa | 45 |
| Ana Oliveira | 28 |
| Lucas Pereira | 16 |

### **Categorias**
- Transporte (Despesa)
- Moradia (Despesa)
- Freelance (Receita)
- Lazer (Despesa)
- Alimentação (Despesa)

### **Transações de Exemplo**
1. **Salário mensal** - R$ 3.500,00 (Receita - Matheus)
2. **Compras no supermercado** - R$ 350,50 (Despesa - Matheus)
3. **Uber para o trabalho** - R$ 125,00 (Despesa - Maria Santos)
4. **Cinema com amigos** - R$ 80,00 (Despesa - Pedro Costa)
5. **Trabalho freelance website** - R$ 1.200,00 (Receita - Ana Oliveira)
6. **Aluguel do apartamento** - R$ 1.500,00 (Despesa - Pedro Costa)

Para adicionar mais dados, use a interface da aplicação ou execute o script (`seed-final.js`).

---

## 🔧 Regras de Negócio

1. ✅ **Menores de 18 anos** só podem registrar **despesas**
2. ✅ **Todas as transações** devem ter Pessoa e Categoria associadas
3. ✅ **O aluguel** cascata remove transações quando uma pessoa é deletada
4. ✅ **Valores** são armazenados como string mas formatados como moeda brasileira
5. ✅ **Datas** seguem o padrão ISO 8601

---

## 🐛 Solução de Problemas

### **Erro: "Erro ao conectar com a API"**
- Verifique se o backend está rodando em `http://localhost:5039`
- Confirme que o arquivo `.env.local` tem a URL correta
- Reinicie ambos os servidores

### **Erro: "no such table: Pessoas"**
- Execute `dotnet ef database update` no diretório do backend
- Verifique se o arquivo `gastos.db` foi criado

### **Erro: "Port 3000 is already in use"**
- Mude a porta: `npm run dev -- -p 3001`
- Ou encerre o processo usando a porta 3000

### **Erro ao registrar transação (Pessoa/Categoria required)**
- Remova o JSON com as propriedades aninhadas (`pessoa`, `categoria`)
- Envie apenas os IDs (`pessoaId`, `categoriaId`)

---

## 📊 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend                           │
│  (Next.js 16 + React 19 + TypeScript + Tailwind)       │
│  ├── Dashboard                                          │
│  ├── Pessoas                                            │
│  ├── Categorias                                         │
│  └── Transações                                         │
└─────────────────┬───────────────────────────────────────┘
                  │ HTTP/JSON + CORS
                  ↓
      ┌───────────────────────────┐
      │   Backend API (.NET 10)    │
      │  ├── PessoaController     │
      │  ├── CategoriaController  │
      │  └── TransacaoController  │
      └──────────┬────────────────┘
                 │ Entity Framework Core
                 ↓
      ┌───────────────────────────┐
      │   SQLite Database          │
      │  ├── Pessoas              │
      │  ├── Categorias           │
      │  └── Transacoes           │
      └───────────────────────────┘
```

---

## 🎓 Aprendizados e Desafios

### **Desafios Solucionados**

1. **Migrações do Banco de Dados**
   - Problema: Coluna duplicada ao aplicar migrations
   - Solução: Remover migration problemática e reaplicar a correta

2. **Validação de Entidades no EntityFramework**
   - Problema: Erro ao enviar Pessoa e Categoria como propriedades aninhadas
   - Solução: Usar `[JsonIgnore]` nas navegações e enviar apenas IDs

3. **Sincronização Frontend-Backend**
   - Problema: Porta diferente (5000 vs 5039)
   - Solução: Configurar `.env.local` com a porta correta

4. **Validação de Menores de Idade**
   - Implementado no controller com validação de regra de negócio
   - Mensagem clara ao usuário

---

## 🚀 Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Exportação de relatórios em PDF
- [ ] Gráficos e visualizações de dados
- [ ] Filtros avançados por período
- [ ] Backup automático do banco de dados
- [ ] Temas claro/escuro
- [ ] Suporte a múltiplas moedas
- [ ] Integração com banco de dados na nuvem
- [ ] Progressive Web App (PWA)
- [ ] Aplicativo mobile (React Native)

---

## 📃 Endpoints da API

### **Pessoas**
- `GET /api/Pessoa` - Listar todas
- `POST /api/Pessoa` - Criar nova
- `DELETE /api/Pessoa/{id}` - Remover
- `GET /api/Pessoa/{id}/totais` - Ver totais

### **Categorias**
- `GET /api/Categoria` - Listar todas
- `POST /api/Categoria` - Criar nova

### **Transações**
- `GET /api/Transacao` - Listar todas
- `POST /api/Transacao` - Criar nova

**Documentação completa:** http://localhost:5039/swagger

---

## 👥 Contribuição

Este projeto foi desenvolvido como parte de um exercício de desenvolvimento full-stack.

**Tecnologias aprendidas:**
- Frontend moderno com Next.js e React
- Backend robusto com .NET e Entity Framework
- Integração de APIs REST
- Validação e tratamento de erros
- Banco de dados relacional com SQLite

---

## 📝 Conclusão

O **Controle de Gastos Residencial** demonstra a integração completa entre um frontend moderno (Next.js + React) e um backend robusto (.NET). A aplicação oferece uma solução prática para gerenciar finanças de forma centralizada, com validações de negócio e uma interface amigável.

**Status:** ✅ Projeto Concluído e Funcional

**Data de Conclusão:** Fevereiro de 2026

---

## 📞 Contato e Suporte

Para dúvidas ou sugestões sobre o projeto, consulte a documentação da API ou revise o código-fonte.

---

**Desenvolvido com ❤️ usando Next.js e .NET**
