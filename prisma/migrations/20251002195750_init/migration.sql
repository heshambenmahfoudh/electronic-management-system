/*
  Warnings:

  - You are about to drop the column `departmenOnetId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `departmenThreetId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `departmenTwotId` on the `employee` table. All the data in the column will be lost.
  - Added the required column `acadimicDepartmentId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acadimicDepartmentSecondId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acadimicDepartmentThirdId` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmenOnetId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmenThreetId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmenTwotId_fkey";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "departmenOnetId",
DROP COLUMN "departmenThreetId",
DROP COLUMN "departmenTwotId",
ADD COLUMN     "acadimicDepartmentId" TEXT NOT NULL,
ADD COLUMN     "acadimicDepartmentSecondId" TEXT NOT NULL,
ADD COLUMN     "acadimicDepartmentThirdId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_acadimicDepartmentId_fkey" FOREIGN KEY ("acadimicDepartmentId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_acadimicDepartmentSecondId_fkey" FOREIGN KEY ("acadimicDepartmentSecondId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_acadimicDepartmentThirdId_fkey" FOREIGN KEY ("acadimicDepartmentThirdId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
