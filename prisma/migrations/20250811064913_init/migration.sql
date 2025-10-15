-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_officeId_fkey";

-- CreateTable
CREATE TABLE "userLogs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "activity" TEXT NOT NULL,
    "ipAdress" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLogs" ADD CONSTRAINT "userLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
