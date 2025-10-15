/*
  Warnings:

  - A unique constraint covering the columns `[officeId]` on the table `archiveMessagePermission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `backUpPermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `dashboardPermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `humanResourcePermission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `officePermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `reciveMessagePermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `sentMessagePermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `settingPermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[officeId]` on the table `userPermissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `officeId` to the `archiveMessagePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `backUpPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `dashboardPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `humanResourcePermission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `officePermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `reciveMessagePermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `sentMessagePermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `settingPermissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `officeId` to the `userPermissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archiveMessagePermission" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "backUpPermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "dashboardPermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "humanResourcePermission" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "officePermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reciveMessagePermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sentMessagePermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "settingPermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userPermissions" ADD COLUMN     "officeId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "archiveMessagePermission_officeId_key" ON "archiveMessagePermission"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "backUpPermissions_officeId_key" ON "backUpPermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "dashboardPermissions_officeId_key" ON "dashboardPermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "humanResourcePermission_officeId_key" ON "humanResourcePermission"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "officePermissions_officeId_key" ON "officePermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "reciveMessagePermissions_officeId_key" ON "reciveMessagePermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "sentMessagePermissions_officeId_key" ON "sentMessagePermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "settingPermissions_officeId_key" ON "settingPermissions"("officeId");

-- CreateIndex
CREATE UNIQUE INDEX "userPermissions_officeId_key" ON "userPermissions"("officeId");
