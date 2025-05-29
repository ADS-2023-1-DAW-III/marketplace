# ARQUITETURA PNPM FULLSTACK

## Responsabilidades de cada componente:

### Gerenciador de dependências
- PNPM

### Frontend
- React
- Vite
- SWC
- Typescript

### Backend
- Nest
- Typescript

### Packages
Ambiente de códigos compartilhados e configurações gerais:
- API clients (requisições para a api)
- Types (tipos em comum: Requests e Responses)
- Utils (formatadores)
- Components (componentes UI)

## Comandos pnpm

- Adicionar dependências:
    
    - normal: `pnpm add --filter <package> <dependency>`
    
    - dev: `pnpm add --filter <package> <dependency> -D`

    - workspace: `pnpm add <package-name> --filter <package> --workspace`

- Executar scripts: `pnpm --filter <package> <command>`