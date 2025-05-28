/*
  Warnings:

  - You are about to drop the column `description` on the `books` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "book_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "sinopse" TEXT,
    "pages" INTEGER,
    "category" TEXT,
    "rating" REAL NOT NULL
);
INSERT INTO "new_books" ("author", "book_id", "category", "cover_url", "id", "pages", "rating", "title") SELECT "author", "book_id", "category", "cover_url", "id", "pages", "rating", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_book_id_key" ON "books"("book_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
