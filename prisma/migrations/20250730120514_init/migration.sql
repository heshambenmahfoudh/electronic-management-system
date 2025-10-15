-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "role" TEXT DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offices" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentMessages" (
    "id" TEXT NOT NULL,
    "officeSentId" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "sentName" TEXT NOT NULL,
    "typeMessageId" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reciveMessages" (
    "id" TEXT NOT NULL,
    "officeSentId" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "sentName" TEXT NOT NULL,
    "typeMessageId" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reciveMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeMessages" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypeMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delayMessages" (
    "id" TEXT NOT NULL,
    "officeSentId" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "sentName" TEXT NOT NULL,
    "typeMessageId" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "delayDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delayMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentArchive" (
    "id" TEXT NOT NULL,
    "officeSentId" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "departmentArciveId" TEXT NOT NULL,
    "typeMessageId" TEXT NOT NULL,
    "sentName" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "archiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reciveArchive" (
    "id" TEXT NOT NULL,
    "officeSentId" TEXT NOT NULL,
    "officeReciveId" TEXT NOT NULL,
    "departmentArciveId" TEXT NOT NULL,
    "typeMessageId" TEXT NOT NULL,
    "sentName" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "archiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reciveArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departmentArchive" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departmentArchive_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "offices_name_key" ON "offices"("name");

-- CreateIndex
CREATE UNIQUE INDEX "offices_email_key" ON "offices"("email");

-- CreateIndex
CREATE UNIQUE INDEX "offices_imageUrl_key" ON "offices"("imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "offices_password_key" ON "offices"("password");

-- CreateIndex
CREATE UNIQUE INDEX "TypeMessages_title_officeId_key" ON "TypeMessages"("title", "officeId");

-- CreateIndex
CREATE UNIQUE INDEX "departmentArchive_title_officeId_key" ON "departmentArchive"("title", "officeId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentMessages" ADD CONSTRAINT "sentMessages_officeSentId_fkey" FOREIGN KEY ("officeSentId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentMessages" ADD CONSTRAINT "sentMessages_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentMessages" ADD CONSTRAINT "sentMessages_typeMessageId_fkey" FOREIGN KEY ("typeMessageId") REFERENCES "TypeMessages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveMessages" ADD CONSTRAINT "reciveMessages_officeSentId_fkey" FOREIGN KEY ("officeSentId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveMessages" ADD CONSTRAINT "reciveMessages_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveMessages" ADD CONSTRAINT "reciveMessages_typeMessageId_fkey" FOREIGN KEY ("typeMessageId") REFERENCES "TypeMessages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeMessages" ADD CONSTRAINT "TypeMessages_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delayMessages" ADD CONSTRAINT "delayMessages_officeSentId_fkey" FOREIGN KEY ("officeSentId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delayMessages" ADD CONSTRAINT "delayMessages_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delayMessages" ADD CONSTRAINT "delayMessages_typeMessageId_fkey" FOREIGN KEY ("typeMessageId") REFERENCES "TypeMessages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentArchive" ADD CONSTRAINT "sentArchive_officeSentId_fkey" FOREIGN KEY ("officeSentId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentArchive" ADD CONSTRAINT "sentArchive_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentArchive" ADD CONSTRAINT "sentArchive_departmentArciveId_fkey" FOREIGN KEY ("departmentArciveId") REFERENCES "departmentArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentArchive" ADD CONSTRAINT "sentArchive_typeMessageId_fkey" FOREIGN KEY ("typeMessageId") REFERENCES "TypeMessages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveArchive" ADD CONSTRAINT "reciveArchive_officeSentId_fkey" FOREIGN KEY ("officeSentId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveArchive" ADD CONSTRAINT "reciveArchive_officeReciveId_fkey" FOREIGN KEY ("officeReciveId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveArchive" ADD CONSTRAINT "reciveArchive_departmentArciveId_fkey" FOREIGN KEY ("departmentArciveId") REFERENCES "departmentArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reciveArchive" ADD CONSTRAINT "reciveArchive_typeMessageId_fkey" FOREIGN KEY ("typeMessageId") REFERENCES "TypeMessages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departmentArchive" ADD CONSTRAINT "departmentArchive_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
