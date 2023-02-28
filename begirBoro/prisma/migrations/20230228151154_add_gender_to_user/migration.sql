/*
  Warnings:

  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "password" TEXT,
    "weight" INTEGER,
    "driveLicense" BOOLEAN NOT NULL,
    "address" TEXT NOT NULL,
    "sex" BOOLEAN NOT NULL
);
INSERT INTO "new_User" ("active", "address", "createdAt", "driveLicense", "email", "id", "password", "updatedAt", "weight") SELECT "active", "address", "createdAt", "driveLicense", "email", "id", "password", "updatedAt", "weight" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
