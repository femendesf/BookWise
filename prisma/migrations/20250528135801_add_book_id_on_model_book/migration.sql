/*
  Warnings:

  - Added the required column `book_id` to the `books` table without a default value. This is not possible if the table is not empty.

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
    "pages" INTEGER,
    "category" TEXT,
    "rating" REAL NOT NULL
);
INSERT INTO "new_books" ("author", "category", "cover_url", "id", "pages", "rating", "title") SELECT "author", "category", "cover_url", "id", "pages", "rating", "title" FROM "books";
DROP TABLE "books";
ALTER TABLE "new_books" RENAME TO "books";
CREATE UNIQUE INDEX "books_book_id_key" ON "books"("book_id");
CREATE UNIQUE INDEX "books_title_author_key" ON "books"("title", "author");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
