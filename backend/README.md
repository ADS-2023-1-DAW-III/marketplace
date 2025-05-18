# Documentação do Backend

Este é um projeto backend desenvolvido com [NestJS](https://nestjs.com/), utilizando TypeORM e PostgreSQL.

---

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (ou npm/yarn)
- Docker + Docker Compose (para subir o banco)

### Passos

1. **Clone o projeto**

   ```bash
   git clone https://github.com/ADS-2023-1-DAW-III/marketplace.git
   cd marketplace
   cd backend
   ```

2. **Instale as dependências**

   ```bash
   pnpm install
   ```

3. **Configure o banco de dados**

   O projeto usa PostgreSQL com Docker. Suba com:

   ```bash
   docker-compose up -d
   ```

4. **Rode a aplicação**

   ```bash
   pnpm run start:dev
   ```

   A API estará disponível em: `http://localhost:8080`

---

## 🧱 Estrutura de Pastas

Exemplo com entidade Pessoa

```
src/
├── api/                    # Camada de apresentação
│   └── controllers
        └── pessoa.controller.ts
│
├── infra/                  # Infraestrutura (banco de dados, provedores, etc.)
│   ├── database.module.ts
│   ├── database.providers.ts
│   └── repositories/
│       └── pessoa.providers.ts
│
├── modules/                # Domínio da aplicação
│   └── pessoa/
│       ├── dto/            # Data Transfer Objects
│       ├── pessoa.entity.ts
│       ├── pessoa.module.ts
│       └── pessoa.service.ts
│
├── app.module.ts           # Módulo raiz
└── main.ts                 # Arquivo de bootstrap
```

---

## Arquitetura

Este projeto adota uma arquitetura modularizada, dividindo responsabilidades em camadas:

- **Controller (`api/`)**: Expõe os endpoints HTTP e configurações da API.
- **Service (`modules/`)**: Contém a lógica de negócio.
- **Entity/DTO (`modules/`)**: Representa os modelos e as estruturas de dados.
- **Providers (`infra/`)**: Abstrações para injetar dependências como repositórios.
- **Database Module**: Gerencia a conexão com o banco e registra os repositórios.

Esta arquitetura facilita a escalabilidade e manutenção do projeto ao longo do tempo.

---

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- Docker
- pnpm
