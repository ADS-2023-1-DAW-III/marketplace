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

public/

├── index.html
├── icon.ico

src/

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

├── index.tsx # Entrada da aplicação

└── index.css # Estilos globais

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
