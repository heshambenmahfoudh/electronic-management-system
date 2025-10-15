/*
  Warnings:

  - Added the required column `imageUrl` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeResidence` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "placeResidence" TEXT NOT NULL;
