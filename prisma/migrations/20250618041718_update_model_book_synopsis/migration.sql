/*
  Warnings:

  - You are about to drop the column `sinopse` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "sinopse",
ADD COLUMN     "synopsis" TEXT;
