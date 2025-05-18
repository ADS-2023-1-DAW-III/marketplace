# AbacateService

Este serviço é uma integração com a API do **AbacatePay**, uma plataforma que oferece soluções de cobrança eletrônica, incluindo pagamentos via PIX, cartão e outros métodos. O serviço abstrai chamadas HTTP para criação de clientes e cobranças, fornecendo validações básicas e facilidades para uso em projetos **NestJS**.

## Sobre a API AbacatePay

A API do AbacatePay permite gerenciar clientes e criar cobranças PIX. Com ela, é possível automatizar a geração de cobranças recorrentes ou únicas, monitorar status de pagamentos e direcionar usuários para URLs específicas após o pagamento.

### Recursos principais usados:

- **Criação de clientes**: Registra os dados do cliente (nome, telefone, email, CPF) para associações futuras a cobranças.
- **Criação de cobranças**: Gera cobranças para clientes cadastrados, com configurações como frequência (única ou recorrente), métodos de pagamento, produtos e URLs de retorno.

## Como usar o AbacateService

## Método `createCustomer`

Este método cria um cliente na API AbacatePay.

### Parâmetros:

- `name` (string): Nome completo do cliente.
- `cellphone` (string): Telefone no formato `(XX) XXXX-XXXX`.
- `email` (string): Email válido.
- `taxId` (string): CPF no formato `XXX.XXX.XXX-XX`.

### Validações:

- CPF deve estar no formato correto.
- Email deve ser válido.
- Telefone deve seguir o padrão especificado.

### Exemplo de uso:

```typescript
await abacateService.createCustomer(
  'Daniel Lima',
  '(11) 4002-8922',
  'daniel_lima@abacatepay.com',
  '053.733.150-60',
);
```

Se algum dado estiver inválido, a função lançará um erro.

## Método `createBilling`

Cria uma cobrança para um cliente já registrado.

### Parâmetros:

Um objeto com as seguintes propriedades:

- `frequency`: `'ONE_TIME'` (única) ou `'RECURRING'` (recorrente).
- `methods`: Array de strings com métodos de pagamento, ex: `['PIX']`.
- `products`: Array de produtos com:
  - `externalId` (string)
  - `name` (string)
  - `description` (string)
  - `quantity` (number)
  - `price` (number, em centavos)
- `returnUrl`: URL para onde o usuário será redirecionado após a tentativa de pagamento.
- `completionUrl`: URL para onde o usuário será redirecionado após o pagamento ser concluído.
- `customerId` (opcional): ID do cliente registrado previamente.

### Exemplo de uso:

```typescript
const billingData = await abacateService.createBilling({
  frequency: 'ONE_TIME',
  methods: ['PIX'],
  products: [
    {
      externalId: 'prod-1234',
      name: 'Assinatura de Programa Fitness',
      description: 'Acesso ao programa fitness premium por 1 mês.',
      quantity: 2,
      price: 2000, // valor em centavos (R$20,00)
    },
  ],
  returnUrl: 'https://example.com/billing',
  completionUrl: 'https://example.com/completion',
  customerId: 'cust_idyekmfhgvtejrng',
});
```
