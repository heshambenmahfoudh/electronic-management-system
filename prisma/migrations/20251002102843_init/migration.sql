/*
  Warnings:

  - You are about to drop the column `administrativePosittion` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `degreeId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `departmenFourtId` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the `acadimicDegree` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `academicDegree` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrativeId` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinDate` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `fileName` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "acadimicDegree" DROP CONSTRAINT "acadimicDegree_officeId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_degreeId_fkey";

-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_departmenFourtId_fkey";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "administrativePosittion",
DROP COLUMN "date",
DROP COLUMN "degreeId",
DROP COLUMN "departmenFourtId",
ADD COLUMN     "academicDegree" TEXT NOT NULL,
ADD COLUMN     "administrativeId" TEXT NOT NULL,
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fileName" SET NOT NULL,
ALTER COLUMN "fileName" DROP DEFAULT;

-- DropTable
DROP TABLE "acadimicDegree";

-- CreateTable
CREATE TABLE "administrativePosittion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administrativePosittion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "humanResourcePermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentAacademicDisplay" BOOLEAN NOT NULL DEFAULT false,
    "departmentAacademicCreate" BOOLEAN NOT NULL DEFAULT false,
    "departmentAacademicUpdate" BOOLEAN NOT NULL DEFAULT false,
    "departmentAacademicDelete" BOOLEAN NOT NULL DEFAULT false,
    "adminstrativeDisplay" BOOLEAN NOT NULL DEFAULT false,
    "adminstrativeCreate" BOOLEAN NOT NULL DEFAULT false,
    "adminstrativeUpdate" BOOLEAN NOT NULL DEFAULT false,
    "adminstrativeDelete" BOOLEAN NOT NULL DEFAULT false,
    "employeeDisplay" BOOLEAN NOT NULL DEFAULT false,
    "employeeCreate" BOOLEAN NOT NULL DEFAULT false,
    "employeeUpdate" BOOLEAN NOT NULL DEFAULT false,
    "employeeDelete" BOOLEAN NOT NULL DEFAULT false,
    "employeePrint" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "humanResourcePermission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "humanResourcePermission_userId_key" ON "humanResourcePermission"("userId");

-- AddForeignKey
ALTER TABLE "administrativePosittion" ADD CONSTRAINT "administrativePosittion_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_administrativeId_fkey" FOREIGN KEY ("administrativeId") REFERENCES "administrativePosittion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "humanResourcePermission" ADD CONSTRAINT "humanResourcePermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
