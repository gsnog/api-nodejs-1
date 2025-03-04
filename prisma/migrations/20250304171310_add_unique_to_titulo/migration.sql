/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_titulo_key" ON "Post"("titulo");
