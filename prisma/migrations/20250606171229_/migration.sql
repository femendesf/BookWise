-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalBookRead" INTEGER,
    "last_synced_books" DATETIME,
    "hasGoogleBooksPermission" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_users" ("avatar_url", "created_at", "email", "hasGoogleBooksPermission", "id", "last_synced_books", "name", "totalBookRead") SELECT "avatar_url", "created_at", "email", "hasGoogleBooksPermission", "id", "last_synced_books", "name", "totalBookRead" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
