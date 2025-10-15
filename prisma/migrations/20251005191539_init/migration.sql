/*
  Warnings:

  - You are about to drop the column `acadimicCertificate` on the `employee` table. All the data in the column will be lost.
  - Added the required column `academicRank` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `academicTitle` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBrith` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faculity` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualification` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee" DROP COLUMN "acadimicCertificate",
ADD COLUMN     "academicRank" TEXT NOT NULL,
ADD COLUMN     "academicTitle" TEXT NOT NULL,
ADD COLUMN     "dateOfBrith" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "faculity" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "qualification" TEXT NOT NULL;
