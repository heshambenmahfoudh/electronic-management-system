/*
  Warnings:

  - Added the required column `subject` to the `delayMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `reciveArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `reciveMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `sentArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `sentMessages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "delayMessages" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveArchive" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveMessages" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentArchive" ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentMessages" ADD COLUMN     "subject" TEXT NOT NULL;
