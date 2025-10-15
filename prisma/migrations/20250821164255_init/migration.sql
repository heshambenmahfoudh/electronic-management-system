/*
  Warnings:

  - Made the column `imageUrl` on table `offices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "offices" ALTER COLUMN "imageUrl" SET NOT NULL;
