/*
  Warnings:

  - You are about to drop the column `browser` on the `userLogs` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `userLogs` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `userLogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "userLogs" DROP COLUMN "browser",
DROP COLUMN "os",
DROP COLUMN "userAgent",
ADD COLUMN     "officeId" TEXT;

-- AddForeignKey
ALTER TABLE "userLogs" ADD CONSTRAINT "userLogs_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
