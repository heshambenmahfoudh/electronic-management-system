-- AlterTable
ALTER TABLE "settingPermissions" ADD COLUMN     "documentDisplay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "documentUpdate" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "officeNameName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
