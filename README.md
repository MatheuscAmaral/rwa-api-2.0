# API Rwa Suplementos

Bem-vindo ao repositório da **API Rwa Suplementos**, responsável por gerenciar toda a lógica de negócio, persistência de dados e comunicação entre o frontend (React.js) e o banco de dados. Esta API foi desenvolvida com **Node.js**, **Fastify** e **Prisma**, garantindo alta performance, escalabilidade e fácil manutenção.

## Descrição

Este projeto fornece endpoints para todas as operações de um e-commerce de suplementos, como gerenciamento de produtos, carrinho de compras, pedidos e usuários. Com a combinação do **Fastify** (um framework web minimalista) e do **Prisma** (um ORM que facilita a interação com o banco de dados), esta API oferece um backend sólido e robusto para o seu negócio online.

## Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript para construção de aplicações escaláveis.
- **Fastify** – Framework web focado em alta performance e baixa sobrecarga.
- **Prisma** – ORM (Object-Relational Mapping) para interação com bancos de dados, fornecendo migrações e tipagem estática.
- **TypeScript** – Proporciona tipagem estática, reduzindo erros e melhorando a manutenção do código.
- **Banco de Dados** – Geralmente **PostgreSQL** ou **MySQL**, mas você pode adaptar o Prisma a qualquer banco suportado.

## Funcionalidades Principais

1. **Gerenciamento de Produtos**  
   - Criar, listar, editar e remover suplementos.  
   - Cadastro de informações detalhadas (preço, descrição, imagens, categoria, etc.).  

2. **Autenticação e Usuários**  
   - Cadastro e login de usuários.  
   - Recuperação de senha ou redefinição de credenciais.  
   - Proteção de rotas com tokens JWT ou outro método de autenticação.

3. **Carrinho de Compras**  
   - Adicionar e remover itens do carrinho.  
   - Atualizar quantidades e valores automaticamente.  
   - Calcular frete, descontos e subtotal.

4. **Pedidos (Checkout)**  
   - Criação de pedidos a partir do carrinho.  
   - Integração com métodos de pagamento.  
   - Acompanhamento de status de entrega.

5. **Consultas e Filtros**  
   - Filtragem de produtos por categoria, preço e outros atributos.  
   - Opções de busca e paginação para facilitar a navegação de grandes volumes de dados.
