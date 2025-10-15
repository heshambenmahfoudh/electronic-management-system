/*
  Warnings:

  - You are about to drop the column `officeNameName` on the `document` table. All the data in the column will be lost.
  - Added the required column `officeName` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" DROP COLUMN "officeNameName",
ADD COLUMN     "officeName" TEXT NOT NULL;
