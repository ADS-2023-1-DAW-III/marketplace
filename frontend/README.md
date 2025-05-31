🖥️ Frontend
Este diretório contém a implementação do frontend da aplicação.

⚛️ Tecnologias
Optamos por utilizar React Router framework. A escolha foi feita visando agilidade no desenvolvimento e facilidade para que toda a equipe evolua de forma conjunta no projeto.

As principais bibliotecas utilizadas inicialmente são:

ReactJS – Biblioteca principal para construção da interface.
React Router – Gerenciamento de rotas SPA.
Axios – Requisições HTTP.
Moment – Manipulação e formatação de datas.
ShadCN UI – Componentes de UI prontos para uso, baseados em Tailwind.
Lucide – Ícones em SVG otimizados para React, compatíveis com a biblioteca ShadCN.
Estruturação de pastas - Inicial

public/\*

├── favicon.ico

app/

├── assets/ # Imagens, ícones estáticos, fontes, etc.

├── components/ # Componentes reutilizáveis em toda a aplicação

│ ├── Button/

│ │ ├── Button.tsx

│ │ └── styles.module.css

│ ├── Input/

│ └── ...

├── pages/ # Cada tela tem sua própria pasta

│ ├── Home/

│ │ ├── Home.tsx

│ │ ├── Home.module.css

│ │ └── HomeService.ts # Serviços (ex: chamadas axios) específicos da tela

│ │

│ ├── Login/

│ │ ├── Login.tsx

│ │ └── Login.module.css

│ │

│ ├── Dashboard/

│ │ ├── Dashboard.tsx

│ │ ├── Dashboard.module.css

│ │ └── Charts.tsx

│ │

│ └── ...

├── routes/ # Configuração do React Router

│ └── index.tsx

├── hooks/ # Hooks personalizados reutilizáveis

│ └── useAuth.ts

├── App.tsx # Componente raiz

├── root.tsx # Entrada da aplicação

├── root.ts # Inicialização de rotas

└── app.css # Estilos globais

---

# Bem-vindo ao React Router!

Um template moderno e pronto para produção para construir aplicações React full-stack utilizando React Router.

[![Abrir no StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Funcionalidades

- 🚀 Renderização do lado do servidor (Server-side rendering)
- ⚡️ Substituição de Módulo a Quente (HMR - Hot Module Replacement)
- 📦 Empacotamento e otimização de recursos
- 🔄 Carregamento e mutações de dados
- 🔒 TypeScript como padrão
- 🎉 TailwindCSS para estilização
- 📖 [Documentação do React Router](https://reactrouter.com/)

## Começando

### Instalação

Instale as dependências:

```bash
npm install
```

### Desenvolvimento

Inicie o servidor de desenvolvimento com HMR:

```bash
npm run dev
```

Sua aplicação estará disponível em `http://localhost:5173`.

## Construindo para Produção

Crie um build para produção:

```bash
npm run build
```

## Implantação

### Implantação com Docker

Para construir e executar utilizando Docker:

```bash
docker build -t my-app .

# Execute o container
docker run -p 3000:3000 my-app
```

A aplicação containerizada pode ser implantada em qualquer plataforma que suporte Docker, incluindo:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Implantação DIY (Faça você mesmo)

Se você está familiarizado com a implantação de aplicações Node, o servidor embutido na aplicação já está pronto para produção.

Certifique-se de implantar a saída gerada por `npm run build`:

```
├── package.json
├── package-lock.json (ou pnpm-lock.yaml, ou bun.lockb)
├── build/
│   ├── client/    # Recursos estáticos
│   └── server/    # Código do lado do servidor
```

## Estilização

Este template já vem com [Tailwind CSS](https://tailwindcss.com/) configurado para uma experiência inicial simples. Você pode usar qualquer framework CSS que preferir.

---
