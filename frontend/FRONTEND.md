## 🖥️ Frontend

Este diretório contém a implementação do frontend da aplicação.

### ⚛️ Tecnologias

Optamos por utilizar **React puro**. A escolha foi feita visando **agilidade no desenvolvimento** e **facilidade para que toda a equipe evolua de forma conjunta** no projeto.

As principais bibliotecas utilizadas inicialmente são:

- [ReactJS](https://react.dev/) – Biblioteca principal para construção da interface.
- [React Router](https://reactrouter.com/) – Gerenciamento de rotas SPA.
- [Axios](https://axios-http.com/ptbr/docs/intro) – Requisições HTTP.
- [Moment](https://momentjs.com/) – Manipulação e formatação de datas.
- [ShadCN UI](https://ui.shadcn.com/) – Componentes de UI prontos para uso, baseados em Tailwind.
- [Lucide](https://lucide.dev/) – Ícones em SVG otimizados para React, compatíveis com a biblioteca ShadCN.

### Estruturação de pastas - Inicial

src/
├── assets/ # Imagens, ícones estáticos, fontes, etc.
│
├── components/ # Componentes reutilizáveis em toda a aplicação
│ ├── Button/
│ │ ├── Button.tsx
│ │ └── styles.module.css
│ ├── Input/
│ └── ...
│
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
│
├── routes/ # Configuração do React Router
│ └── index.tsx
│
├── hooks/ # Hooks personalizados reutilizáveis
│ └── useAuth.ts
│
├── App.tsx # Componente raiz
├── main.tsx # Entrada da aplicação
└── index.css # Estilos globais
