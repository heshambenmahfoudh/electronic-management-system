-- DropForeignKey
ALTER TABLE "archiveMessagePermission" DROP CONSTRAINT "archiveMessagePermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "backUpPermissions" DROP CONSTRAINT "backUpPermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "dashboardPermissions" DROP CONSTRAINT "dashboardPermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "officePermissions" DROP CONSTRAINT "officePermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "reciveMessagePermissions" DROP CONSTRAINT "reciveMessagePermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "sentMessagePermissions" DROP CONSTRAINT "sentMessagePermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "settingPermissions" DROP CONSTRAINT "settingPermissions_userId_fkey";

-- DropForeignKey
ALTER TABLE "userPermissions" DROP CONSTRAINT "userPermissions_userId_fkey";

-- AddForeignKey
ALTER TABLE "dashboardPermissions" ADD CONSTRAINT "dashboardPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingPermissions" ADD CONSTRAINT "settingPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "officePermissions" ADD CONSTRAINT "officePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPermissions" ADD CONSTRAINT "userPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentMessagePermissions" ADD CONSTRAINT "sentMessagePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveMessagePermissions" ADD CONSTRAINT "reciveMessagePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archiveMessagePermission" ADD CONSTRAINT "archiveMessagePermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backUpPermissions" ADD CONSTRAINT "backUpPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
