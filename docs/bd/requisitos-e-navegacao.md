# Requisitos e Navegação do Sistema

## Requisitos Funcionais

### Cadastro e Login
- Usuários podem se cadastrar com:
  - Nome
  - Email
  - Senha
  - Habilidades (opcional)
  - Avatar
- Usuários podem fazer login com email e senha.

### Gerenciamento de Perfil
- Acesso e edição de:
  - Nome
  - Email
  - Senha
  - Avatar
  - Habilidades
- Adição, edição e exclusão de serviços oferecidos.

### Busca e Filtros
- Tela inicial com visualização de serviços.
- Filtros disponíveis:
  - Por categoria
  - Por preço
  - Por avaliação

### Gestão de Serviços e Pagamentos
- Acompanhamento do status dos serviços contratados:
  - Pendente
  - Em andamento
  - Concluído
- Exibição de informações de pagamento.

### Feedback e Negociação
- Usuários podem deixar feedback:
  - Nota em estrelas
  - Descrição textual
- Negociação de valores com opções pré-definidas ou livre.

### Cobrança e Pagamento
- Geração de cobrança via PIX.
- Atualização do status de pagamento após confirmação.

---

## Definição de Navegação e Telas

### Tela Login
- **Cadastro de usuário:**
  - Nome, email, habilidades (opcional), senha, avatar.
- **Login:**
  - Email e senha.

### Tela Perfil
- Visualizar e editar dados do perfil:
  - Nome, email, senha, avatar, habilidades.

### Tela de Cadastro de Serviço
- Criar novo serviço com:
  - Foto (opcional), título, descrição, contato, valor, negociável, duração, chave PIX.

### Tela Inicial
- Listagem de serviços com filtros:
  - Categoria, preço, avaliação.

### Tela Meus Serviços
- Visualizar serviços contratados:
  - Estados: pendente, em andamento, concluído.
- Visualizar serviços prestados:
  - Opções de editar e excluir.

### Tela Meus Pagamentos
- Visualizar pagamentos:
  - Realizados, abertos e atrasados.
- Cada card com botão de pagamento.

### Tela Meus Pagamentos > Pagamento
- Geração de cobrança PIX:
  - Exibir QR Code e tempo de expiração.
- Atualização da tela após confirmação do pagamento.

### Tela do Serviço
- Exibir detalhes:
  - Imagem/cor, título, descrição, valor, nome, foto e contato do prestador.
- Mostrar estado e pagamento se contratado.
- Opções adicionais:
  - Adicionar feedback (estrelas + descrição).
  - Negociar valor (opções pré-definidas).
  - Para prestador: ver contratantes e status dos pagamentos (aberto, atrasado, pago) e marcar como pago.

---

## Regras do Sistema

- Qualquer usuário pode criar, editar e excluir seus próprios serviços, sem limite de quantidade.
- Qualquer usuário pode contratar serviços ilimitadamente.
- Um serviço pode pertencer a várias categorias.
- Opções de negociação:
  - Valores fixos
  - Porcentagens
  - Parcelamento
  - Negociação livre (usuário define)
- Estados de pagamento:
  - Aberto
  - Atrasado
  - Concluído
- Apenas contratantes podem avaliar o serviço.
- Estados de um serviço contratado:
  - Pendente
  - Em andamento
  - Concluído

---

## Categorias de Serviços

### 1. Tecnologia e Informática
- Desenvolvimento de Software
- Criação de Sites e Aplicativos
- Suporte Técnico (Hardware e Software)
- Design Gráfico e UX/UI
- Consultoria em TI
- Marketing Digital (SEO, PPC, Redes Sociais)
- Automação de Processos

### 2. Serviços Criativos
- Design Gráfico (Logos, Identidade Visual)
- Fotografia e Vídeo
- Redação (Blog Posts, Artigos, Copywriting)
- Edição de Vídeo e Áudio
- Tradução e Interpretação
- Produção Musical

### 3. Domésticos e Manutenção
- Limpeza de Casa e Escritório
- Reparos e Manutenção Residencial
- Jardinagem e Paisagismo
- Encanação e Elétrica
- Pintura de Ambientes

### 4. Consultoria e Coaching
- Consultoria Empresarial (Marketing, Finanças, Gestão)
- Coaching de Carreira
- Psicologia e Terapias
- Consultoria Financeira
- Desenvolvimento Pessoal

### 5. Saúde e Bem-estar
- Personal Trainer
- Nutrição e Dieta
- Terapias (Fisioterapia, Massoterapia, etc.)
- Cuidados com Idosos
- Saúde Mental

### 6. Educacionais
- Aulas Particulares
- Preparação para Exames
- Cursos Profissionalizantes
- Consultoria Educacional
- Tradução de Materiais Educacionais

### 7. Jurídicos e Contábeis
- Consultoria Jurídica
- Redação de Contratos
- Assessoria Contábil
- Acompanhamento de Processos
- Planejamento Sucessório

### 8. Transporte e Logística
- Mudanças e Fretes
- Motoristas e Entregadores
- Transporte de Animais
- Transporte para Eventos

### 9. Entretenimento e Lazer
- Organização de Eventos
- Animação para Festas
- Aluguel de Equipamentos
- Guias de Turismo
- Aulas de Música/Dança

### 10. Serviços para Animais
- Passeio de Cães
- Cuidados e Banho
- Adestramento
- Pet Sitter

### 11. Moda e Beleza
- Corte e Penteado
- Maquiagem
- Consultoria de Estilo
- Manicure e Pedicure
- Design de Sobrancelhas
- Consultoria de Imagem

### 12. Serviços para Eventos
- Organização de Casamentos
- Decoração
- Segurança
- Fotografia e Filmagem
- DJ e Música

---

## Observações
- Diagramas de navegação e fluxo de telas podem ser adicionados para facilitar o entendimento visual.
- Exemplos de serviços e estados podem ser ilustrados com cards simulados.
