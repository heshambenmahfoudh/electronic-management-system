/*
  Warnings:

  - Added the required column `fileName` to the `delayMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `reciveArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `reciveMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `sentArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `sentMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delayMessages" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveArchive" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveMessages" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentArchive" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentMessages" ADD COLUMN     "fileName" TEXT NOT NULL;
