/*
  Warnings:

  - You are about to drop the column `typeMessageId` on the `delayMessages` table. All the data in the column will be lost.
  - You are about to drop the column `typeMessageId` on the `reciveArchive` table. All the data in the column will be lost.
  - You are about to drop the column `typeMessageId` on the `reciveMessages` table. All the data in the column will be lost.
  - You are about to drop the column `typeMessageId` on the `sentArchive` table. All the data in the column will be lost.
  - You are about to drop the column `typeMessageId` on the `sentMessages` table. All the data in the column will be lost.
  - Added the required column `typeMessage` to the `delayMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeMessage` to the `reciveArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeMessage` to the `reciveMessages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeMessage` to the `sentArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeMessage` to the `sentMessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delayMessages" DROP CONSTRAINT "delayMessages_typeMessageId_fkey";

-- DropForeignKey
ALTER TABLE "reciveArchive" DROP CONSTRAINT "reciveArchive_typeMessageId_fkey";

-- DropForeignKey
ALTER TABLE "reciveMessages" DROP CONSTRAINT "reciveMessages_typeMessageId_fkey";

-- DropForeignKey
ALTER TABLE "sentArchive" DROP CONSTRAINT "sentArchive_typeMessageId_fkey";

-- DropForeignKey
ALTER TABLE "sentMessages" DROP CONSTRAINT "sentMessages_typeMessageId_fkey";

-- AlterTable
ALTER TABLE "delayMessages" DROP COLUMN "typeMessageId",
ADD COLUMN     "typeMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveArchive" DROP COLUMN "typeMessageId",
ADD COLUMN     "typeMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveMessages" DROP COLUMN "typeMessageId",
ADD COLUMN     "typeMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentArchive" DROP COLUMN "typeMessageId",
ADD COLUMN     "typeMessage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentMessages" DROP COLUMN "typeMessageId",
ADD COLUMN     "typeMessage" TEXT NOT NULL;
