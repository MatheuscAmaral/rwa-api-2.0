-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cep" INTEGER NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "produto_id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "size" DECIMAL(65,30) NOT NULL,
    "category" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "type_pack" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("produto_id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "pedido_id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "descontos" DECIMAL(65,30) NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "valor_frete" DECIMAL(65,30) NOT NULL,
    "formapag_id" INTEGER NOT NULL,
    "cep" INTEGER NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("pedido_id")
);

-- CreateTable
CREATE TABLE "promocoes" (
    "promocao_id" SERIAL NOT NULL,
    "title_promo" TEXT NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "tipo_desconto" INTEGER NOT NULL,
    "valor_desconto" DECIMAL(65,30) NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "promocoes_pkey" PRIMARY KEY ("promocao_id")
);

-- CreateTable
CREATE TABLE "users_adm" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "users_adm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_item" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "qtd_pedida" INTEGER NOT NULL,
    "qtd_atendida" INTEGER NOT NULL,
    "tipo_desconto" INTEGER NOT NULL,
    "valor_desconto" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "pedido_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_adm_user_key" ON "users_adm"("user");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promocoes" ADD CONSTRAINT "promocoes_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "products"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_item" ADD CONSTRAINT "pedido_item_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "products"("produto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_item" ADD CONSTRAINT "pedido_item_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("pedido_id") ON DELETE RESTRICT ON UPDATE CASCADE;
