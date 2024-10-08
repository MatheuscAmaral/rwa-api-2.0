-- CreateTable
CREATE TABLE "formas_pagamentos" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "formas_pagamentos_pkey" PRIMARY KEY ("id")
);
