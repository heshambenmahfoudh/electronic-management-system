/*
  Warnings:

  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "TypeMessages_title_officeId_key";

-- DropIndex
DROP INDEX "departmentArchive_title_officeId_key";

-- DropIndex
DROP INDEX "users_email_key";

-- DropIndex
DROP INDEX "users_name_key";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;
