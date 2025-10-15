/*
  Warnings:

  - You are about to drop the column `departmentArchiveView` on the `archiveMessagePermission` table. All the data in the column will be lost.
  - You are about to drop the column `userPermissionUpdate` on the `userPermissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "archiveMessagePermission" DROP COLUMN "departmentArchiveView",
ADD COLUMN     "departmentArchiveCreate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "userPermissions" DROP COLUMN "userPermissionUpdate";
