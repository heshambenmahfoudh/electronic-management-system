/*
  Warnings:

  - You are about to drop the column `departmentArchiveArchive` on the `archiveMessagePermission` table. All the data in the column will be lost.
  - You are about to drop the column `departmentArchiveTrDelay` on the `archiveMessagePermission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "archiveMessagePermission" DROP COLUMN "departmentArchiveArchive",
DROP COLUMN "departmentArchiveTrDelay",
ADD COLUMN     "departmentArchiveUpdate" BOOLEAN NOT NULL DEFAULT false;
