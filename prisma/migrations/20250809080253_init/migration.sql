-- CreateTable
CREATE TABLE "dashboardPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "homeDisplay" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dashboardPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settingPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "officeDisplay" BOOLEAN NOT NULL DEFAULT false,
    "officeUpdate" BOOLEAN NOT NULL DEFAULT false,
    "userDisplay" BOOLEAN NOT NULL DEFAULT false,
    "userUpdate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settingPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "officePermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "officeDisplay" BOOLEAN NOT NULL DEFAULT false,
    "officeCreate" BOOLEAN NOT NULL DEFAULT false,
    "officeUpdate" BOOLEAN NOT NULL DEFAULT false,
    "officeDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "officePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userDisplay" BOOLEAN NOT NULL DEFAULT false,
    "userCreate" BOOLEAN NOT NULL DEFAULT false,
    "userUpdate" BOOLEAN NOT NULL DEFAULT false,
    "userDelete" BOOLEAN NOT NULL DEFAULT false,
    "userPermissionDisplay" BOOLEAN NOT NULL DEFAULT false,
    "userPermissionUpdate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentMessagePermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "typeMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "typeMessageCreate" BOOLEAN NOT NULL DEFAULT false,
    "typeMessageUpdate" BOOLEAN NOT NULL DEFAULT false,
    "typeMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "sentMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "sentMessageCreate" BOOLEAN NOT NULL DEFAULT false,
    "sentMessageView" BOOLEAN NOT NULL DEFAULT false,
    "sentMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "sentMessageArchive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentMessagePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reciveMessagePermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reciveMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "reciveMessageView" BOOLEAN NOT NULL DEFAULT false,
    "reciveMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "reciveMessageArchive" BOOLEAN NOT NULL DEFAULT false,
    "reciveMessageTrDelay" BOOLEAN NOT NULL DEFAULT false,
    "delayMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "delayMessageView" BOOLEAN NOT NULL DEFAULT false,
    "delayMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "delayMessageArchive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reciveMessagePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archiveMessagePermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentArchiveDisplay" BOOLEAN NOT NULL DEFAULT false,
    "departmentArchiveView" BOOLEAN NOT NULL DEFAULT false,
    "departmentArchiveDelete" BOOLEAN NOT NULL DEFAULT false,
    "departmentArchiveArchive" BOOLEAN NOT NULL DEFAULT false,
    "departmentArchiveTrDelay" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveSentMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveSentMessageView" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveSentMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveReciveMessageDisplay" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveReciveMessageView" BOOLEAN NOT NULL DEFAULT false,
    "ArchiveReciveMessageDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "archiveMessagePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backUpPermissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "takeBackupDisplay" BOOLEAN NOT NULL DEFAULT false,
    "takeBackupCreate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "backUpPermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dashboardPermissions_userId_key" ON "dashboardPermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "settingPermissions_userId_key" ON "settingPermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "officePermissions_userId_key" ON "officePermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userPermissions_userId_key" ON "userPermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "sentMessagePermissions_userId_key" ON "sentMessagePermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "reciveMessagePermissions_userId_key" ON "reciveMessagePermissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "archiveMessagePermission_userId_key" ON "archiveMessagePermission"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "backUpPermissions_userId_key" ON "backUpPermissions"("userId");

-- AddForeignKey
ALTER TABLE "dashboardPermissions" ADD CONSTRAINT "dashboardPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingPermissions" ADD CONSTRAINT "settingPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "officePermissions" ADD CONSTRAINT "officePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userPermissions" ADD CONSTRAINT "userPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentMessagePermissions" ADD CONSTRAINT "sentMessagePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveMessagePermissions" ADD CONSTRAINT "reciveMessagePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archiveMessagePermission" ADD CONSTRAINT "archiveMessagePermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backUpPermissions" ADD CONSTRAINT "backUpPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
