-- AlterTable
ALTER TABLE "reciveMessagePermissions" ADD COLUMN     "notificationDisplay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationRead" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reciveMessages" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "officeSent" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "linkMessage" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
